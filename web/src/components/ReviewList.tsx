import axios from "axios";
import { useQuery } from "react-query";
import { BiCommentDots } from "react-icons/bi";
import ReviewCard from "./ReviewCard";
import LoadingIcon from "./LoadingIcon";

type Props = {
  url: string;
  showDeleteButton: boolean;
  showRecipe: boolean;
};

const ReviewList = ({
  url,
  showDeleteButton,
  showRecipe,
}: Props): JSX.Element => {
  const {
    isLoading,
    error,
    data: reviews,
  } = useQuery<IReview[], Error>(url, () =>
    axios.get(url).then((res) => res.data)
  );

  return (
    <>
      {error ? (
        <div>Error: {error.message}</div>
      ) : isLoading ? (
        <LoadingIcon />
      ) : reviews!.length ? (
        <section className="py-8">
          <div className="container max-w-7xl mx-auto px-4">
            <div className="flex flex-row flex-wrap ">
              {reviews!.length > 0 &&
                reviews!.map((review) => (
                  <div className="ml-7 h-full w-full" key={review._id}>
                    <ReviewCard
                      review={review}
                      showDeleteButton={showDeleteButton}
                      showRecipe={showRecipe}
                    />
                  </div>
                ))}
            </div>
          </div>
        </section>
      ) : (
        <div className="flex flex-col justify-center text-gray-600 my-16 p-2 items-center">
          <BiCommentDots size={25} />
          <p> No review yet.</p>
        </div>
      )}
    </>
  );
};

export default ReviewList;
