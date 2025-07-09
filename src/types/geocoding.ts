export type GeocodingResult = {
  name: string;
  local_names?: Record<string, string>;
  lat: number;
  lon: number;
  country: string;
  state?: string;
};

export type CityOption = {
  name: string;
  country: string;
  state?: string;
  lat: number;
  lon: number;
};
