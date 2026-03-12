import type { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "middleware/dbConnect";
import { findAllLocations } from "mongoose/locations/services";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  await dbConnect();
  const locations = await findAllLocations();
  res.status(200).json(locations);
}
