import { render, screen } from "@testing-library/react";
import ReviewCard from "../components/ReviewCard";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";

jest.mock("react-query", () => ({
  ...jest.requireActual("react-query"),
  QueryClientProvider: ({ children }) => children,
  useQuery: () => {
    return {
      isLoading: false,
      data: "http://picture.com",
      error: false,
    };
  },
}));

test("enter App button navigates to /app", async () => {
  render(
    <MemoryRouter initialEntries={["/"]}>
      <ReviewCard
        review={{
          author: { name: "jack", _id: "001" },
          recipe: "",
          title: "title",
          content: "content",
          createdAt: "2022-04-30",
          rating: 5,
        }}
        showDeleteButton={false}
        showRecipe={false}
      />
    </MemoryRouter>
  );
  expect(screen.getByText("jack")).toBeInTheDocument();
  expect(screen.getByText('"title"')).toBeInTheDocument();
  expect(screen.getByText("content")).toBeInTheDocument();
});
