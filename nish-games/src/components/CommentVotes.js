import { useEffect, useState } from "react";
import { patchCommentVotes } from "../utils/utils";

const CommentVotes = ({ review_id, comment_id, votes }) => {
  const [votesChange, setVotes] = useState(0);

  const incVotes = () => {
    patchCommentVotes(review_id, comment_id, 1).then(() => {
      setVotes((currVotes) => {
        return currVotes + 1;
      });
    });
  };

  return (
    <section>
      <p>Votes: {votes + votesChange}</p>
      <button disabled={votesChange > 0} onClick={incVotes}>
        Vote!
      </button>
    </section>
  );
};

export default CommentVotes;
