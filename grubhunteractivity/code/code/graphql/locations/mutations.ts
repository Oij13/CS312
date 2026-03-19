import { updateWishlist } from "@/mongoose/locations/services";

interface WishlistArgs {
  user_id: string;
  location_id: string;
}

export const locationMutationResolvers = {
  addWishlist: async (
    _: unknown,
    { user_id, location_id }: WishlistArgs,
    _context: Record<string, never>,
  ) => {
    void _context;
    return updateWishlist(location_id, user_id, "add");
  },
  removeWishlist: async (
    _: unknown,
    { user_id, location_id }: WishlistArgs,
    _context: Record<string, never>,
  ) => {
    void _context;
    return updateWishlist(location_id, user_id, "remove");
  },
};