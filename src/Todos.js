import React from "react";
import { useTodos } from "./store/todos";

const Todos = () => {
  const { todos, addTodo, toggleTodo } = useTodos();

  console.log({todos});

  return (
    <>
      <h2>Todos</h2>
      <ul>
        {todos.map(todo => (
          <li key={todo.id} onClick={() => console.log(todo.id)}>
            {todo.completed ? "👌" : "👋"} {todo.title}
          </li>
        ))}
      </ul>
    </>
  );
};

export default Todos;
