import { useEffect, useState } from "react";
import { patchVotes } from "../utils/utils";

const Votes = ({ review_id, votes }) => {
  const [votesChange, setVotes] = useState(0);

  const incVotes = () => {
    setVotes((currVotes) => {
      return currVotes + 1;
    });
    patchVotes(review_id, 1).then(() => {});
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

export default Votes;
