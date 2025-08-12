import React, { useContext, useEffect, useRef, useState } from 'react'
import SummaryApi from '../common'
import displayPKRcurrency from '../helpers/displayCurrency'
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import AddToCart from '../helpers/AddToCart'
import context from '../context'
import ScrollTop from '../helpers/ScrollTop'

const SearchedProducts = ({productData }) => {
    const [data, setdata] = useState([])
    
    const [loading, setloading] = useState(false)
    const loadingCards = new Array(13).fill(null)
    const fetchProduct = async () => {
        setloading(true)
      
        setdata(productData)
        setloading(false)
    }
     const {fetchUserDetails,countCartProducts} =useContext(context)
        const AddToCartProduct = async(e,id)=>{
                 await  AddToCart(e,id)
                 countCartProducts()
        }
   

    useEffect(() => {
        fetchProduct()
    }, [productData])

    return (
        <div className='container relative mx-auto md:px-2 py-1'>
            <div  className=' flex flex-col items-center  md:grid md:grid-cols-[repeat(auto-fit,_minmax(280px,_280px))] justify-center  md:justify-between gap-4 transition-all duration-700 ease-in    pt-2  w-full '>
            
  
                
                {
                    loading ? (
                        loadingCards.map((product, index) => {
                        return (

                            <div className='h-60 md:h-80 rounded-2xl flex-col  flex min-w-[240px] md:min-w-[240px]  max-w-[260px] md:max-w-[260px]' >
                                <div className='bg-slate-200 animate-pulse w-full h-1/2'>
                                    <img className='h-full p-2 cursor-pointer  hover:scale-105 transition  all object-scale-down' src='' alt="" />
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

                            <Link onClick={ScrollTop} to={'/product/' + product._id} className='h-64 md:h-72  flex-col flex min-w-[330px] md:min-w-[280px]  max-w-[330px] md:max-w-[280px]' >
                                <div className='bg-slate-200 flex items-center justify-center h-1/2 w-full'>
                                    <img className='h-full p-2 cursor-pointer  hover:scale-105 mix-blend-multiply transition all object-scale-down' src={product?.productImage[0]} alt="" />
                                </div>
                                <div className='bg-white grid p-3 h-1/2 w-full'>
                                    <h1 className=' font-bold  text-sm md:text-base text-ellipsis line-clamp-2'>{product?.productName}</h1>
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

export default SearchedProducts
