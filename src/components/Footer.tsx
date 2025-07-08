import { Typography, Paper } from "@mui/material";

const Footer = () => {
  return (
    <Paper
      sx={{
        mt: "auto",
        py: 2,
        px: 1,
        textAlign: "center",
        backgroundColor: (theme) => theme.palette.grey[200],
      }}
      elevation={0}
      component="footer"
    >
      <Typography variant="body2" color="text.secondary">
        Weather data by OpenWeather | Yurii's WeatherApp © 2025
      </Typography>
    </Paper>
  );
};

export default Footer;
