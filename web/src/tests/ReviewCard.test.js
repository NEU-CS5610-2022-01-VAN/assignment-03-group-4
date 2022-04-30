import { render, screen } from "@testing-library/react";
import ReviewCard from "../components/ReviewCard";
import { MemoryRouter } from "react-router-dom";
import userEvent from "@testing-library/user-event";

const mockUseNavigate = jest.fn();

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

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => {
    return mockUseNavigate;
  },
}));

test("enter App button navigates to /app", () => {
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
        showRecipe={true}
      />
    </MemoryRouter>
  );

  const enterAppButton = screen.getByText("jack");
  console.log(enterAppButton);
  userEvent.click(enterAppButton);
  expect(mockUseNavigate).toHaveBeenCalledWith("/recipe/");
});
