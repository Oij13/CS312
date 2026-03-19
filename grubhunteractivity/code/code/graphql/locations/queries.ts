import {
  findAllLocations,
  findLocationsById,
  findWishlistLocations,
} from "@/mongoose/locations/services";

type LocationsByIdArgs = {
  location_ids: string[];
};

type OnUserWishlistArgs = {
  user_id: string;
};

export const locationQueryResolvers = {
  allLocations: async () => {
    return findAllLocations();
  },
  locationsById: async (
    _: unknown,
    { location_ids }: LocationsByIdArgs,
  ) => {
    return findLocationsById(location_ids);
  },
  onUserWishlist: async (
    _: unknown,
    { user_id }: OnUserWishlistArgs,
  ) => {
    return findWishlistLocations(user_id);
  },
};