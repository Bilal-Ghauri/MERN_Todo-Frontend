import React , {useEffect} from "react";
import { useSelector, useDispatch } from "react-redux";
import Form from "./Form";
import Todos from "./Todos";
import { RootState } from "../store/store";
import { removeUser } from "../store/slices/UserSlice";
import { useNavigate } from "react-router-dom";
import {removeTodos} from '../store/slices/TodoSlice'
import axios , {baseURL} from '../config/axios'
import { updateTodos } from "../store/slices/TodoSlice";
import Cookies from "js-cookie";


const Home = () => {
  const {isAuthenticated , user} = useSelector((state : RootState) => state.UserReducer)
  const {todos} = useSelector((state : RootState) => state.TodoReducer)


  const dispatch = useDispatch()
  const navigate = useNavigate()
  
  const handleClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    dispatch(removeUser())
    dispatch(removeTodos())
    Cookies.remove('todoToken')
    navigate('/login')
  }

   const getAllTodos = async()=> {
    const apiRequest = await axios.get(`${baseURL}todo/getAllTodo`)
    const apiData = await apiRequest.data
    dispatch(updateTodos(apiData))
  }
  

  useEffect(()=> {
    getAllTodos()
  } , [])

  return (
    <div>
      <div className="py-3 px-5 text-right">
      <button onClick={handleClick} className="bg-transparent text-white border-2 border-white hover:bg-red-500 hover:border-red-500 rounded-lg py-1 px-4 cursor-pointer">
          Logout
        </button>
      </div>
      <div className="px-5 md:px-0">
      <div className="container w-full xl:3/4 md:w-2/4   p-5 mt-2 md:mx-auto bg-white">
        <h2 className="text-3xl pt-4 text-center">TodoInput</h2>
        <Form />
        <Todos />
      </div>
      </div>
    </div>
  );
};


export default Home;
