import React from 'react'
import SummaryApi from '../common'
import { toast } from 'react-toastify'
import { useState, useEffect } from 'react'
import moment from 'moment'


const AllUsers = () => {
  const [allUsers, setallUsers] = useState([])
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
    <div className='bg-white  w-[80vw] mt-5 mx-auto'>
      <table className='w-full userTable'>
        <thead>
          <tr>
            <th>Sr.</th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Created Date</th>
          </tr>
        </thead>
        <tbody>
          {
            allUsers.map((el, index) => {
              return (
                <tr>
                  <td>{index + 1}</td>
                  <td>{el?.name}</td>
                  <td>{el?.email}</td>
                  <td>{el?.ROLE}</td>
                  <td>{moment(el?.createdAt).format('ll')}</td>
                </tr>
              )
            })
          }
        </tbody>
      </table>
    </div>
  )
}

export default AllUsers
