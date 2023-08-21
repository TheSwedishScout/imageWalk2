export interface Track {
  id: number;
  name: string;
  url: string;
  length: string;
  level: number;
  accessible: boolean;
  quiz: boolean;
  sightseeing: boolean;
  coordinates: Coordinate[];
}

export interface Coordinate {
  longitude: number;
  latitude: number;
}
