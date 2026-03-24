import Head from "next/head";
import type { GetServerSideProps, InferGetServerSidePropsType } from "next";
import LocationsList from "@/components/locations-list";
import dbConnect from "@/middleware/dbConnect";
import { findWishlistLocations } from "@/mongoose/locations/services";
import { LocationType } from "@/mongoose/locations/schema";

type WishlistPageProps = {
  data: {
    locations: string;
    userId: string;
  };
};

const WishlistPage = ({
  data,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const locations: LocationType[] = JSON.parse(data.locations);
  const pageTitle = `${data.userId}'s Wish List`;

  return (
    <>
      <Head>
        <title>{pageTitle}</title>
      </Head>
      <main className="page-shell">
        <section className="content-card">
          <h1>{pageTitle}</h1>
          <LocationsList locations={locations} />
        </section>
      </main>
    </>
  );
};

export const getServerSideProps: GetServerSideProps<WishlistPageProps> = async (
  context,
) => {
  const { user_id } = context.params as { user_id: string };

  await dbConnect();
  const locations = await findWishlistLocations(user_id);

  return {
    props: {
      data: {
        locations: JSON.stringify(locations),
        userId: user_id,
      },
    },
  };
};

export default WishlistPage;
