import Link from "next/link";
import styles from "./index.module.css";
import { LocationType } from "@/mongoose/locations/schema";

interface Props {
  location: LocationType;
}

const LocationsListItem = ({ location }: Props) => {
  return (
    <li className={styles.item}>
      <Link href={`/location/${location.location_id}`} className={styles.link}>
        <h2 className={styles.name}>{location.name}</h2>
        <p className={styles.meta}>{location.cuisine}</p>
        <p className={styles.meta}>{location.borough}</p>
      </Link>
    </li>
  );
};

export default LocationsListItem;
