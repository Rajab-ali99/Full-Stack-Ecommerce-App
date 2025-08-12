import React, { useContext, useEffect, useRef, useState } from 'react'
import SummaryApi from '../common'
import displayPKRcurrency from '../helpers/displayCurrency'
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import AddToCart from '../helpers/AddToCart'
import context from '../context'

const VerticalProductCard = ({ category, heading }) => {
    const [data, setdata] = useState([])
    const scrollElement = useRef()
    const [loading, setloading] = useState(false)
    const loadingCards = new Array(13).fill(null)
    const fetchProduct = async () => {
        setloading(true)
        const response = await fetch(SummaryApi.categoryWiseProduct.url, {
            headers: {
                'content-type': 'application/json'
            },
            method: SummaryApi.categoryWiseProduct.method,
            body: JSON.stringify({ category: category })
        })
        const dataResponse = await response.json()
        setdata(dataResponse.data)
        setloading(false)
    }
    const scrollRight = () => {
        scrollElement.current.scrollBy({
      left: 700,
      behavior: 'smooth',
    });
    }
    const scrollleft = () => {
        scrollElement.current.scrollBy({
      left: -700,
      behavior: 'smooth',
    });
    }
     const {fetchUserDetails,countCartProducts} =useContext(context)
        const AddToCartProduct = async(e,id)=>{
                 await  AddToCart(e,id)
                 countCartProducts()
        }

    useEffect(() => {
        fetchProduct()
    }, [])

    return (
        <div className='container relative mx-auto px-4 py-1'>
            <div className='flex justify-between items-center'>

                <h1 className='text-md md:text-xl font-bold my-1'>{heading}</h1>
                <div className=' flex md:hidden '>
                    <button className='text-2xl p-1  cursor-pointer rounded-full '><FaAngleLeft /></button>
                    <button className='text-2xl p-1   cursor-pointer rounded-full '><FaAngleRight /></button>
                </div>
            </div>
            <div ref={scrollElement} className=' flex gap-3 transition-all duration-700 ease-in  overflow-scroll md:overflow-hidden scrollbar-none  my-3  w-full '>
            
                    <button onClick={scrollRight} className='text-2xl p-1 hidden md:block transition-all  my-auto bottom-[37%] absolute right-0 bg-white cursor-pointer rounded-full hover:scale-105'><FaAngleRight /></button>
                    <button onClick={scrollleft}  className='text-2xl p-1 hidden md:block    my-auto bottom-[37%]  absolute left-0 bg-white cursor-pointer rounded-full hover:scale-105 transition-all'><FaAngleLeft /></button>
                
                {
                    loading ? (
                        loadingCards.map((product, index) => {
                        return (

                            <div key={index} className='h-60 md:h-80 rounded-2xl flex-col  flex min-w-[260px] md:min-w-[320px]  max-w-[260px] md:max-w-[320px]' >
                                <div className='bg-slate-200 animate-pulse w-full h-1/2'>
                                    <img className='h-full p-2 cursor-pointer  hover:scale-105 transition  all object-scale-down' src={null} alt="" />
                                </div>
                                <div className='bg-white grid gap-2 p-2 w-full h-1/2'>
                                    <h1 className=' font-bold text-sm md:text-base bg-slate-200 animate-pulse rounded-full text-ellipsis line-clamp-1'></h1>
                                    <p className='md:text-sm text-xs text-slate-500 rounded-full animate-pulse bg-slate-200 capitalize'></p>
                                    <div className='flex md:gap-3 gap-2'>
                                        <div className='md:text-xs text-[10px] bg-slate-200 animate-pulse rounded-full w-1/2 text-red-500 '></div>
                                        <div className='md:text-xs text-[10px] line-through w-1/2 animate-pulse rounded-full bg-slate-200  text-slate-600'></div>
                                    </div>
                                    <button className='md:px-3  text-sm md:text-base animate-pulse px-2 py-0.5 transition-all bg-slate-200 cursor-pointer text-white rounded-full'></button>
                                </div>
                            </div>
                        )
                    })
                    ):(
                            data.map((product, index) => {
                        return (

                            <Link to={'product/' + product._id} className='h-72 md:h-80  flex-col flex min-w-[280px] md:min-w-[320px]  max-w-[280px] md:max-w-[320px]' >
                                <div className='bg-slate-200 flex items-center justify-center h-1/2 w-full'>
                                    <img className='h-full p-2 cursor-pointer  hover:scale-105 mix-blend-multiply transition all object-scale-down' src={product?.productImage[0]} alt="" />
                                </div>
                                <div className='bg-white grid p-3 h-1/2 w-full'>
                                    <h1 className=' font-bold  text-sm md:text-base text-ellipsis line-clamp-3'>{product?.productName}</h1>
                                    <p className='md:text-sm text-xs text-slate-500 capitalize'>{product?.category}</p>
                                    <div className='flex md:gap-3 gap-2'>
                                        <div className='md:text-xs text-[10px] text-red-500 '>{displayPKRcurrency(product.sellingPrice)}</div>
                                        <div className='md:text-xs text-[10px] line-through  text-slate-600'>{displayPKRcurrency(product.price)}</div>
                                    </div>
                                    <button onClick={(e)=>AddToCartProduct(e,product?._id)} className='md:px-3  text-sm md:text-base px-2 py-0.5 transition-all bg-red-500 hover:bg-red-600 cursor-pointer text-white rounded-full'>Add to Cart</button>
                                </div>
                            </Link>
                        )
                    })
                    )
                    
                }
            </div>
        </div>
    )
}

export default VerticalProductCard
