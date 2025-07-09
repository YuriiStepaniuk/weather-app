import { useEffect, useState } from "react";
import { CityOption } from "../types/geocoding";
import { geocodingService } from "../services/geocodingService";

export const useCitySearch = (inputValue: string) => {
  const [options, setOptions] = useState<CityOption[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!inputValue.trim()) {
      setOptions([]);
      return;
    }

    const delayDebounce = setTimeout(async () => {
      setLoading(true);
      try {
        const results = await geocodingService.searchCities(inputValue);
        setOptions(results);
      } catch (err) {
        console.error("Error loading cities", err);
        setOptions([]);
      } finally {
        setLoading(false);
      }
    }, 400);

    return () => clearTimeout(delayDebounce);
  }, [inputValue]);

  return { options, loading };
};
