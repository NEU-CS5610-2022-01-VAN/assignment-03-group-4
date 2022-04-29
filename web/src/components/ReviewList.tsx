import { useQuery } from "react-query";
import axios from "axios";

import ReviewCard from "./ReviewCard";


const ReviewList = ({ url, showDeleteButton, showRecipe }) => {
  const {
    isLoading,
    error,
    data: reviews,
  } = useQuery(url, () => axios.get(url).then((res) => res.data));

  return (
    <>
      {error ? (
        <div>Error: {(error as any).mesasge}</div>
      ) : isLoading ? (
        <div>Loading...</div>
      ) : (
        <section className="py-8">
          <div className=" container max-w-7xl mx-auto px-4">
            <div className="flex flex-row flex-wrap ">
              {reviews.length > 0 &&
                reviews.map((review) => (
                  <div className="ml-7 h-full w-full" key={review._id}>
                    <ReviewCard review={review} showDeleteButton={showDeleteButton} showRecipe={showRecipe}/>
                  </div>
                ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default ReviewList;
