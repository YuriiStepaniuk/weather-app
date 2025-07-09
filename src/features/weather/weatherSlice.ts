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

interface WeatherState {
  data: WeatherForecastResponse | null;
  loading: boolean;
  error: string | null;
}

const initialState: WeatherState = {
  data: null,
  loading: false,
  error: null,
};

const weatherSlice = createSlice({
  name: "weather",
  initialState,
  reducers: {
    clearWeather(state) {
      state.data = null;
      state.error = null;
      state.loading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchWeatherByCity.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchWeatherByCity.fulfilled,
        (state, action: PayloadAction<WeatherForecastResponse>) => {
          state.loading = false;
          state.data = action.payload;
        },
      )
      .addCase(fetchWeatherByCity.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? "Failed to fetch weather";
      });
  },
});

export const { clearWeather } = weatherSlice.actions;
export default weatherSlice.reducer;
