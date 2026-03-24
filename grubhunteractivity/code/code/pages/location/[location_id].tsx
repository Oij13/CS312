import Head from "next/head";
import type { GetServerSideProps, InferGetServerSidePropsType } from "next";
import dbConnect from "@/middleware/dbConnect";
import { findLocationsById } from "@/mongoose/locations/services";
import { LocationType } from "@/mongoose/locations/schema";

type LocationDetailPageProps = {
  data: {
    location: string;
  };
};

const LocationDetailPage = ({
  data,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const location: LocationType = JSON.parse(data.location);
  const pageTitle = location.name;

  return (
    <>
      <Head>
        <title>{pageTitle}</title>
      </Head>
      <main className="page-shell">
        <section className="content-card">
          <h1>{location.name}</h1>
          <p>{location.cuisine}</p>
          <p>{location.borough}</p>
          <p>
            {location.address}, {location.zipcode}
          </p>
          <p>Grade: {location.grade}</p>
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
      data: {
        location: JSON.stringify(location),
      },
    },
  };
};

export default LocationDetailPage;
