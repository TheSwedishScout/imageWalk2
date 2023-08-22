// pages/api/savePath.ts

import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../app/lib/prisma";
import {
  ILocationImage,
  IPathInfo,
} from "@/app/components/newTrack/NewMapWrapper";
import formidable from "formidable";
import { LatLng } from "@/app/components/lib/cordinates";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    // Create a new formidable form instance
    const form = formidable({});

    // Parse form data
    form.parse(req, async (err, fields) => {
      console.log("err", err);
      if (err) {
        console.error("Formidable parsing error:", err);
        return res.status(400).json({ error: "Form data parsing error" });
      }

      const { path, pathInfo, images } = fields;
      const parsedPath: LatLng[] = JSON.parse(path[0]);
      const parsedPathInfo: IPathInfo = JSON.parse(pathInfo[0]);
      const parsedImages: ILocationImage[] = JSON.parse(images[0]);

      // Save path information
      const savedPath = await prisma.path.create({
        data: {
          cordinates: path,
          startLocation: parsedPath[0] as any,
          endLocation: parsedPath[path.length - 1] as any,
          name: parsedPathInfo.name || "",
          description: parsedPathInfo.description || "",
          difficulty: parsedPathInfo.difficulty || "medium",
          // userId: ..., // Set the user ID based on your authentication
        },
      });

      // Save location images associated with the path
      await Promise.all(
        parsedImages.map(async (image: ILocationImage) => {
          const savedImage = await prisma.locationImage.create({
            data: {
              image: image.imageFile || "",
              name: image.name,
              height: image.height,
              width: image.width,
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
