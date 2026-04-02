import { updateWishlist } from "@/mongoose/locations/services";
import { authGuard } from "@/middleware/auth-guards";
import { JWT } from "next-auth/jwt";

interface ContextInterface {
  token?: JWT | null;
}

interface WishlistArgs {
  user_id: string;
  location_id: string;
}

export const locationMutationResolvers = {
  addWishlist: async (
    _: unknown,
    { user_id, location_id }: WishlistArgs,
    context: ContextInterface,
  ) => {
    const guard = authGuard({ user_id, location_id }, context);
    if (guard !== true) return guard;
    return updateWishlist(location_id, user_id, "add");
  },
  removeWishlist: async (
    _: unknown,
    { user_id, location_id }: WishlistArgs,
    context: ContextInterface,
  ) => {
    const guard = authGuard({ user_id, location_id }, context);
    if (guard !== true) return guard;
    return updateWishlist(location_id, user_id, "remove");
  },
};
