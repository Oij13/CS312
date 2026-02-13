import dbConnect from "@/middleware/db-connect";
import {db} from "./data";
import { findByZip, storeDocument, updateByZip } from "@/mongoose/weather/services";

interface WeatherInterface {
    zip: string;
    weather: string;
    tempC: string;
    tempF: string;
    humidity?: string;
    friends: string[]
}

export const resolvers = {
    Query: {
        weather: async (_: unknown, param: { zip: string }) => {
            await dbConnect();
            const result = await findByZip(param.zip);
            return result ? [result] : [];
        }
    },
    Mutation: {
        weather: async (_: unknown, param: { data: WeatherInterface }) => {
            await dbConnect();

            const existing = await findByZip(param.data.zip);
            if (existing) {
                await updateByZip(param.data.zip, param.data as WeatherInterface);
            } else {
                await storeDocument(param.data as WeatherInterface);
            }

            const result = await findByZip(param.data.zip);
            return result ? [result] : [];
        }
    }
}