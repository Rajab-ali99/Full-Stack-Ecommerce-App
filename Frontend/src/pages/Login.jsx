import React, { useContext } from 'react'
import Logo from "../assets/signin.gif"
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import SummaryApi from '../common';
import { toast } from 'react-toastify';
import context from '../context';
const Login = () => {
    const [showpassword, setshowpassword] = useState(false)
    const [data, setdata] = useState({
        email: "",
        password: "",
    })
    const navigate = useNavigate()
    const fetchUserDetails =useContext(context)
    const handleOnChange = (e) => {
        const { name, value } = e.target

        setdata((preve) => {
            return {
                ...preve,
                [name]: value
            }
        })
    }
    const handleSubmit = async (e) => {
        e.preventDefault()
      const dataResponse = await fetch(SummaryApi.SignIn.url,{
        method: SummaryApi.SignIn.method,
        headers:{
            "content-type" : "application/json"
        },
        body: JSON.stringify(data),
        credentials: 'include'
      })
      const dataApi = await dataResponse.json()
      if(dataApi.success){
        toast.success(dataApi.message)
        navigate('/')
        fetchUserDetails()
      }
      if(dataApi.error){
        toast.error(dataApi.message)
      }
    }
    return (
        <section id="login">

            <div className=' bg-white rounded  pb-10 w-full max-w-sm mx-auto my-5'>
                <div className="logo py-4">
                    <img className='w-20 rounded-full  mx-auto ' src={Logo} alt="error" />
                </div>
                <form className='mx-5 flex flex-col ' onSubmit={handleSubmit}>
                    <label >Email :</label>
                    <div className='w-full bg-slate-100 mb-1'>
                        <input className='outline-none bg-transparent w-full px-1 py-2 '
                            placeholder='enter mail'
                            name='email'
                            type="email"
                            value={data.email}
                            onChange={handleOnChange}
                        />
                    </div>
                    <label> Password :</label>
                    <div className='w-full bg-slate-100 mb-1 flex items-center pr-2'>
                        <input className='outline-none bg-transparent w-full px-1 py-2'
                            placeholder='enter password'
                            type={showpassword ? "text" : "password"}
                            name='password'
                            value={data.password}
                            onChange={handleOnChange}
                        />
                        <span className='cursor-pointer' onClick={() => setshowpassword((e) => !e)}>
                            {showpassword ? <FaEyeSlash /> : <FaEye />}
                        </span>
                    </div>
                    <Link to={"/Forgotpassword"} className='  hover:underline w-full cursor-pointer flex justify-end  hover:text-red-600 '>Forgot password?</Link >
                    <button type='Submit'  className='bg-red-600 text-white px-6 hover:bg-red-700 transition-all mx-auto block my-5 w-full max-w-32 hover:scale-110 rounded-full py-2' >Login</button>
                    <div className=' '>Don't have account ? <Link to={"/signup"} className='text-red-600 cursor-pointer hover:underline'>Sign up</Link></div>
                </form>

            </div>
        </section>
    )
}

export default Login
