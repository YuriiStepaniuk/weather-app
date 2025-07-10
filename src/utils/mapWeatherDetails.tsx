import {
  AcUnit,
  Air,
  CloudQueue,
  Compress,
  Explore,
  Grain,
  Visibility,
  WaterDrop,
} from "@mui/icons-material";
import { getWindDirection } from "./getWindDirection";
import { WeatherDataHourly } from "../types/weather";
import { DetailItem } from "../types/weather"; // assuming you have this

export const mapWeatherDetails = (data: WeatherDataHourly): DetailItem[] => {
  const { main, wind, clouds, visibility, rain, snow } = data;

  const details: DetailItem[] = [
    {
      label: `Feels Like: ${Math.round(main.feels_like)}°C`,
      icon: <Explore color="primary" />,
    },
    {
      label: `Humidity: ${main.humidity}%`,
      icon: <WaterDrop color="info" />,
    },
    {
      label: `Pressure: ${main.pressure} hPa`,
      icon: <Compress color="secondary" />,
    },
    {
      label: `Wind: ${wind.speed} km/h`,
      icon: <Air color="success" />,
    },
    {
      label: `Direction: ${getWindDirection(wind.deg)}`,
      icon: <Explore />,
    },
    {
      label: `Cloudiness: ${clouds?.all ?? 0}%`,
      icon: <CloudQueue />,
    },
    {
      label: `Visibility: ${(visibility / 1000).toFixed(1)} km`,
      icon: <Visibility />,
    },
  ];

  if (rain?.["3h"] !== undefined) {
    details.push({
      label: `Rain (3h): ${rain["3h"]} mm`,
      icon: <Grain color="primary" />,
    });
  }

  if (snow?.["3h"] !== undefined) {
    details.push({
      label: `Snow (3h): ${snow["3h"]} mm`,
      icon: <AcUnit color="primary" />,
    });
  }

  return details;
};
