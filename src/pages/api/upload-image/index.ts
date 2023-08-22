import fs from "fs";
import { NextApiRequest, NextApiResponse } from "next";
import formidable, { Files } from "formidable";
import { v2 as cloudinary } from "cloudinary";

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
          .upload_stream({}, (error, result) => {
            if (error) {
              console.error("Error uploading to Cloudinary:", error);
              return res.status(500).json({ error: "Upload failed" });
            }
            if (!result) {
              return res.status(500).json({ error: "Upload failed" });
            }
            console.log("🚀🤯 ~ file: index.ts:53 ~ result:", result);
            res.json({ imageUrl: result.secure_url });
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
