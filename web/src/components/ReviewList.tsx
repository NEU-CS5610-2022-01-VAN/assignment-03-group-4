import { Col, Container, Row } from "react-bootstrap";
import { useQuery } from "react-query";
import axios from "axios";

import ReviewCard from "./ReviewCard";

const ReviewList = ({ url }) => {
  const {
    isLoading,
    error,
    data: reviews,
    isFetching,
  } = useQuery(url, () => axios.get(url).then((res) => res.data));

  return (
    <>
      {error ? (
        <div>Error: {(error as any).mesasge}</div>
      ) : isLoading ? (
        <div>Loading...</div>
      ) : (
        // <section className="pt-20 pb-48">
        //   <div className=" container max-w-7xl mx-auto px-4">
            <div className="flex flex-col ">
              {reviews.map((review) => (
                <div className="ml-7 border-t h-full w-full" key={review._id}>
                  <ReviewCard review={review} />
                </div>
              ))}
            </div>
        //   </div>
        // </section>
      )}
    </>
  );
};

export default ReviewList;
