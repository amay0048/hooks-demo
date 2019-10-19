import React from "react";
import { useTodos } from "./store/todos";
import { useUser } from "./store/users";

const User = ({ id }) => {
  const { user, isLoading, isError } = useUser(id);
  return (
    <>
      <small>
        {user.username} - {user.email}
      </small>
    </>
  );
};

const Todos = () => {
  const { todos, addTodo, toggleTodo } = useTodos();

  return (
    <>
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
    </>
  );
};

export default Todos;
