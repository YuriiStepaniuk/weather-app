import { formatCityOptions } from "./formatCityOptions";
import type { CityOption } from "../types/geocoding";

describe("formatCityOptions", () => {
  it("formats name, state, and country when state exists", () => {
    const option: CityOption = {
      name: "New York",
      state: "NY",
      country: "USA",
      lat: 40.7128,
      lon: -74.006,
    };

    expect(formatCityOptions(option)).toBe("New York, NY, USA");
  });

  it("formats name and country when state is missing", () => {
    const option: CityOption = {
      name: "Paris",
      country: "France",
      lat: 48.8566,
      lon: 2.3522,
    };

    expect(formatCityOptions(option)).toBe("Paris, France");
  });

  it("formats name and country when state is empty string", () => {
    const option: CityOption = {
      name: "Berlin",
      state: "",
      country: "Germany",
      lat: 52.52,
      lon: 13.405,
    };

    expect(formatCityOptions(option)).toBe("Berlin, Germany");
  });
});
