import { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import { useSession } from "next-auth/react";
import dbConnect from "@/middleware/dbConnect";
import { findWishlistLocations } from "@/mongoose/locations/services";
import type { Location } from "@/mongoose/locations/schema";
import LocationsList from "@/components/locations-list";

interface WishListPageProps {
  locations: Location[];
  userId: string;
}

const WishListPage: NextPage<WishListPageProps> = ({ locations, userId }) => {
  const { data: session } = useSession();
  const isOwner = session?.user?.fdlst_private_userId === userId;
  const title = isOwner ? "Your Wish List" : "Wish List";

  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <main>
        <h1>{title}</h1>
        {locations.length === 0 ? (
          <p>
            {isOwner ? "Your wish list is empty." : "This wish list is empty."}
          </p>
        ) : (
          <LocationsList locations={locations} />
        )}
      </main>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const userId = context.query.userId as string;
  let locations: Location[] = [];
  try {
    await dbConnect();
    locations = await findWishlistLocations(userId);
  } catch (e) {
    locations = [];
  }
  return {
    props: {
      locations: JSON.parse(JSON.stringify(locations)),
      userId,
    },
  };
};

export default WishListPage;
