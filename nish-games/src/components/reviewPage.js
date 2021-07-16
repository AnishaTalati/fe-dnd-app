import { useContext, useEffect, useState } from "react";
import Comments from "./comments";
import { Link } from "react-router-dom";
import { UserContext } from "../contexts/user";
import Votes from "./Votes";
import CommentVotes from "./CommentVotes";
import { deleteComment, postComment, updateComments } from "../utils/utils";

const ReviewPage = ({ useParams }) => {
  const { review_id } = useParams();
  const [review, setReview] = useState([]);
  const [comments, setComments] = useState([]);
  const { user } = useContext(UserContext);
  const [commentBody, setCommentBody] = useState("");

  useEffect(() => {
    fetch(`https://nc-games-app.herokuapp.com/api/reviews/${review_id}`)
      .then((response) => response.json())
      .then((data) => {
        setReview(data.review);
      });
  }, [review_id]);

  useEffect(() => {
    fetch(
      `https://nc-games-app.herokuapp.com/api/reviews/${review_id}/comments`
    )
      .then((response) => response.json())
      .then((data) => {
        setComments(data.comments);
      });
  }, [review_id]);

  const updateComments = (comment_id) => {
    deleteComment(comment_id).then((response) => {
      setComments((currComments) => {
        let newComments = [...currComments];
        newComments.splice(newComments.indexOf(response), 1);
        return newComments;
      });
    });
  };

  return (
    <div>
      {review.map((info) => {
        return (
          <span key={info.review_id}>
            <h2>{info.title}</h2>
            <p>{info.review_body}</p>
            <p>{info.designer}</p>
            <p>
              Written by: {info.owner}
              <br />
              <Link to={`/reviews/${info.owner}`}>
                More Reviews from this author
              </Link>
            </p>

            <p>
              Category: {info.category} <br />
              <Link to={`/reviews/${info.category}`}>
                More reviews from this category
              </Link>
            </p>
            <Votes review_id={info.review_id} votes={info.votes} />
            <br />
            <div>
              <h3>Leave a Comment</h3>
              <form
                onSubmit={(event) => {
                  event.preventDefault();
                  const comment = {
                    username: user.username,
                    body: commentBody,
                  };

                  postComment(info.review_id, comment).then((comment) => {
                    setComments((currComments) => {
                      const newComments = [comment, ...currComments];
                      return newComments;
                    });
                  });
                }}
              >
                <label id="review-body">
                  <textarea
                    id="review-body"
                    value={commentBody}
                    onChange={(event) => setCommentBody(event.target.value)}
                  ></textarea>
                </label>
                <button>Submit Comment</button>
              </form>
            </div>

            <br />
            <Comments review={review}>
              {" "}
              {comments.map((comment) => (
                <div>
                  <p key={comment.comment_id}>
                    {comment.author}
                    <br />
                    Created at: {comment.created_at}
                    <br />
                    {comment.body}
                    <br />
                    <CommentVotes
                      review_id={info.review_id}
                      comment_id={comment.comment_id}
                      votes={comment.votes}
                    />
                  </p>
                  <button
                    onClick={(event) => {
                      event.preventDefault();
                      updateComments(comment.comment_id);
                    }}
                  >
                    Delete Comment
                  </button>
                </div>
              ))}
            </Comments>
          </span>
        );
      })}
    </div>
  );
};

export default ReviewPage;
