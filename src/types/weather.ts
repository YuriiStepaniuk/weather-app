export interface WeatherForecastResponse {
  city: City;
  cod: string;
  message: number;
  cnt: number;
  list: DailyForecast[];
}

export interface City {
  id: number;
  name: string;
  coord: Coordinates;
  country: string;
  population: number;
  timezone: number;
}

export interface Coordinates {
  lon: number;
  lat: number;
}

export interface DailyForecast {
  dt: number;
  sunrise: number;
  sunset: number;
  temp: Temperature;
  feels_like: FeelsLike;
  pressure: number;
  humidity: number;
  weather: Weather[];
  speed: number;
  deg: number;
  gust: number;
  clouds: number;
  pop: number;
  rain?: number;
}

export interface Temperature {
  day: number;
  min: number;
  max: number;
  night: number;
  eve: number;
  morn: number;
}

export interface FeelsLike {
  day: number;
  night: number;
  eve: number;
  morn: number;
}

export interface Weather {
  id: number;
  main: string;
  description: string;
  icon: string;
}

export type WeatherData = {
  city: string;
  temperature: number;
  condition: string;
  humidity: number;
  windSpeed: number;
};

export type WeatherDataHourly = {
  dt: number;
  main: {
    temp: number;
    feels_like: number;
    humidity: number;
    pressure: number;
  };
  wind: {
    speed: number;
    deg: number;
  };
  clouds: {
    all: number;
  };
  visibility: number;
  rain?: {
    "3h": number;
  };
  snow?: {
    "3h": number;
  };
  weather: Array<{
    main: string;
  }>;
};

export interface WeatherForecastHourlyResponse {
  city: {
    id: number;
    name: string;
    coord: { lat: number; lon: number };
    country: string;
    population: number;
    timezone: number;
  };
  cod: string;
  message: number;
  cnt: number;
  list: WeatherDataHourly[];
}

export interface ChartDataPoint {
  time: string;
  temp: number;
}

export interface DetailItem {
  label: string;
  icon: React.ReactNode;
}
