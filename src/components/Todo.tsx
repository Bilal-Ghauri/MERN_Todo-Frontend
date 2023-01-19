import React from "react";
import axios, { baseURL } from "../config/axios";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store/store";
import { deleteTodo , addUpdateTodo } from "../store/slices/TodoSlice";

const Todo = ({ todo }: any) => {
  const dispatch = useDispatch();
  const { todos } = useSelector((state: RootState) => state.TodoReducer);

  const handleDelete = async (id: string) => {
    dispatch(deleteTodo(id));
    try {
      await axios.delete(`${baseURL}todo/deleteTodo/${id}`);
    } catch (error) {}
  };

  return (
    <div className="todo w-full border md:flex justify-between mt-3 p-2">
      <div className="text">{todo.content}</div>
      <div className="btns mt-4 md:mt-0 flex md:block">
        <button onClick={()=> dispatch(addUpdateTodo(todo))} className="bg-green-500 w-full md:w-fit border-[1px] text-white py-1 px-3 text-sm mr-2 hover:bg-white hover:text-green-500 hover:border-green-500 hover:border-[1px]">
          Edit
        </button>
        <button
          onClick={() => {
            handleDelete(todo._id);
          }}
          className="bg-red-500 w-full md:w-fit border-[1px] text-white py-1 px-3 text-sm  hover:bg-white hover:text-red-500 hover:border-red-500 hover:border-[1px]"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default Todo;
