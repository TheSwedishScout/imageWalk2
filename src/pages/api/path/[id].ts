// pages/api/savePath.ts

import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../app/lib/prisma";
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const id = req.query.id?.toString();
    if (!id) {
      res.status(422).json({ error: "Missing id" });
    }
    const paths = await prisma.path.findFirst({
      where: { id: id },
      include: { Images: true, authur: { select: { name: true } } },
    });
    if (paths) {
      // paths.cordinates = JSON.parse(paths.cordinates?.toString());
      res.send(paths);
    }
  } else if (req.method === "DELETE") {
    // TODO: check if user is admin
    const id = req.query.id?.toString();
    if (!id) {
      res.status(422).json({ error: "Missing id" });
    }
    const paths = await prisma.path.delete({
      where: { id: id },
    });
    if (paths) {
      res.send(paths);
    }
  } else {
    res.status(405).json({ error: "Method not allowed." });
  }
}
