import {
  Card,
  CardContent,
  Typography,
  Box,
  Divider,
  IconButton,
} from "@mui/material";
import { Opacity, Air, Thermostat, Refresh, Delete } from "@mui/icons-material";
import { Link } from "react-router-dom";

interface WeatherCardProps {
  city: string;
  temperature: number;
  condition: string;
  humidity: number;
  windSpeed: number;
  onCityReload?: () => void;
  onCityDelete?: () => void;
}

const WeatherCard: React.FC<WeatherCardProps> = ({
  city,
  temperature,
  condition,
  humidity,
  windSpeed,
  onCityReload,
  onCityDelete,
}) => {
  return (
    <Card
      component={Link}
      to={`/${encodeURIComponent(city)}`}
      sx={{
        width: "31%",
        minWidth: 275,
        borderRadius: 3,
        boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
        background: "linear-gradient(145deg, #f5f7fa 0%, #e4e8eb 100%)",
        textDecoration: "none",
        color: "inherit",
        transition: "transform 0.3s ease, box-shadow 0.3s ease",
        "&:hover": {
          transform: "scale(1.03)",
          boxShadow: "0 6px 20px rgba(0,0,0,0.2)",
        },
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
          <Box sx={{ display: "flex", gap: 1 }}>
            <IconButton
              size="small"
              onClick={(e) => {
                e.stopPropagation();
                e.preventDefault();
                onCityReload?.();
              }}
              aria-label="refresh"
            >
              <Refresh fontSize="small" />
            </IconButton>
            <IconButton
              size="small"
              color="error"
              onClick={(e) => {
                e.stopPropagation();
                e.preventDefault();
                onCityDelete?.();
              }}
              aria-label="delete"
            >
              <Delete fontSize="small" />
            </IconButton>
          </Box>
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
