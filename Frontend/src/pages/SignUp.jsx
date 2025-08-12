import React from 'react'
import Logo from "../assets/signin.gif"
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import SummaryApi from '../common';
import { toast } from 'react-toastify';
import uploadFile from '../helpers/uploadFile';

const SignUp = () => {
  const [showpassword, setshowpassword] = useState(false)
  const [showconfirmpassword, setshowconfirmpassword] = useState(false)
  const [data, setdata] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    profilePic: "",
  })
  const navigate = useNavigate()
  const handleOnChange = (e) => {
    const { name, value } = e.target

    setdata((preve) => {
      return {
        ...preve,
        [name]: value
      }
    })
  }
  const handleUploadPic = async (e) => {
    let file = e.target.files[0]
    const uploadPhoto =await uploadFile(file)
    setdata((preve) => {
      return {
        ...preve,
        profilePic: uploadPhoto?.url
      }
    })
    
    
  }
  console.log("profile",data.profilePic)

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (data.password === data.confirmPassword) {
      

      const dataResponse = await fetch(SummaryApi.SignUp.url, {
        method: SummaryApi.SignUp.method,
        headers: {
          "content-type": "application/json"
        },
        body: JSON.stringify(data)
      })
      const dataApi = await dataResponse.json()
      if (dataApi.success) {
        toast.success(dataApi.message)
        navigate("/login")
      }
      if (dataApi.error) {
        toast.error(dataApi.message)
      }

    } else {
      toast.error("Password dosn't match")
    }
  }
  return (
    <section className='flex items-center justify-center' id="signup ">

      <div className='container  bg-white pt-2  pb-10 w-full max-w-sm mx-auto my-5'>
        <div className="logo my-4 mx-auto rounded-full h-20 w-20 overflow-hidden  relative   ">
          <div>
            <img className='    h-20 w-20 object-cover  ' src={data?.profilePic || Logo} alt="error" />
          </div>
          <form  >
            <label>
              <div className='bg-slate-200 w-full text-xs pt-2 pb-4  cursor-pointer opacity-60 absolute bottom-0'>Upload photo
              </div>
              <input className='hidden'
                type="file"
                name='profilePic'
                onChange={handleUploadPic} />
            </label>
          </form>
        </div>
        <form className='mx-5 flex flex-col ' onSubmit={handleSubmit}>
          <label >Name :</label>
          <div className='w-full bg-slate-100 mb-1'>
            <input className='outline-none bg-transparent w-full px-1 py-2 '
              placeholder='enter name'
              type="text"
              name='name'
              value={data.name}
              onChange={handleOnChange}
            />
          </div>
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
          <label> Confirm Password :</label>
          <div className='w-full bg-slate-100 flex items-center pr-2'>
            <input className='outline-none bg-transparent w-full px-1 py-2'
              placeholder='confirm password'
              name='confirmPassword'
              type={showconfirmpassword ? "text" : "password"}
              value={data.confirmPassword}
              onChange={handleOnChange}
            />
            <span className='cursor-pointer' onClick={() => setshowconfirmpassword((e) => !e)}>
              {showconfirmpassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>

          <button type='Submit' name='signUp' className='bg-red-600 text-white px-6 cursor-pointer hover:bg-red-700 transition-all mx-auto block my-5 w-full max-w-32 hover:scale-110 rounded-full py-2' >SignUp</button>
          <div className=' '>Already have account ? <Link to={"/login"} className='text-red-600 cursor-pointer hover:underline'>Sign in</Link></div>
        </form>

      </div>
    </section>
  )
}

export default SignUp
