import React from "react";
import Todo from "./Todo";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";

const Todos = () => {
  const { todos } = useSelector((state: RootState) => state.TodoReducer);
  return (
    <div className="todos py-4">
      <h2 className="text-3xl text-center">TodosList</h2>
      {todos.length == 0 ? (
        <h2 className="text-xl text-center mt-5">No Todo's Yet</h2>
      ) : (
        todos.map((el) => {
          return <Todo key={el._id} todo={el} />;
        })
      )}
    </div>
  );
};

export default Todos;
