import { ENV } from "../config/env";
import { CityOption, GeocodingResult } from "../types/geocoding";
import { Coordinates } from "../types/weather";
import { createUrlSearchParams } from "../utils/createUrlSearchParams";
import { fetchData } from "../utils/fetchData";

export class GeocodingService {
  async getCoordinates(cityName: string): Promise<Coordinates> {
    const urlParams = createUrlSearchParams({
      q: cityName,
      limit: 5,
      appid: ENV.OPENWEATHER_API_KEY,
    });

    const results = await fetchData<GeocodingResult[]>(
      `${ENV.OPENWEATHER_BASE_URL_GEO}?${urlParams}`,
    );

    if (!results.length) {
      throw new Error(`No coordinates found for city "${cityName}"`);
    }

    const exact = results.find(
      (r) => r.name.toLowerCase() === cityName.toLowerCase(),
    );

    const { lat, lon } = exact ?? results[0];
    return { lat, lon };
  }

  async searchCities(query: string): Promise<CityOption[]> {
    const urlParams = createUrlSearchParams({
      q: query,
      limit: 5,
      appid: ENV.OPENWEATHER_API_KEY,
    });

    return fetchData(`${ENV.OPENWEATHER_BASE_URL_GEO}?${urlParams}`);
  }
}

export const geocodingService = new GeocodingService();
