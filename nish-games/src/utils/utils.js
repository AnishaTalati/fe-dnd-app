import axios from "axios";
import { Link } from "react-router-dom";

const reviewsApi = axios.create({
  baseURL: "https://nc-games-app.herokuapp.com/api",
});

export const getCategories = async () => {
  const { data } = await reviewsApi.get("/categories");
  return data.categories;
};

export const getReviews = async (category, query, user) => {
  if (category) {
    const { data } = await reviewsApi.get(`/reviews`, {
      params: {
        category: category,
      },
    });
    return data.reviews;
  } else if (query) {
    const { data } = await reviewsApi.get(`/reviews?${query}`);
    return data.reviews;
  } else if (user) {
    const { data } = await reviewsApi.get(`/reviews`);
    const reviews = data.reviews;
    return reviews.filter((review) => review.owner === user);
  } else {
    const { data } = await reviewsApi.get(`/reviews`);
    return data.reviews;
  }
};

export const getUsers = async () => {
  const { data } = await reviewsApi.get("/users");
  return data.users;
};

export const patchVotes = (review_id, increment) => {
  return reviewsApi
    .patch(`/reviews/${review_id}`, {
      inc_votes: increment,
    })
    .then((response) => {
      console.log(response.data);
    });
};

export const patchCommentVotes = (review_id, comment_id, increment) => {
  return reviewsApi
    .patch(`/reviews/${review_id}/comments/${comment_id}`, {
      inc_votes: increment,
    })
    .then((response) => {
      console.log(response.data);
    });
};

export const postComment = (review_id, comment) => {
  return reviewsApi
    .post(`/reviews/${review_id}/comments`, comment)
    .then((response) => {
      console.log(response);
      return response.data.comment;
    });
};

export const deleteComment = (comment_id) => {
  return reviewsApi.delete(`/comments/${comment_id}`).then((response) => {
    console.log(response.data);
  });
};
