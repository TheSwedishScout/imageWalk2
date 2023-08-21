export const haversine = (
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number => {
  const R = 6371; // Radius of the Earth in kilometers

  // Convert latitude and longitude from degrees to radians
  const [rLat1, rLon1, rLat2, rLon2] = [lat1, lon1, lat2, lon2].map(
    (val) => (val * Math.PI) / 180
  );

  // Haversine formula
  const dlat = rLat2 - rLat1;
  const dlon = rLon2 - rLon1;
  const a =
    Math.sin(dlat / 2) ** 2 +
    Math.cos(rLat1) * Math.cos(rLat2) * Math.sin(dlon / 2) ** 2;
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  const distance = R * c;
  return distance;
};

export interface LatLng {
  lat: number;
  lng: number;
}

export const findClosestPosition = (
  newPos: LatLng,
  latLngArray: LatLng[]
): LatLng | null => {
  let closestDistance = Infinity;
  let closestPosition: LatLng | null = null;

  for (const latLng of latLngArray) {
    const distance = haversine(newPos.lat, newPos.lng, latLng.lat, latLng.lng);
    if (distance < closestDistance) {
      closestDistance = distance;
      closestPosition = latLng;
    }
  }

  return closestPosition;
};

export const splitPathByImages = (
  path: LatLng[],
  images: LatLng[]
): LatLng[][] => {
  const response: LatLng[][] = [];

  let segment: LatLng[] = [];
  for (const point of path) {
    segment.push(point);
    if (
      images.some((image) => image.lng === point.lng && image.lat === point.lat)
    ) {
      response.push([...segment]);
      segment = [{ ...point }];
    }
  }

  if (segment.length > 0) {
    response.push(segment);
  }

  return response;
};
export const distanceToTarget = (newPos: LatLng, target: LatLng): number => {
  const distance = haversine(newPos.lat, newPos.lng, target.lat, target.lng);

  return distance;
};
