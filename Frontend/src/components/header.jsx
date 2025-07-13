import React, { useState } from 'react'
import { GoSearch } from "react-icons/go";
import { FaRegUserCircle } from "react-icons/fa";
import { FaShoppingCart } from "react-icons/fa";
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import ROLE from '../common/role';

import SummaryApi from '../common';
import { toast } from 'react-toastify';
import { setUserDetails } from '../redux/userSlice';
const Header = () => {
  const user = useSelector(state => state?.user?.user)
  const [showMenu, setshowMenu] = useState(false)
  const dispatch = useDispatch()
  const handleLogout = async () => {
    const dataResponse = await fetch(SummaryApi.Logout.url, {
      method: SummaryApi.Logout.method,
      credentials: 'include'
    })
    const dataApi = await dataResponse.json()
    if (dataApi.success) {
      toast.success(dataApi.message)
      dispatch(setUserDetails(null))
    }
    if (dataApi.error) {
      toast.error(dataApi.message)
    }
  }

  return (
    <nav className='bg-white flex items-center justify-between lg:pl-10 pr-3 lg:pr-10 shadow-md'>
      <Link to={"/"} className="logo">
        <img className='w-40' src="../src/assets/logo2.png" alt="" />
      </Link>
      <div className="hidden  lg:flex w-full max-w-sm  justify-between   ">
        <input className='outline-none focus-within:shadow-md   w-full p-1 rounded-l-full' type="text" name="search" placeholder='Search your product...' id="" />
        <div className="search-icon bg-red-600 w-10 cursor-pointer  flex items-center justify-center rounded-r-full">
          <GoSearch className='text-white  ' />
        </div>
      </div>
      <div className="gap-4 lg:gap-7 icons flex items-center cursor-pointer">
        {
          user?._id && (

            <div className="user relative flex justify-center">
              {
                user?.profilePic ? (
                  <img onClick={() => setshowMenu(preve => !preve)} className='h-10 w-10 rounded-full' src={user?.profilePic} alt={user?.name} />
                ) : (

                  <FaRegUserCircle className='text-3xl' />
                )
              }
              {
                showMenu && (

                  <div className='absolute top-13 p-1 hidden  md:block  h-fit bottom-0   whitespace-nowrap'>
                    {
                      user?.ROLE === ROLE.ADMIN && (

                        <nav onClick={() => setshowMenu(preve => !preve)}>
                          <Link to="admin-panel/upload-products" className='hover:text-red-600 h-full p-1 bg-white'>Admin Panal</Link>
                        </nav>


                      )
                    }
                  </div>
                )
              }

            </div>
          )
        }
        <div className="shoping-cart relative flex ">
          <FaShoppingCart className='text-2xl ' />
          <span className='bg-red-600 h-5 w-5 absolute -top-2 -right-3 text-sm rounded-full flex items-center justify-center text-white '>0</span>
        </div >


        <div >

          {
            user?._id ? (<button onClick={handleLogout} className='bg-red-600 text-white px-3 py-1 cursor-pointer
              rounded-full hover:bg-red-700'>Logout</button>) : (

              <Link to={"/login"} className="login">
                <button className='bg-red-600 text-white px-3 py-1 cursor-pointer
             rounded-full hover:bg-red-700'>Login</button>
              </Link>
            )
          }
        </div>



      </div>
    </nav>
  )
}

export default Header
