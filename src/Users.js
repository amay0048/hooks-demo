import React from "react";
import { useUsers } from "./store/users";
import Loader from "./render-helpers/Loader";
import { Link } from "react-router-dom";

const Todos = () => {
  const { users, isLoading, isError } = useUsers();
  return (
    <Loader isLoading={isLoading} isError={isError}>
      <h2>Users</h2>
      <ul>
        {users.map(user => (
          <li key={user.id}>
            <Link to={`/user/${user.id}`}>
              {user.name} - {user.username} - {user.email}
            </Link>
          </li>
        ))}
      </ul>
    </Loader>
  );
};

export default Todos;
