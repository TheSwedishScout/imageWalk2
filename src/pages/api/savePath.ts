// pages/api/savePath.ts

import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../lib/prisma";
import { ILocationImage } from "@/app/components/newTrack/NewMapWrapper";
import formidable from "formidable";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    // Create a new formidable form instance
    const form = formidable({});
    console.log("1");

    // Parse form data
    form.parse(req, async (err, fields) => {
      console.log("err", err);
      if (err) {
        console.error("Formidable parsing error:", err);
        return res.status(400).json({ error: "Form data parsing error" });
      }

      const { path, pathInfo, images } = fields;
      console.log("{ path, pathInfo, images }", { path, pathInfo, images });
      const parsedPath = JSON.parse(path[0]);
      const parsedPathInfo = JSON.parse(pathInfo[0]);
      const parsedImages = JSON.parse(images[0]);

      // Save path information
      const savedPath = await prisma.path.create({
        data: {
          cordinates: path,
          startLocation: parsedPath[0],
          endLocation: parsedPath[path.length - 1],
          name: parsedPathInfo.name,
          description: parsedPathInfo.description,
          difficulty: parsedPathInfo.difficulty,
          // userId: ..., // Set the user ID based on your authentication
        },
      });

      // Save location images associated with the path
      await Promise.all(
        parsedImages.map(async (image: ILocationImage) => {
          const savedImage = await prisma.locationImage.create({
            data: {
              image: image.imageFile || "",
              lng: image.lng,
              lat: image.lat,
              description: image.description,
              pathId: savedPath.id,
            },
          });
          return savedImage;
        })
      );

      res.status(200).json({ message: "Path saved successfully" });
    });
  } else {
    res.status(405).json({ error: "Method not allowed." });
  }
}

export const config = {
  api: {
    bodyParser: false,
  },
};
