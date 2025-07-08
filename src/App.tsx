import { BrowserRouter, Routes, Route } from "react-router-dom";
import WeatherCities from "./pages/WeatherCities";
import NotFound from "./components/NotFound";
import { Provider } from "react-redux";
import { store } from "./store/store";
import { ROUTE } from "./route";
import Layout from "./components/Layout";
import CityWeatherDetails from "./pages/CityWeatherDetails";

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path={ROUTE.HOME} element={<Layout />}>
            <Route index element={<WeatherCities />} />
            <Route path={ROUTE.CITY} element={<CityWeatherDetails />} />
            <Route path={ROUTE.NOT_FOUND} element={<NotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
