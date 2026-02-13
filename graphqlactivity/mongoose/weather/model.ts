import mongoose, { model } from "mongoose";
import { WeatherSchema } from "./schema";
import { WeatherInterface } from "./interface";

export default mongoose.models.Weather ||
  model<WeatherInterface>("Weather", WeatherSchema);
