import { Box } from "@mui/material";
import WeatherCard from "../components/weatherCities/WeatherCard";
import WeatherSearch from "../components/weatherCities/WeatherSearch";
import { useEffect, useState } from "react";
import { weatherService } from "../services/weatherService";
import { WeatherData } from "../types/weather";
import { localStorageService } from "../services/localStorageService";

const WeatherCities = () => {
  const [cities, setCities] = useState<string[]>([]);
  const [weatherDataList, setWeatherDataList] = useState<WeatherData[]>([]);

  useEffect(() => {
    const stored = localStorageService.getCities();
    setCities(stored);
  }, []);

  useEffect(() => {
    const fetchWeatherForCities = async () => {
      const data: WeatherData[] = [];

      for (const city of cities) {
        try {
          const response = await weatherService.getCurrentWeatherByCity(city);
          const weather = response.list[0];

          data.push({
            city: response.city.name,
            temperature: Math.round(weather.temp.day),
            condition: weather.weather[0].main,
            humidity: weather.humidity,
            windSpeed: weather.speed,
          });
        } catch (error) {
          console.error(`Failed to load weather for ${city}`, error);
        }
      }

      setWeatherDataList(data);
    };

    if (cities.length > 0) {
      fetchWeatherForCities();
    }
  }, [cities]);

  const handleAddCity = (newCity: string) => {
    setCities((prev) => {
      if (prev.includes(newCity)) return prev;

      const updated = [...prev, newCity];
      localStorageService.saveCities(updated);
      return updated;
    });
  };
  return (
    <>
      <WeatherSearch onSearch={handleAddCity} />
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: 2,
          p: 2,
        }}
      >
        {weatherDataList.map((weather) => (
          <WeatherCard
            key={weather.city}
            city={weather.city}
            temperature={weather.temperature}
            condition={weather.condition}
            humidity={weather.humidity}
            windSpeed={weather.windSpeed}
          />
        ))}
      </Box>
    </>
  );
};

export default WeatherCities;
