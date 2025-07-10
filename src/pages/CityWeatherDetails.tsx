import {
  Box,
  Typography,
  IconButton,
  CircularProgress,
  Paper,
} from "@mui/material";
import Grid from "@mui/material/Grid";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate, useParams } from "react-router-dom";

import HourlyTemperatureGraph from "../components/cityWeatherDetails/HourlyTemperatureGraph";
import { useHourlyWeather } from "../hooks/useHourlyWeather";
import { mapWeatherDetails } from "../utils/mapWeatherDetails";
import { mapChartData } from "../utils/mapChardData";

const CityWeatherDetails = () => {
  const { city } = useParams();
  const navigate = useNavigate();

  const { hourlyData, loading, error } = useHourlyWeather(city);

  const current = hourlyData[0];

  if (loading) {
    return (
      <Box p={4} textAlign="center">
        <CircularProgress />
      </Box>
    );
  }

  if (error || !hourlyData.length) {
    return (
      <Box p={4} textAlign="center" color="error.main">
        <Typography variant="h6">{error ?? "No data found."}</Typography>
      </Box>
    );
  }

  const chartData = mapChartData(hourlyData);

  const details = mapWeatherDetails(current);

  return (
    <Box p={3}>
      <Box display="flex" alignItems="center" mb={2}>
        <IconButton onClick={() => navigate("/")}>
          <ArrowBackIcon />
        </IconButton>
        <Typography variant="h4" fontWeight="bold" ml={1}>
          {city}
        </Typography>
      </Box>

      {/* Current Weather */}
      <Box mb={3}>
        <Typography variant="h2">{Math.round(current.main.temp)}°C</Typography>
        <Typography variant="h6" color="text.secondary">
          {current.weather[0].main}
        </Typography>
      </Box>

      <Grid
        container
        spacing={2}
        component={Paper}
        elevation={3}
        sx={{ p: 2, mt: 2 }}
      >
        {details.map((detail, index) => (
          <Grid key={index}>
            <Box display="flex" alignItems="center" gap={1}>
              {detail.icon}
              <Typography>{detail.label}</Typography>
            </Box>
          </Grid>
        ))}
      </Grid>

      {/* 24-Hour Temperature Chart */}
      <HourlyTemperatureGraph data={chartData} />
    </Box>
  );
};

export default CityWeatherDetails;
