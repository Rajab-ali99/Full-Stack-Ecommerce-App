import React from 'react'
import SummaryApi from '../common'
import { toast } from 'react-toastify'
import { useState, useEffect } from 'react'
import moment from 'moment'
import { MdModeEditOutline } from "react-icons/md";
import UserEdit from '../components/UserEdit'


const AllUsers = () => {
  const [allUsers, setallUsers] = useState([])
  const [openUpdateRole, setOpenUpdateRole] = useState(false)
  const [updateData, setupdateData] = useState({
    name: '',
    email:'',
    ROLE:'',
    _id : ''
  })
  const fetchUsers = async () => {
    const dataResponse = await fetch(SummaryApi.allUsers.url, {
      method: SummaryApi.allUsers.method,
      credentials: 'include'
    })

    const dataApi = await dataResponse.json()
    if (dataApi.success) {
      setallUsers(dataApi.data)
    }
    if (dataApi.error) {
      toast.error(dataApi.message)
    }
  }
  useEffect(() => {
    fetchUsers()
  }, [])

  return (
    <div className='h-[calc(100vh-80px)]   overflow-y-scroll '>
      <table className=' userTable w-[80vw] mt-5 mx-auto'>
        <thead>
          <tr className='bg-black text-white'>
            <th>Sr.</th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Created Date</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {
            allUsers.map((el, index) => {
              return (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{el?.name}</td>
                  <td>{el?.email}</td>
                  <td>{el?.ROLE}</td>
                  <td>{moment(el?.createdAt).format('ll')}</td>
                  <td>
                    <div className='flex justify-center  p-1'>

                      <MdModeEditOutline onClick={()=>{
                        setupdateData(el)
                        setOpenUpdateRole(true)
                      }} className='bg-green-100  p-1 rounded-full hover:bg-green-500 cursor-pointer hover:text-white text-2xl' />
                    </div>
                    
                  </td>
                </tr>
              )
            })
          }
        </tbody>
      </table>
      {
        openUpdateRole &&(

          <UserEdit 
           name={updateData.name}
           email={updateData.email}
           role={updateData.ROLE}
           userId={updateData._id}
          onClose={()=>{setOpenUpdateRole(false)}}
          calFunc={fetchUsers}
          />
        )
      }
    </div>
  )
}

export default AllUsers
