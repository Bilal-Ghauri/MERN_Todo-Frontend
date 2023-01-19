import "./App.css";
import {useEffect} from 'react'
import { CSSProperties } from "react";
import DotLoader from "react-spinners/DotLoader";
import { Routes, Route, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Home from "./components/Home";
import Login from "./components/Login";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "./store/store";
import PrivateRoute from "./PrivateRoute";
import ErrorPage from "./components/ErrorPage";
import axios , {baseURL} from "./config/axios";
import Cookies from "js-cookie";
import {loadingTrue , loadingFalse , addUser} from './store/slices/UserSlice'
import {updateTodos} from './store/slices/TodoSlice'

const override: CSSProperties = {
  display: "block",
  margin: "0 auto",
  borderColor: "red",
};



function App() {
  const { loading } = useSelector((state: RootState) => state.UserReducer);

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const getLoginUser = async()=> {
    const token = Cookies.get('todoToken')
    if(token && token !== ''){
      dispatch(loadingTrue())
      const apiRequest = await axios.get(`${baseURL}user/getUser`)
      const apiData = await apiRequest.data
      dispatch(loadingFalse())
      dispatch(addUser(apiData))
      navigate('/')
    }else{
        dispatch(loadingFalse())
        navigate('/login')
    }
  }

  
  
  useEffect(()=> {
    getLoginUser()
  } , [])

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-400  min-w-full flex items-center mb-[100px] justify-between ">
        <DotLoader
          color={"rgb(239 68 68)"}
          loading={loading}
          cssOverride={override}
          size={150}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
      </div>
    );
  }

  return (
    <div className="App bg-gray-400  min-h-screen min-w-full">
      <Routes>
        <Route
          path="/"
          element={
            <PrivateRoute>
              <Home />
            </PrivateRoute>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="*" element = {<ErrorPage />} />
      </Routes>
      <ToastContainer />
    </div>
  );
}

export default App;
