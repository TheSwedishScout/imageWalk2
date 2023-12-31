import fs from "fs";
import { NextApiRequest, NextApiResponse } from "next";
import formidable, { Files } from "formidable";
import { UploadApiResponse, v2 as cloudinary } from "cloudinary";

export const config = {
  api: {
    bodyParser: false,
  },
};

cloudinary.config({
  cloud_name: process.env.cloudinary_Cloud_Name as string,
  api_key: process.env.cloudinary_API_Key as string,
  api_secret: process.env.cloudinary_API_Secret as string,
});

// type CloudinaryImage = {
//   asset_id: string;
//   public_id: string;
//   version: number;
//   version_id: string;
//   signature: string;
//   width: number;
//   height: number;
//   format: string;
//   resource_type: string;
//   created_at: string;
//   tags: string[];
//   bytes: number;
//   type: string;
//   etag: string;
//   placeholder: boolean;
//   url: string;
//   secure_url: string;
//   folder: string;
//   original_filename: string;
//   api_key: string;
// };

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const form = formidable({});
    // const uploadDir = join(process.cwd(), "public/uploads");''

    // form.uploadDir = uploadDir;

    form.parse(req, async (err, fields, files: Files) => {
      if (err) {
        console.error("Error parsing form:", err);
        return res.status(500).json({ error: "Form parsing error" });
      }

      const imageFile = files.image;

      if (!imageFile) {
        return res.status(400).json({ error: "No file uploaded" });
      }

      const imageBuffer = fs.readFileSync(imageFile[0].filepath);

      try {
        await cloudinary.uploader
          .upload_stream({}, (error, result: UploadApiResponse | undefined) => {
            if (error) {
              console.error("Error uploading to Cloudinary:", error);
              return res.status(500).json({ error: "Upload failed" });
            }
            if (!result) {
              return res.status(500).json({ error: "Upload failed" });
            }
            res.json({
              imageUrl: result.secure_url,
              width: result.width,
              height: result.height,
              public_id: result.public_id,
            });
          })
          .end(imageBuffer);
      } catch (error) {
        console.error("Error handling upload:", error);
        res.status(500).json({ error: "Internal server error" });
      }
    });
  } else {
    res.status(405).json({ error: "Method not allowed." });
  }
}
