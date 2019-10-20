import React from "react";
import { useTodos } from "./store/todos";
import { useUser } from "./store/users";
import Loader from "./render-helpers/Loader";

const User = ({ id }) => {
  const { user, isLoading, isError } = useUser(id, {});
  return (
    <Loader isLoading={isLoading} isError={isError}>
      <small>
        {user.username} - {user.email}
      </small>
    </Loader>
  );
};

const Todos = () => {
  const { todos, isLoading, isError } = useTodos();
  return (
    <Loader isLoading={isLoading} isError={isError}>
      <h2>Todos</h2>
      <ul>
        {todos.map(todo => (
          <li key={todo.id} onClick={() => console.log(todo.id)}>
            <p>
              {todo.completed ? "👌" : "👋"} {todo.title}
            </p>
            <User id={todo.userId} />
          </li>
        ))}
      </ul>
    </Loader>
  );
};

export default Todos;
