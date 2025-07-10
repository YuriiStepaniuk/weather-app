import { render, screen, fireEvent } from "@testing-library/react";
import WeatherCard from "./WeatherCard";
import { MemoryRouter } from "react-router-dom";

describe("WeatherCard", () => {
  const mockProps = {
    city: "Kyiv",
    temperature: 26,
    condition: "Clear",
    humidity: 45,
    windSpeed: 12,
    onCityReload: jest.fn(),
    onCityDelete: jest.fn(),
  };

  const setup = () =>
    render(
      <MemoryRouter>
        <WeatherCard {...mockProps} />
      </MemoryRouter>
    );

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders city and weather data", () => {
    setup();

    expect(screen.getByText("Kyiv")).toBeInTheDocument();
    expect(screen.getByText("26°C")).toBeInTheDocument();
    expect(screen.getByText("Clear")).toBeInTheDocument();
    expect(screen.getByText("45%")).toBeInTheDocument();
    expect(screen.getByText("12 km/h")).toBeInTheDocument();
  });

  it("calls onCityReload when refresh button is clicked", () => {
    setup();

    const reloadButton = screen.getByRole("button", { name: /refresh/i });
    fireEvent.click(reloadButton);
    expect(mockProps.onCityReload).toHaveBeenCalledTimes(1);
  });

  it("calls onCityDelete when delete button is clicked", () => {
    setup();

    const deleteButton = screen.getByRole("button", { name: /delete/i });
    fireEvent.click(deleteButton);
    expect(mockProps.onCityDelete).toHaveBeenCalledTimes(1);
  });

  it("renders a link to the encoded city route", () => {
    setup();

    const cardLink = screen.getByRole("link");
    expect(cardLink).toHaveAttribute("href", "/Kyiv");
  });

  it("prevents navigation when buttons are clicked", () => {
    setup();

  const reloadButton = screen.getByRole("button", { name: /refresh/i });

  const event = new MouseEvent("click", {
    bubbles: true,
    cancelable: true,
  });

  event.stopPropagation = jest.fn();
  event.preventDefault = jest.fn();

  reloadButton.dispatchEvent(event);

  expect(event.stopPropagation).toHaveBeenCalled();
  expect(event.preventDefault).toHaveBeenCalled();
  });
});
