import { getReviews, sortReviews } from "../utils/utils";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

const Reviews = ({ reviews, setReviews }) => {
  const { category, query, user } = useParams();
  const categories = [
    "strategy",
    "hidden-roles",
    "dexterity",
    "push-your-luck",
    "roll-and-write",
    "deck-building",
    "engine-building",
  ];

  useEffect(() => {
    getReviews(category, query, user).then((response) => {
      console.log(response);
      setReviews(response);
    });
  }, []);

  return (
    <div>
      <h2>
        {categories.includes(category)
          ? `Showing ${category} Reviews`
          : `Showing All Reviews`}
      </h2>
      <ul className="reviews-list">
        {" "}
        {reviews.map((review) => {
          return (
            <Link
              key={review.review_id}
              to={`/reviews/review/${review.review_id}`}
            >
              <li className="reviews">
                <h4>{review.title}</h4>
                <img src={review.review_img_url} className="review-img"></img>
                <br />
                Author: {review.owner}
                <br />
                Votes: {review.votes}
                Comments: {review.comment_count}
              </li>
            </Link>
          );
        })}
      </ul>
    </div>
  );
};

export default Reviews;
