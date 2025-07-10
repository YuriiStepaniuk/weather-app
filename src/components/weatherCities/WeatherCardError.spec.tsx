import { render, screen } from "@testing-library/react";
import WeatherCardError from "./WeatherCardError";

describe("WeatherCardError", () => {
  it("renders city name, fixed message, and error message", () => {
    const city = "Kyiv";
    const error = "Network Error";

    render(<WeatherCardError city={city} error={error} />);

    expect(screen.getByRole("heading", { level: 6 })).toHaveTextContent(city);

    expect(screen.getByText("Failed to load data")).toBeInTheDocument();

    expect(screen.getByText(error)).toBeInTheDocument();
  });
});
