import { ENV } from "../config/env";
import { GeocodingResult } from "../types/geocoding";
import { Coordinates } from "../types/weather";
import { createUrlSearchParams } from "../utils/createUrlSearchParams";
import { fetchData } from "../utils/fetchData";

export class GeocodingService {
  async getCoordinates(cityName: string): Promise<Coordinates> {
    const urlParams = createUrlSearchParams({
      q: cityName,
      limit: 1,
      appid: ENV.OPENWEATHER_API_KEY,
    });

    const results = await fetchData<GeocodingResult[]>(
      `${ENV.OPEAWEATHER_BASE_URL_GEO}?${urlParams}`,
    );

    if (!results.length) {
      throw new Error(`No coordinates found for city "${cityName}"`);
    }

    const { lat, lon } = results[0];
    return { lat, lon };
  }
}

export const geocodingService = new GeocodingService();
