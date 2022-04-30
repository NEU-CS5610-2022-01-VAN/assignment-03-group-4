import { render, screen } from "@testing-library/react";
import RecipeListByURL from "../components/RecipeListByURL";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";

jest.mock("react-query", () => ({
  ...jest.requireActual("react-query"),
  QueryClientProvider: ({ children }) => children,
  useQuery: () => {
    return {
      isLoading: false,
      data: [
        { title: "recipe1", photos: [], author: { id: 1 } },
        { title: "recipe2", photos: [], author: { id: 1 } },
        { title: "recipe3", photos: [], author: { id: 1 } },
      ],
      error: false,
    };
  },
}));

test("renders recipe list", async () => {
  render(
    <MemoryRouter initialEntries={["/"]}>
      <RecipeListByURL />
    </MemoryRouter>
  );

  expect(screen.getByText("recipe1")).toBeInTheDocument();
  expect(screen.getByText("recipe2")).toBeInTheDocument();
  expect(screen.getByText("recipe3")).toBeInTheDocument();
});
