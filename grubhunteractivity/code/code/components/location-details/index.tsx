import "./index.module.css";
import { LocationType } from "@/mongoose/locations/schema";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { Button } from "@/components/button";

interface LocationDetailsProps {
  location: LocationType | null;
}

interface WishlistActionArgs {
  locationId: string;
  userId: string;
}

export function LocationDetails({ location }: LocationDetailsProps) {
  const { data: session } = useSession();
  const userId = session?.user?.fdlst_private_userId;
  const [onWishlist, setOnWishlist] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (location && userId) {
      setOnWishlist(location.on_wishlist?.includes(userId));
    }
  }, [location, userId]);

  const wishlistAction = async ({ locationId, userId }: WishlistActionArgs) => {
    if (loading) return;
    setLoading(true);
    const mutation = onWishlist
      ? `mutation RemoveWishlist($user_id: String!, $location_id: String!) {\n        removeWishlist(user_id: $user_id, location_id: $location_id) { location_id }\n      }`
      : `mutation AddWishlist($user_id: String!, $location_id: String!) {\n        addWishlist(user_id: $user_id, location_id: $location_id) { location_id }\n      }`;
    try {
      const res = await fetch("/api/graphql", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          query: mutation,
          variables: { user_id: userId, location_id: locationId },
        }),
      });
      if (res.ok) {
        setOnWishlist(!onWishlist);
      }
    } finally {
      setLoading(false);
    }
  };

  if (!location) return null;
  return (
    <>
      <ul>
        <li>
          <strong>Address:</strong> {location.address}
        </li>
        <li>
          <strong>Zipcode:</strong> {location.zipcode}
        </li>
        <li>
          <strong>Borough:</strong> {location.borough}
        </li>
        <li>
          <strong>Cuisine:</strong> {location.cuisine}
        </li>
        <li>
          <strong>Grade:</strong> {location.grade}
        </li>
      </ul>
      {userId && (
        <Button
          variant={onWishlist ? "outline" : "blue"}
          disabled={loading}
          clickHandler={() =>
            wishlistAction({ locationId: location.location_id, userId })
          }
        >
          {onWishlist ? "Remove from your Wishlist" : "Add to your Wishlist"}
        </Button>
      )}
    </>
  );
}
