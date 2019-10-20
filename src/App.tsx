import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Todos from "./Todos";
import Users from "./Users";
import UserForm from "./UserForm";
import "./App.css";
// import logo from "./logo.svg";

const App: React.FC = () => {
  return (
    <Router>
      <div>
        <ul>
          <li>
            <Link to="/">Todos</Link>
          </li>
          <li>
            <Link to="/users">Users</Link>
          </li>
        </ul>
        <hr />
        <Switch>
          <Route exact path="/">
            <Todos />
          </Route>
          <Route path="/users">
            <Users />
          </Route>
          <Route path="/user/:id">
            <UserForm />
          </Route>
        </Switch>
      </div>
    </Router>
  );
};

export default App;
