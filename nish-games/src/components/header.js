import { Link, Route } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../contexts/user";

const Header = () => {
  const { user } = useContext(UserContext);

  return (
    <div className="header">
      <a href="/">
        <h1>Nish's Game Reviews </h1>
      </a>
    </div>
  );
};

export default Header;
