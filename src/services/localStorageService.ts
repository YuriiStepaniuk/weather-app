const LOCAL_STORAGE_KEY = "weather_cities";

class LocalStorageService {
  getCities(): string[] {
    try {
      const data = localStorage.getItem(LOCAL_STORAGE_KEY);
      return data ? JSON.parse(data) : [];
    } catch (error) {
      console.error("Failed to load cities from localStorage", error);
      return [];
    }
  }

  saveCities(cities: string[]): void {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(cities));
    } catch (error) {
      console.error("Failed to save cities to localStorage", error);
    }
  }

  addCity(city: string): void {
    const current = localStorageService.getCities();
    if (!current.includes(city)) {
      localStorageService.saveCities([...current, city]);
    }
  }

  removeCity(city: string): void {
    const current = localStorageService.getCities();
    localStorageService.saveCities(current.filter((c) => c !== city));
  }
}

export const localStorageService = new LocalStorageService();
