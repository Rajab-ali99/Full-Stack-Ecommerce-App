import './App.css'
import { Outlet } from 'react-router-dom'
import Header from './components/header'
import Footer from './components/Footer'
import { ToastContainer, } from 'react-toastify';
import SummaryApi from './common';
import { useEffect, useState } from 'react';
import context from './context';
import { useDispatch } from 'react-redux';
import { setUserDetails } from './redux/userSlice';
import ScrollToTop from './components/ScrollToTop';
function App() {
  const dispatch = useDispatch()
  const [countCart, setcountCart] = useState(0)
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
   const countCartProducts = async()=>{
    const dataResponse = await fetch(SummaryApi.addToCartCount.url,{
      method: SummaryApi.addToCartCount.method,
      credentials: 'include'
    })

    const dataApi = await dataResponse.json()
    if(dataApi.success){
      setcountCart(dataApi?.data?.count)
    }
  }
  useEffect(() => {
    fetchUserDetails(),
    countCartProducts()
  }, [])
  
  return (
    <>
     <context.Provider value={{
      fetchUserDetails ,
      countCart,
      countCartProducts,
     }}>

     <ToastContainer position='top-center' />
     <ScrollToTop/>
      <Header />
      <main className='min-h-[calc(100vh-80px)] mt-18'>
        <Outlet />
      </main>
      <Footer className = 'z-50' />

     </context.Provider>
    </>
  )
}

export default App
