import React from 'react'
import ROLE from '../common/role'
import { RxCross2 } from "react-icons/rx";
import { useState } from 'react';
import SummaryApi from '../common';
import { toast } from 'react-toastify';
const UserEdit = ({
    name,
    email,
    role,
    userId,
    onClose,
    calFunc
}) => {
const [userRole, setuserRole] = useState(role)
  const handleChangeSelect = (e)=>{
    setuserRole(e.target.value)
    console.log(userRole)
  }
    const handleChangeRole =async()=>{
           const dataResponse = await fetch(SummaryApi.updateUser.url,{
            method: SummaryApi.updateUser.method,
            headers:{
                'content-type' : "application/json"
            },
            credentials:'include',
            body: JSON.stringify({
                userId: userId,
                ROLE : userRole,
            })
           })
           const dataApi = await dataResponse.json()
           if(dataApi.success){
            onClose()
            calFunc()
            toast.success(dataApi.message)
           }
           if(dataApi.error){
            toast.error(dataApi.message)
           }
    }
    return (
        <div className='absolute z-10 w-full h-full top-0 left-0 right-0 bg-slate-200/60 bottom-0 flex justify-center items-center  '>
            <div className='bg-white flex flex-col gap-3 rounded-md  px-4 py-2 max-w-sm w-full'>
                <div className='flex justify-between items-center'>
                    <h1 className='text-lg  font-medium'>Change User Role</h1>
                    <button onClick={onClose}>
                    <RxCross2 className='text-xl hover:text-red-500 cursor-pointer' />
                    </button>
                </div>
                <p>Name: {name}</p>
                <p>Email: {email}</p>
                <div className='flex items-center justify-between'>

                    <p>Role:</p>
                    <select name="Role" className='cursor-pointer bg-slate-200 p-1 rounded shadow outline-none' value={userRole} onChange={handleChangeSelect}>
                         
                        {
                            Object.values(ROLE).map(el => {
                                return (
                                    <option value={el} key={el}>{el}</option>
                                )
                            })
                        }
                    </select>
                </div>
                <div className='flex justify-center'>

                    <button className='bg-red-600 text-white hover:bg-red-700  text-center cursor-pointer rounded-full p-2' onClick={handleChangeRole}>Change Role</button>

                </div>

            </div>
        </div>
    )
}

export default UserEdit
