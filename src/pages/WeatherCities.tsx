import { Box } from "@mui/material";
import WeatherCard from "../components/weatherCities/WeatherCard";
import WeatherSearch from "../components/weatherCities/WeatherSearch";
import { useEffect, useState } from "react";
import { weatherService } from "../services/weatherService";

const WeatherCities = () => {
  const [weatherData, setWeatherData] = useState<{
    city: string;
    temperature: number;
    condition: string;
    humidity: number;
    windSpeed: number;
  } | null>(null);

  const [city, setCity] = useState("");

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const data = await weatherService.getCurrentWeatherByCity(city);
        const weather = data.list[0];

        setWeatherData({
          city: data.city.name,
          temperature: Math.round(weather.temp.day),
          condition: weather.weather[0].main,
          humidity: weather.humidity,
          windSpeed: weather.speed,
        });
      } catch (error) {
        console.error("Failed to load weather:", error);
      }
    };

    fetchWeather();
  }, [city]);

  return (
    <>
      <WeatherSearch onSearch={setCity} />
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: 2,
          p: 2,
        }}
      >
        {weatherData && (
          <WeatherCard
            city={weatherData.city}
            temperature={weatherData.temperature}
            condition={weatherData.condition}
            humidity={weatherData.humidity}
            windSpeed={weatherData.windSpeed}
          />
        )}
      </Box>
    </>
  );
};

export default WeatherCities;
