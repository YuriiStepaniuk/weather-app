import { WeatherDataHourly, ChartDataPoint } from "../types/weather";

export const mapChartData = (
  hourlyData: WeatherDataHourly[],
): ChartDataPoint[] =>
  hourlyData.map((item) => ({
    time: new Date(item.dt * 1000).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    }),
    temp: Math.round(item.main.temp),
  }));
