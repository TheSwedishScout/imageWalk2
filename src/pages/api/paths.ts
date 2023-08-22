import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../app/lib/prisma";
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const paths = await prisma.path.findMany({
      include: { authur: { select: { name: true } } },
    });
    const trimmed = paths.map((path) => {
      const { cordinates, ...rest } = path;
      cordinates?.toString();
      return rest;
    });
    res.send(trimmed);
  } else {
    res.status(405).json({ error: "Method not allowed." });
  }
}
