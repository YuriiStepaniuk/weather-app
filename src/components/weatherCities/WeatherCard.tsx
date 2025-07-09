import { Card, CardContent, Typography, Box, Divider } from "@mui/material";
import { WbSunny, Cloud, Opacity, Air, Thermostat } from "@mui/icons-material";

interface WeatherCardProps {
  city: string;
  temperature: number;
  condition: string;
  humidity: number;
  windSpeed: number;
}

const WeatherCard: React.FC<WeatherCardProps> = ({
  city,
  temperature,
  condition,
  humidity,
  windSpeed,
}) => {
  const getWeatherIcon = () => {
    if (condition.toLowerCase().includes("cloud")) {
      return <Cloud fontSize="large" color="primary" />;
    }
    return <WbSunny fontSize="large" color="warning" />;
  };

  return (
    <Card
      sx={{
        width: "31%",
        minWidth: 275,
        borderRadius: 3,
        boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
        background: "linear-gradient(145deg, #f5f7fa 0%, #e4e8eb 100%)",
      }}
    >
      <CardContent>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography variant="h5" component="div" sx={{ fontWeight: "bold" }}>
            {city}
          </Typography>
          {getWeatherIcon()}
        </Box>

        <Box sx={{ display: "flex", alignItems: "center", mt: 1 }}>
          <Thermostat sx={{ mr: 1, color: "error.main" }} />
          <Typography variant="h4" component="span">
            {temperature}°C
          </Typography>
        </Box>

        <Typography color="text.secondary" sx={{ mb: 1.5 }}>
          {condition}
        </Typography>

        <Divider sx={{ my: 1.5 }} />

        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Opacity sx={{ mr: 1, color: "info.main" }} />
            <Typography variant="body2">{humidity}%</Typography>
          </Box>

          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Air sx={{ mr: 1, color: "success.main" }} />
            <Typography variant="body2">{windSpeed} km/h</Typography>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

export default WeatherCard;
