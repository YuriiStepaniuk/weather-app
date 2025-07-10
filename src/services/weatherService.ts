import { ENV } from "../config/env";
import { WEATHER_CONFIG } from "../config/weather";
import {
  WeatherForecastHourlyResponse,
  WeatherForecastResponse,
} from "../types/weather";
import { createUrlSearchParams } from "../utils/createUrlSearchParams";
import { fetchData } from "../utils/fetchData";
import { GeocodingService, geocodingService } from "./geocodingService";

class WeatherService {
  constructor(private geocodingService: GeocodingService) {}

  async getCurrentWeatherByCity(
    cityName: string,
  ): Promise<WeatherForecastResponse> {
    const { lat, lon } = await this.geocodingService.getCoordinates(cityName);
    const urlParams = createUrlSearchParams({
      lat,
      lon,
      appid: ENV.OPENWEATHER_API_KEY,
      units: WEATHER_CONFIG.units,
      cnt: WEATHER_CONFIG.forecastDays,
    });

    return fetchData(`${ENV.OPENWEATHER_BASE_URL_DAILY}?${urlParams}`);
  }

  async getWeatherHourly(
    cityName: string,
  ): Promise<WeatherForecastHourlyResponse> {
    const { lat, lon } = await this.geocodingService.getCoordinates(cityName);
    const urlParams = createUrlSearchParams({
      lat,
      lon,
      appid: ENV.OPENWEATHER_API_KEY,
      units: WEATHER_CONFIG.units,
      cnt: WEATHER_CONFIG.forecastHours,
    });

    return fetchData(`${ENV.OPENWEATHER_BASE_URL_HOURLY}?${urlParams}`);
  }
}

export const weatherService = new WeatherService(geocodingService);
