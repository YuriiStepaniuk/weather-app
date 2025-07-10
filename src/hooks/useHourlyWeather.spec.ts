import { renderHook } from "@testing-library/react";
import { waitFor } from "@testing-library/react";
import { useHourlyWeather } from "./useHourlyWeather";
import { weatherService } from "../services/weatherService";

jest.mock("../services/weatherService");

describe("useHourlyWeather", () => {
  const mockGetWeatherHourly = weatherService.getWeatherHourly as jest.Mock;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("fetches hourly data and updates state", async () => {
    const fakeData = {
      list: Array.from({ length: 30 }, (_, i) => ({ dt: i, temp: i })),
    };
    mockGetWeatherHourly.mockResolvedValue(fakeData);

    const { result } = renderHook(() => useHourlyWeather("Kyiv"));

    // Initially loading true and no data
    expect(result.current.loading).toBe(true);
    expect(result.current.hourlyData).toEqual([]);

    // Wait until loading becomes false (meaning data loaded or error)
    await waitFor(() => expect(result.current.loading).toBe(false));

    // Now check the state after loading
    expect(mockGetWeatherHourly).toHaveBeenCalledWith("Kyiv");
    expect(result.current.hourlyData).toHaveLength(24);
    expect(result.current.error).toBeNull();
  });

  it("handles errors gracefully", async () => {
    mockGetWeatherHourly.mockRejectedValue(new Error("API Error"));

    const { result } = renderHook(() => useHourlyWeather("Kyiv"));

    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(result.current.hourlyData).toEqual([]);
    expect(result.current.error).toBe("Failed to load hourly weather.");
  });

  it("does nothing when city is undefined", () => {
    const { result } = renderHook(() => useHourlyWeather(undefined));

    expect(mockGetWeatherHourly).not.toHaveBeenCalled();
    expect(result.current.loading).toBe(true);
    expect(result.current.hourlyData).toEqual([]);
    expect(result.current.error).toBeNull();
  });
});
