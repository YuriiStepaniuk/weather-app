import { Box, Typography } from "@mui/material";

interface WeatherCardErrorProps {
  city: string;
  error: string;
}

const WeatherCardError: React.FC<WeatherCardErrorProps> = ({ city, error }) => {
  return (
    <Box
      sx={{
        width: "31%",
        minWidth: 275,
        p: 2,
        border: "1px solid #f44336",
        borderRadius: 2,
        color: "#f44336",
        textAlign: "center",
        boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
        background: "#fff0f0",
      }}
    >
      <Typography variant="h6" fontWeight="bold">
        {city}
      </Typography>
      <Typography variant="body2">Failed to load data</Typography>
      <Typography variant="caption" color="error.main">
        {error}
      </Typography>
    </Box>
  );
};

export default WeatherCardError;
