import { CityOption } from "../types/geocoding";

export const formatCityOptions = (option: CityOption) => {
  return `${option.name}${option.state ? `, ${option.state}` : ""}, ${option.country}`;
};
