import { render, screen } from "@testing-library/react";
import Header from "./Header";
import { MemoryRouter } from "react-router-dom";

describe("Header", () => {
  it("renders the app title", () => {
    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    );

    expect(screen.getByRole("heading", { name: /weather app/i })).toBeInTheDocument();
  });

  it("renders the weather icon", () => {
    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    );

    expect(screen.getByTestId("WbSunnyIcon")).toBeInTheDocument();
  });

  it("wraps title in a Link to home", () => {
    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    );

    const link = screen.getByRole("link", { name: /weather app/i });
    expect(link).toHaveAttribute("href", "/");
  });
});
