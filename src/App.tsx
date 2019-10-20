import React from "react";
import Todos from "./Todos";
import TodoForm from "./TodoForm";
import "./App.css";
// import logo from "./logo.svg";

const App: React.FC = () => {
  return (
    <div className="App">
      <TodoForm />
      <hr/>
      <Todos />
      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header> */}
    </div>
  );
};

export default App;
