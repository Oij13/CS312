import Head from "next/head";
import type { GetStaticProps, InferGetStaticPropsType } from "next";
import LocationsList from "@/components/locations-list";
import dbConnect from "@/middleware/dbConnect";
import { findAllLocations } from "@/mongoose/locations/services";
import { LocationType } from "@/mongoose/locations/schema";

type HomePageProps = {
  data: {
    locations: string;
  };
};

const HomePage = ({ data }: InferGetStaticPropsType<typeof getStaticProps>) => {
  const locations: LocationType[] = JSON.parse(data.locations);
  const pageTitle = "Grub Hunter Locations";

  return (
    <>
      <Head>
        <title>{pageTitle}</title>
        <meta
          name="description"
          content="Browse all available locations and jump to each location detail page."
        />
      </Head>
      <main className="page-shell">
        <section className="content-card">
          <h1>{pageTitle}</h1>
          <p className="page-subtitle">
            Select a location to view details and manage your wishlist.
          </p>
          <LocationsList locations={locations} />
        </section>
      </main>
    </>
  );
};

export const getStaticProps: GetStaticProps<HomePageProps> = async () => {
  let serializedLocations = "[]";

  try {
    await dbConnect();
    const locations = await findAllLocations();
    serializedLocations = JSON.stringify(locations);
  } catch (error) {
    console.error("Failed to fetch locations during static generation", error);
  }

  return {
    props: {
      data: {
        locations: serializedLocations,
      },
    },
  };
};

export default HomePage;
