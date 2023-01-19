import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { addTodo } from "../store/slices/TodoSlice";
import { useSelector } from "react-redux";
import axios, { baseURL } from "../config/axios";
import { RootState } from "../store/store";
import { updateTodos , removeUpdateTodo } from "../store/slices/TodoSlice";

interface Todo {
  user: string;
  _id: string | number;
  content: string;
}

const Form = () => {
  const { user } = useSelector((state: RootState) => state.UserReducer);
  const { updateTodo, todos } = useSelector(
    (state: RootState) => state.TodoReducer
  );

  const dispatch = useDispatch();

  const [todoText, setTodoText] = useState<string>("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTodoText(e.target.value);
  };

  const getAllTodos = async () => {
    const apiRequest = await axios.get(`${baseURL}todo/getAllTodo`);
    const apiData = await apiRequest.data;
    dispatch(updateTodos(apiData));
  };

  useEffect(() => {
    if (updateTodo !== null) {
      setTodoText(updateTodo.content);
    }
  }, [updateTodo]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (todoText.trim() == "") {
      return alert("Enter Todo Value");
    }

    try {
      if (updateTodo !== null) {
        const newTodosArray = todos.map((el) => {
          if (el._id == updateTodo._id) {
            return {
              ...updateTodo,
              content: todoText,
            };
          }
          return el;
        });
        dispatch(updateTodos(newTodosArray));
        dispatch(removeUpdateTodo())
        try {
          await axios.put(
            `${baseURL}todo/editTodo/${updateTodo._id}`,
            { content: todoText }
          );
          setTodoText('')

        } catch (error) {}
      } else {
        const newTodo: Todo = {
          _id: Math.floor(Math.random() * 10000),
          user: user._id,
          content: todoText,
        };
        dispatch(addTodo(newTodo));
        const apiRequest = await axios.post(`${baseURL}todo/postTodo`, {
          content: todoText,
        });
        setTodoText("");
        const apiData = await apiRequest.data;
      }

      getAllTodos();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <form className=" mt-5" onSubmit={handleSubmit}>
      <input
        type="text"
        className="w-full border py-1 px-3 outline-none "
        placeholder="Add new todo"
        value={todoText}
        onChange={handleChange}
      />
      <button
        type="submit"
        className="bg-green-500 border-[1px] text-white w-full py-1  hover:bg-white hover:text-green-500 hover:border-green-500 hover:border-[1px] mt-3"
      >
        {updateTodo == null ? "Add new task" : "Edit Task"}
      </button>
    </form>
  );
};

export default Form;
