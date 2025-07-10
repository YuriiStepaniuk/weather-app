import { useEffect, useState } from "react";
import { weatherService } from "../services/weatherService";
import { WeatherDataHourly } from "../types/weather";

export const useHourlyWeather = (city: string | undefined) => {
  const [hourlyData, setHourlyData] = useState<WeatherDataHourly[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchWeather = async () => {
      if (!city) return;

      try {
        setLoading(true);
        const data = await weatherService.getWeatherHourly(
          decodeURIComponent(city),
        );
        setHourlyData(data.list.slice(0, 24));
        setError(null);
      } catch {
        setError("Failed to load hourly weather.");
      } finally {
        setLoading(false);
      }
    };

    fetchWeather();
  }, [city]);

  return { hourlyData, loading, error };
};
