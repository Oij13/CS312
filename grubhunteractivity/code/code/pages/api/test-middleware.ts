import type { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "middleware/dbConnect";
import LocationModel from "mongoose/locations/model";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await dbConnect();
  const locations = await LocationModel.find({});
  res.status(200).json(locations);
}
