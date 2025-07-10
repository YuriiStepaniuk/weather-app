import {
  TextField,
  Box,
  IconButton,
  Autocomplete,
  CircularProgress,
} from "@mui/material";
import { Search } from "@mui/icons-material";
import { useState, FC } from "react";
import { CityOption } from "../../types/geocoding";
import { useCitySearch } from "../../hooks/useCitySearch";
import { formatCityOptions } from "../../utils/formatCityOptions";

interface WeatherSearchProps {
  onSearch: (city: string) => void;
}

const WeatherSearch: FC<WeatherSearchProps> = ({ onSearch }) => {
  const [inputValue, setInputValue] = useState("");

  const [selectedCity, setSelectedCity] = useState<CityOption | null>(null);

  const { options, loading } = useCitySearch(inputValue);

  const handleSearch = () => {
    if (selectedCity) {
      onSearch(selectedCity.name);
    }
  };

  return (
    <Box sx={{ display: "flex", alignItems: "center", my: 3, gap: 1 }}>
      <Autocomplete
        fullWidth
        options={options}
        loading={loading}
        value={selectedCity}
        inputValue={inputValue}
        onInputChange={(_, newInput) => setInputValue(newInput)}
        onChange={(_, newValue) => setSelectedCity(newValue)}
        getOptionLabel={(option) => formatCityOptions(option)}
        isOptionEqualToValue={(option, value) =>
          option.lat === value.lat && option.lon === value.lon
        }
        renderOption={(props, option) => (
          <li {...props} key={`${option.lat}-${option.lon}`}>
            {formatCityOptions(option)}
          </li>
        )}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Search city"
            variant="outlined"
            InputProps={{
              ...params.InputProps,
              endAdornment: (
                <>
                  {loading ? <CircularProgress size={20} /> : null}
                  {params.InputProps.endAdornment}
                </>
              ),
            }}
          />
        )}
      />

      <IconButton
        color="primary"
        onClick={handleSearch}
        disabled={!selectedCity}
        aria-label="search"
      >
        <Search />
      </IconButton>
    </Box>
  );
};

export default WeatherSearch;
