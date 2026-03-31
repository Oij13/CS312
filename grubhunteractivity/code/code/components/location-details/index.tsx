import "./index.module.css";
import { LocationType } from "@/mongoose/locations/schema";

interface LocationDetailsProps {
  location: LocationType | null;
}

export function LocationDetails({ location }: LocationDetailsProps) {
  if (!location) return null;
  return (
    <ul>
      <li><strong>Address:</strong> {location.address}</li>
      <li><strong>Zipcode:</strong> {location.zipcode}</li>
      <li ><strong>Borough:</strong> {location.borough}</li>
      <li><strong>Cuisine:</strong> {location.cuisine}</li>
      <li><strong>Grade:</strong> {location.grade}</li>
    </ul>
  );
}
