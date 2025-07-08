import './App.css'
import { Outlet } from 'react-router-dom'
import Header from './components/header'
import Footer from './components/Footer'
import { ToastContainer, } from 'react-toastify';
import SummaryApi from './common';
import { useEffect } from 'react';
import context from './context';
import { useDispatch } from 'react-redux';
import { setUserDetails } from './redux/userSlice';
function App() {
  const dispatch = useDispatch()
  const fetchUserDetails = async()=>{
    const dataResponse = await fetch(SummaryApi.currentUser.url,{
      method: SummaryApi.currentUser.method,
      credentials: 'include'
    })

    const dataApi = await dataResponse.json()
    if(dataApi.success){
      dispatch(setUserDetails(dataApi.data))
    }
  }
  useEffect(() => {
    fetchUserDetails()
  }, [])
  
  return (
    <>
     <context.Provider value={
      fetchUserDetails 
     }>

     <ToastContainer />
      <Header />
      <main className='min-h-[calc(100vh-126px)]'>
        <Outlet />
      </main>
      <Footer />

     </context.Provider>
    </>
  )
}

export default App
