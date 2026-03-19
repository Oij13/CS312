import mongoose from "mongoose";
import LocationModel from "./model";
import { Location } from "./schema";
import { FindByIdQuery, FindByWishlistQuery, WishlistAction } from "./custom";

type LocationDocument = mongoose.HydratedDocument<Location>;

async function findLocations(query: object): Promise<LocationDocument[]> {
  return LocationModel.find(query);
}

export async function findAllLocations(): Promise<LocationDocument[]> {
  return findLocations({});
}

export async function findLocationsById(
  location_ids: string[],
): Promise<LocationDocument[]> {
  const query: FindByIdQuery = { location_id: { $in: location_ids } };
  return findLocations(query);
}

export async function findWishlistLocations(
  userId: string,
): Promise<LocationDocument[]> {
  const query: FindByWishlistQuery = { on_wishlist: userId };
  return findLocations(query);
}

export async function updateWishlist(
  location_id: string,
  userId: string,
  action: WishlistAction,
): Promise<LocationDocument | null> {
  const location = await LocationModel.findOne({ location_id });
  if (!location) return null;

  const index = location.on_wishlist.indexOf(userId);
  if (action === "add" && index === -1) {
    location.on_wishlist.push(userId);
  }

  if (action === "remove" && index !== -1) {
    location.on_wishlist.splice(index, 1);
  }

  return location.save();
}
