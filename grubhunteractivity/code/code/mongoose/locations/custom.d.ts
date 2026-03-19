export type FindByIdQuery = {
  location_id: {
    $in: string[];
  };
};

export type FindByWishlistQuery = {
  on_wishlist: string;
};

export type WishlistAction = "add" | "remove";
