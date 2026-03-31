import Head from "next/head";
import type { GetServerSideProps, InferGetServerSidePropsType } from "next";
import dbConnect from "@/middleware/dbConnect";
import { findLocationsById } from "@/mongoose/locations/services";
import { LocationType } from "@/mongoose/locations/schema";
import { LocationDetails } from "@/components/location-details";

interface LocationDetailPageProps {
  location: LocationType | null;
}

const LocationDetailPage = ({
  location,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  if (!location) {
    return <div>Location not found.</div>;
  }
  const pageTitle = location.name
    ? `${location.name} - Grub Hunter`
    : "Location Details";
  return (
    <>
      <Head>
        <title>{pageTitle}</title>
        <meta
          name="description"
          content={`Details for ${location.name || "location"}.`}
        />
      </Head>
      <main className="page-shell">
        <section className="content-card">
          <h1>{location.name}</h1>
          <LocationDetails location={location} />
        </section>
      </main>
    </>
  );
};

export const getServerSideProps: GetServerSideProps<
  LocationDetailPageProps
> = async (context) => {
  const { location_id } = context.params as { location_id: string };
  await dbConnect();
  const results = await findLocationsById([location_id]);
  const location = results[0] ?? null;
  if (!location) {
    return { notFound: true };
  }
  return {
    props: {
      location: JSON.parse(JSON.stringify(location)),
    },
  };
};

export default LocationDetailPage;
