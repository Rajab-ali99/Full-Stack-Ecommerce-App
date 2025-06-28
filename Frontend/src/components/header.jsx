import React from 'react'
import { GoSearch } from "react-icons/go";
import { FaRegUserCircle } from "react-icons/fa";
import { FaShoppingCart } from "react-icons/fa";
import { Link } from 'react-router-dom';
const Header = () => {
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
            <div className="user">
        <FaRegUserCircle className='text-3xl' />

            </div>
        <div className="shoping-cart relative flex ">
        <FaShoppingCart className='text-2xl ' />
         <span className='bg-red-600 h-5 w-5 absolute -top-2 -right-3 text-sm rounded-full flex items-center justify-center text-white '>0</span>
        </div>
        <Link to={"/login"} className="login">
            <button className='bg-red-600 text-white px-3 py-1 cursor-pointer
             rounded-full hover:bg-red-700'>Login</button>
        </Link>
        </div>
    </nav>
  )
}

export default Header
