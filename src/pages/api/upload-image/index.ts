import fs from "fs";
import { join } from "path";
import { NextApiRequest, NextApiResponse } from "next";
import formidable from "formidable";
import { v4 as uuidv4 } from "uuid";

export const config = {
  api: {
    bodyParser: false,
  },
};

const createDirIfNotExists = (dir: string) =>
  !fs.existsSync(dir) ? fs.mkdirSync(dir) : undefined;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const form = formidable({});
    const uploadDir = join(process.cwd(), "public/uploads");

    createDirIfNotExists(uploadDir);

    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    // form.uploadDir = uploadDir;

    form.parse(req, (err, fields, files) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: "Error uploading image." });
      }

      const uploadedFile = files.image;
      console.log("uploadedFile", uploadedFile);
      const filePath = uploadedFile[0].filepath;
      const fileName = uploadedFile[0].originalFilename || uuidv4();

      const newFilePath = join(uploadDir, fileName);

      // fs.renameSync(filePath, newFilePath);

      // Read the file
      fs.readFile(filePath, function (err, data) {
        if (err) throw err;
        // console.log("File read!");

        // Write the file
        fs.writeFile(newFilePath, data, function (err) {
          if (err) throw err;
          res.write("File uploaded and moved!");
          res.end();
          // console.log("File written!");
        });

        // Delete the file
        fs.unlink(filePath, function (err) {
          if (err) throw err;
          // console.log("File deleted!");
        });
      });

      res
        .status(200)
        .json({ message: "Image uploaded successfully.", path: newFilePath });
    });
  } else {
    res.status(405).json({ error: "Method not allowed." });
  }
}
