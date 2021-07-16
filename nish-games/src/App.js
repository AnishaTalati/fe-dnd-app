import "./App.css";
import { BrowserRouter, Route, Switch, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { UserContext } from "./contexts/user";
import Header from "./components/header";
import BrowsingBar from "./components/browsingBar";
import Reviews from "./components/reviews";
import UsersList from "./components/usersList";
import ReviewPage from "./components/reviewPage";
import { getUsers } from "./utils/utils";

function App() {
  const [reviews, setReviews] = useState([]);
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState({
    username: "cooljmessy",
    avatar_url: "https://i.imgur.com/WfX0Neu.jpg",
    name: "Peter Messy",
  });

  useEffect(() => {
    getUsers().then((response) => {
      setUsers(response);
    });
  }, []);

  return (
    <BrowserRouter>
      <UserContext.Provider value={{ user, setUser }}>
        <div className="App">
          <Header />
          <BrowsingBar
            reviews={reviews}
            setReviews={setReviews}
            setUsers={setUsers}
            users={users}
          />
          <Switch>
            <Route exact path="/">
              <Reviews reviews={reviews} setReviews={setReviews} />
            </Route>
            <Route exact path="/reviews/:category">
              <Reviews reviews={reviews} setReviews={setReviews} />
            </Route>
            <Route exact path="/reviews/all/:query">
              <Reviews
                reviews={reviews}
                setReviews={setReviews}
                useParams={useParams}
              />
            </Route>
            <Route exact path="/users/:user/reviews">
              <Reviews
                reviews={reviews}
                setReviews={setReviews}
                useParams={useParams}
              />
            </Route>
            <Route exact path="/reviews/review/:review_id">
              <ReviewPage useParams={useParams} />
            </Route>
            <Route exact path="/login">
              <UsersList users={users} setUsers={setUsers} />
            </Route>
          </Switch>
        </div>
      </UserContext.Provider>
    </BrowserRouter>
  );
}

export default App;
