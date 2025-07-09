import {
  TextField,
  Button,
  Box,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { Search, MyLocation } from "@mui/icons-material";
import { styled } from "@mui/material/styles";
import { useState, FC } from "react";

const SearchButton = styled(Button)(({ theme }) => ({
  height: "56px",
  marginLeft: theme.spacing(1),
  background: "linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)",
  "&:hover": {
    background: "linear-gradient(45deg, #1976D2 30%, #1E88E5 90%)",
  },
}));

interface WeatherSearchProps {
  onSearch: (city: string) => void;
}

const WeatherSearch: FC<WeatherSearchProps> = ({ onSearch }) => {
  const [location, setLocation] = useState<string>("");

  const handleSearch = () => {
    if (location) {
      onSearch(location.trim());
    }
  };

  const handleCurrentLocation = () => {
    console.log("Getting current location");
  };

  return (
    <Box sx={{ display: "flex", alignItems: "center", my: 3 }}>
      <TextField
        fullWidth
        variant="outlined"
        placeholder="Search location..."
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Search color="action" />
            </InputAdornment>
          ),
          endAdornment: location && (
            <InputAdornment position="end">
              <IconButton onClick={() => setLocation("")} size="small">
                ×
              </IconButton>
            </InputAdornment>
          ),
          sx: {
            borderRadius: "8px",
            backgroundColor: "background.paper",
          },
        }}
        onKeyPress={(e) => e.key === "Enter" && handleSearch()}
      />

      <SearchButton
        variant="contained"
        onClick={handleSearch}
        startIcon={<Search />}
      >
        Search
      </SearchButton>

      <IconButton
        color="primary"
        sx={{ ml: 1 }}
        onClick={handleCurrentLocation}
      >
        <MyLocation />
      </IconButton>
    </Box>
  );
};

export default WeatherSearch;
