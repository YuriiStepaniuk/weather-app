import { render, screen } from "@testing-library/react";
import WeatherCardSkeleton from "./WeatherCardSkeleton";
import { Skeleton } from "@mui/material";

describe("WeatherCardSkeleton", () => {
  it("renders without crashing", () => {
    render(<WeatherCardSkeleton />);
  });

  it("renders text and rectangular Skeletons", () => {
    render(<WeatherCardSkeleton />);
    const textSkeletons = screen.getAllByTestId("skeleton-text");
    const rectSkeletons = screen.getAllByTestId("skeleton-rect");

    expect(textSkeletons.length).toBe(2);
    expect(rectSkeletons.length).toBe(2);
  });
});
