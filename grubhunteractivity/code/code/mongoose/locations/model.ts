import mongoose from "mongoose";
import { locationSchema, Location } from "./schema";

export default (mongoose.models.Location as mongoose.Model<Location>) ||
  mongoose.model<Location>("Location", locationSchema);
