import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { weatherService } from "../../services/weatherService";
import { WeatherForecastResponse } from "../../types/weather";

export const fetchWeatherByCity = createAsyncThunk(
  "weather/fetchByCity",
  async (city: string) => {
    const response = weatherService.getCurrentWeatherByCity(city);
    return response;
  },
);

export const fetchWeatherForCities = createAsyncThunk(
  "weather/fetchForCities",
  async (cities: string[]) => {
    const results: Record<string, WeatherForecastResponse> = {};

    for (const city of cities) {
      const response = await weatherService.getCurrentWeatherByCity(city);
      results[city] = response;
    }

    return results;
  },
);

interface WeatherState {
  data: Record<string, WeatherForecastResponse>;
  loading: boolean;
  error: string | null;
}

const initialState: WeatherState = {
  data: {},
  loading: false,
  error: null,
};

const weatherSlice = createSlice({
  name: "weather",
  initialState,
  reducers: {
    clearWeather(state) {
      state.data = {};
      state.error = null;
      state.loading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchWeatherForCities.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchWeatherForCities.fulfilled,
        (
          state,
          action: PayloadAction<Record<string, WeatherForecastResponse>>,
        ) => {
          state.loading = false;
          state.data = { ...state.data, ...action.payload }; // merge new data
        },
      )
      .addCase(fetchWeatherForCities.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? "Failed to fetch weather";
      })
      .addCase(fetchWeatherByCity.fulfilled, (state, action) => {
        state.loading = false;
        const city = action.meta.arg;
        state.data[city] = action.payload;
      });
  },
});

export const { clearWeather } = weatherSlice.actions;
export default weatherSlice.reducer;
