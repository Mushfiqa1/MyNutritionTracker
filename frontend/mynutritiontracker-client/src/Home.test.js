import React from "react";
import { render, screen } from "@testing-library/react";

// ----------------------
// MOCK EVERYTHING BEFORE IMPORTING HOME
// ----------------------

// Mock react-router-dom (prevents navigate() and redirect loops)
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => jest.fn(),
}));

// Mock API calls so useEffect doesn't crash
jest.mock("./api", () => ({
  getEntries: jest.fn(() => Promise.resolve({ data: [] })),
  deleteEntry: jest.fn(),
}));

// Mock localStorage so Home thinks user is logged in
beforeAll(() => {
  Storage.prototype.getItem = jest.fn(() => "fake-token");
});

// Import Home AFTER mocks
import Home from "./pages/Home";

// ----------------------
// TEST
// ----------------------
test("renders home title", () => {
  render(<Home />);

  expect(
    screen.getByText(/Your Nutrition Tracker/i)
  ).toBeInTheDocument();
});
