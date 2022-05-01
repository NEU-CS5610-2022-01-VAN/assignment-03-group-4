import axios from "axios";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import Section from "./Section";
import LoadingIcon from "./LoadingIcon";

const url = `${process.env.REACT_APP_API_BASE_URL}/categories`;

type Props = {
  recipes: IRecipe[];
};

const TypeSection = ({ recipes }: Props): JSX.Element => {
  const {
    isLoading,
    error,
    data: categories,
  } = useQuery<ICategory[], Error>(url, () =>
    axios.get(url).then((res) => res.data)
  );

  return (
    <>
      {error ? (
        <div>Error: {error.message}</div>
      ) : isLoading ? (
        <LoadingIcon />
      ) : (
        <>
          {categories &&
            categories.slice(0, 5).map((category) => (
              <div
                key={category._id}
                className="flex flex-col font-serif text-xl font-bold pt-2"
              >
                <Link to={`/categories/${category._id}`}>
                  Find More on {category.name}
                </Link>
                <hr className="mt-2 mb-2" />
                <Section
                  recipes={Array.from(
                    recipes
                      .filter(
                        (x) =>
                          x.categories.length > 0 &&
                          x.categories.some(
                            (item) => item.name === category.name
                          )
                      )
                      .sort((a, b) => b.rating - a.rating)
                      .slice(0, 3)
                  )}
                />
              </div>
            ))}
        </>
      )}
    </>
  );
};

export default TypeSection;
