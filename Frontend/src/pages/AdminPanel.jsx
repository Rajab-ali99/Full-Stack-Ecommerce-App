import React from 'react'
import { FaRegUserCircle } from "react-icons/fa";
import { useSelector } from 'react-redux';
import { Link, Outlet } from 'react-router-dom';
import { FaUsers } from "react-icons/fa6";
import { MdProductionQuantityLimits } from "react-icons/md";
const AdminPanel = () => {
    const user = useSelector(state => state?.user?.user)
    return (
        <div className='flex min-h-[calc(100vh-126px)] '>

            <aside className='bg-white  h-100vh w-[calc(20vw)] customshadow'>
                <div className='flex flex-col  items-center     py-5'>

                    {
                        user?._id ? (
                            <img className='h-15 w-15 rounded-full ' src={user?.profilePic} alt={user?.name} />
                        ) : (

                            <FaRegUserCircle className='text-3xl' />
                        )
                    }
                    <div className='font-bold capitalize text-xl'>{user?.name}</div>
                    <div className='text-xs'>{user?.ROLE}</div>
                </div>
                <div>

                    <nav className='flex flex-col gap-1 p-3'>
                        <div className='hover:bg-slate-200 flex justify-items-start rounded hover:text-red-500 items-center gap-3  text-sm p-1'>
                        <FaUsers className='text-xl'/>
                        <Link to='all-users' >All Users</Link>
                        </div>
                        <div className='hover:bg-slate-200 flex justify-items-start items-center gap-3  rounded hover:text-red-500 p-1 text-sm'>
                            <MdProductionQuantityLimits className='text-xl'/>
                        <Link to='upload-products' >Upload Products</Link>

                        </div>
                    </nav>
                </div>
            </aside>
            <main className=' w-full'>
                <Outlet />
                
            </main>
        </div>
    )
}

export default AdminPanel
