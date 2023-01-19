import React, { useState } from "react";
import axios , {baseURL} from '../config/axios'
import { toast } from 'react-toastify';
import { loadingFalse , loadingTrue , addUser } from "../store/slices/UserSlice";
import {useDispatch} from 'react-redux'
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

interface RegisterForm {
  name: string,
  email : string,
  password : string,
}

interface LoginForm {
  loginEmail : string,
  loginPassword : string
}

const Login = () => {
  const dispatch = useDispatch()
    const [form , setForm] = useState<string>('login')

    const notifyError = (msg : string) => toast.error(msg);
    const notifySuccess = (msg : string) => toast.success(msg);

    const navigate = useNavigate()

    const [loginForm , setLoginForm] = useState<LoginForm>({
      loginEmail : '',
      loginPassword : ''
    })

    const [registerForm , setRegisterForm] = useState<RegisterForm>({
      name : '',
      email : '',
      password : ''
    })

    const handleLoginForm = (e : React.ChangeEvent<HTMLInputElement>)=> {
      setLoginForm({
        ...loginForm,
        [e.target.name] : e.target.value
      })
    }

    const handleRegisterForm = (e : React.ChangeEvent<HTMLInputElement>)=> {
      setRegisterForm({
        ...registerForm,
        [e.target.name] : e.target.value
      })
    }

    const handleRegisterSubmit = async(e : React.FormEvent<HTMLFormElement>)=>{
      e.preventDefault()
      if(registerForm.name.trim() == '' || registerForm.email.trim() == '' || registerForm.password.trim() ==''){
        return alert('All field Required')
      }

      try {
        dispatch(loadingTrue())
        const apiRequest = await axios.post(`${baseURL}user/register`, {name : registerForm.name , email : registerForm.email , password : registerForm.password})
        const apiData = await apiRequest.data
        dispatch(loadingFalse())
        dispatch(addUser(apiData.user))
        Cookies.set('todoToken', apiData.token)
        navigate('/')
        setRegisterForm({
          name : '',
          password : '',
          email : ''
        })
        
      } catch (error : any) {
        console.log(error);
        dispatch(loadingFalse())
        if(error.response.status == 400){
          notifyError(error.response.data.msg)
        }

        setRegisterForm({
          name : '',
          password : '',
          email : ''
        })
      }
    }

    const handleLoginSubmit = async(e : React.FormEvent<HTMLFormElement>)=>{
      e.preventDefault()
      if(loginForm.loginEmail.trim() == '' || loginForm.loginPassword.trim() == ''){
        return alert('All field Required')
      } 

      try {
        dispatch(loadingTrue())
        const apiRequest = await axios.post(`${baseURL}user/login`, {email : loginForm.loginEmail , password : loginForm.loginPassword})
        const apiData = await apiRequest.data
        dispatch(loadingFalse())
        dispatch(addUser(apiData.user))
        Cookies.set('todoToken' , apiData.token)
        navigate('/')
        setLoginForm({
          loginEmail : '',
          loginPassword : ''
        })
        
      } catch (error : any) {
        console.log(error);
        dispatch(loadingFalse())
        if(error.response.status == 400){
          notifyError(error.response.data.msg)
        }

        setLoginForm({
          loginEmail : '',
          loginPassword : ''
        })
      }
    }

  return (
    <div className="pt-10 px-5 md:px-0">
      <div className="bg-white w-full md:w-2/4 mx-auto p-3 md:p-5">
        <div className="flex justify-between items-center">
          <button className="w-full bg-green-500 mr-5 text-white py-1" onClick={()=> setForm('login')}>
            Login
          </button>
          <button className="w-full  bg-green-500 text-white py-1" onClick={()=> setForm('register')}>
            Register
          </button>
        </div>

        {
            form == 'login' ? <div className="login">
            <div className="text-3xl text-center py-3 font-bold">Login</div>
            <form className="mt-3" onSubmit={handleLoginSubmit}>
              <div className="form-control">
                <label htmlFor="" className="">
                  Email
                </label>
                <input
                  type="email"
                  className="border outline-none w-full mt-1 px-2 py-1 text-sm"
                  value={loginForm.loginEmail}
                  name = 'loginEmail'
                  onChange= {handleLoginForm}
                />
              </div>
              <div className="form-control mt-2">
                <label htmlFor="">Password</label>
                <input
                  type="password"
                  className="border outline-none w-full mt-1 px-2 py-1 text-sm"
                  name="loginPassword"
                  value={loginForm.loginPassword}
                  onChange = {handleLoginForm}
                />
              </div>
              <button className="bg-green-500 text-white w-full py-1 mt-3">
                Login
              </button>
            </form>
          </div> : <div className="register">
        <div className="text-3xl text-center py-3 font-bold">Register</div>
          <form className="mt-3" onSubmit={handleRegisterSubmit}>
            <div className="form-control">
              <label htmlFor="" className="">
                Name
              </label>
              <input
                type="text"
                className="border outline-none w-full mt-1 px-2 py-1 text-sm"
                name="name"
                value={registerForm.name}
                onChange ={handleRegisterForm}
              />
            </div>
            <div className="form-control mt-2">
              <label htmlFor="">Email</label>
              <input
                type="email"
                className="border outline-none w-full mt-1 px-2 py-1 text-sm"
                name="email"
                value={registerForm.email}
                onChange ={handleRegisterForm}
              />
            </div>
            <div className="form-control mt-2">
              <label htmlFor="">Password</label>
              <input
                type="password"
                className="border outline-none w-full mt-1 px-2 py-1 text-sm"
                name="password"
                value={registerForm.password}
                onChange = {handleRegisterForm}
              />
            </div>
            <button className="bg-green-500 text-white w-full py-1 mt-3">
              Register
            </button>
          </form>
        </div>
        }
      </div>
    </div>
  );
};

export default Login;
