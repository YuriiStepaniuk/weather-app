import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import { Box, Typography } from "@mui/material";

interface HourlyGraphProps {
  data: { time: string; temp: number }[];
}

const HourlyTemperatureGraph: React.FC<HourlyGraphProps> = ({ data }) => {
  return (
    <Box mt={4}>
      <Typography variant="h6" gutterBottom>
        24-Hour Temperature
      </Typography>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="time" />
          <YAxis unit="°C" />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="temp"
            stroke="#1976d2"
            strokeWidth={2}
          />
        </LineChart>
      </ResponsiveContainer>
    </Box>
  );
};

export default HourlyTemperatureGraph;
