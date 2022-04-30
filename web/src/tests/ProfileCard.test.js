import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import ProfileCard from "../components/ProfileCard";
import "@testing-library/jest-dom";

jest.mock("react-query", () => ({
  ...jest.requireActual("react-query"),
  QueryClientProvider: ({ children }) => children,
  useQuery: () => {
    return {
      isLoading: false,
      data: "http://picture.com",
    };
  },
}));

test("renders user profile card", () => {
  render(
    <MemoryRouter initialEntries={["/"]}>
      <ProfileCard
        user={{
          _id: "001",
          name: "steven",
          bio: "creating yummy food",
          recipes: [],
          reviews: [],
        }}
      />
    </MemoryRouter>
  );

  expect(screen.getByText("steven")).toBeInTheDocument();
  expect(screen.getByText('Bio: "creating yummy food"')).toBeInTheDocument();
  expect(screen.getByText("0 Recipes")).toBeInTheDocument();
  expect(screen.getByText("0 Comments")).toBeInTheDocument();
});
