import { Box, Skeleton } from "@mui/material";

const WeatherCardSkeleton = () => {
  return (
    <Box
      sx={{
        width: "31%",
        minWidth: 275,
        borderRadius: 3,
        boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
        p: 2,
      }}
    >
      {/* Skeleton for title */}
      <Skeleton variant="text" width="60%" height={32} sx={{ mb: 1 }} />

      {/* Skeleton for temperature */}
      <Skeleton variant="rectangular" width={80} height={40} sx={{ mb: 1 }} />

      {/* Skeleton for condition */}
      <Skeleton variant="text" width="40%" height={24} sx={{ mb: 2 }} />

      {/* Skeleton for divider */}
      <Skeleton variant="rectangular" width="100%" height={1} sx={{ mb: 2 }} />

      {/* Skeletons for humidity and wind */}
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Skeleton variant="text" width="40%" height={24} />
        <Skeleton variant="text" width="40%" height={24} />
      </Box>
    </Box>
  );
};

export default WeatherCardSkeleton;
