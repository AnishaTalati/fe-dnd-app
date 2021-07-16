import { Link } from "react-router-dom";
import { getCategories, sortReviews } from "../utils/utils";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../contexts/user";

const BrowsingBar = ({ users, setUsers }) => {
  const [categories, setCategories] = useState([]);
  const { user } = useContext(UserContext);

  useEffect(() => {
    getCategories().then((data) => {
      setCategories(data);
    });
  });

  return (
    <h2>
      <DropDown>
        <button className="dropbtn">Review By Category</button>
        <div className="dropdown-content">
          {categories.map((category) => {
            return (
              <a key={category.slug} href={`/reviews/${category.slug}`}>
                {category.slug}
              </a>
            );
          })}
        </div>
      </DropDown>
      <DropDown>
        <button className="dropbtn">Review By Owner</button>
        <div className="dropdown-content">
          {users.map((user) => {
            return (
              <a key={user.username} href={`/users/${user.username}/reviews`}>
                {user.username}
              </a>
            );
          })}
        </div>
      </DropDown>
      <DropDown>
        <button className="dropbtn">Sort By</button>
        <div className="dropdown-content">
          <a href={`/reviews/all/order_by=asc`}>Most Recent</a>
          <a href={`/reviews/all/sort_by=votes`}>Most Popular</a>
          <a href={`/reviews/all/sort_by=comments`}>Most Comments</a>
        </div>
      </DropDown>
      <div className="current-user">
        <Link to="/login">Login</Link>
        <br />
        Currently Logged in as:
        <img className="current-user-img" src={user.avatar_url}></img>
        <span>{user.username}</span>
      </div>
    </h2>
  );
};

const DropDown = ({ children }) => {
  return <div className="dropdown">{children}</div>;
};

export default BrowsingBar;
