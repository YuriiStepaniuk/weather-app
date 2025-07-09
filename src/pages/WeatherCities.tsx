import { Box } from "@mui/material";
import WeatherCard from "../components/weatherCities/WeatherCard";
import WeatherSearch from "../components/weatherCities/WeatherSearch";
import { useEffect, useState } from "react";
import { localStorageService } from "../services/localStorageService";
import { useAppDispatch, useAppSelector } from "../hooks/reduxHooks";
import { fetchWeatherByCity } from "../features/weather/weatherSlice";
import WeatherCardSkeleton from "../components/weatherCities/WeatherCardSkeleton";
import WeatherCardError from "../components/weatherCities/WeatherCardError";

const WeatherCities = () => {
  const dispatch = useAppDispatch();
  const [cities, setCities] = useState<string[]>([]);
  const weatherDataMap = useAppSelector((state) => state.weather.data);
  const error = useAppSelector((state) => state.weather.error);

  useEffect(() => {
    const stored = localStorageService.getCities();
    setCities(stored);
  }, []);

  useEffect(() => {
    cities.forEach((city) => {
      if (!weatherDataMap[city]) {
        dispatch(fetchWeatherByCity(city));
      }
    });
  }, [cities, weatherDataMap, dispatch]);

  const handleAddCity = (newCity: string) => {
    setCities((prev) => {
      if (prev.includes(newCity)) return prev;

      const updated = [...prev, newCity];
      localStorageService.saveCities(updated);
      return updated;
    });
  };

  const reloadCityWeather = (city: string) => {
    dispatch(fetchWeatherByCity(city));
  };

  const handleRemoveCity = (cityToRemove: string) => {
    setCities((prev) => {
      const updated = prev.filter((c) => c !== cityToRemove);
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
        {cities.map((city) => {
          const weather = weatherDataMap[city];

          if (!weather?.list?.length) {
            return <WeatherCardSkeleton key={city} />;
          }

          if (error) {
            return <WeatherCardError key={city} city={city} error={error} />;
          }

          const weatherInfo = {
            city,
            temperature: Math.round(weather.list[0].temp.day),
            condition: weather.list[0].weather[0].main,
            humidity: weather.list[0].humidity,
            windSpeed: weather.list[0].speed,
          };

          return (
            <WeatherCard
              key={city}
              {...weatherInfo}
              onCityReload={() => reloadCityWeather(city)}
              onCityDelete={() => handleRemoveCity(city)}
            />
          );
        })}
      </Box>
    </>
  );
};

export default WeatherCities;
