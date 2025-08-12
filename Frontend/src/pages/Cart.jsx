import React, { useContext, useEffect, useState } from 'react'
import SummaryApi from '../common'
import context from '../context'
import { MdDelete } from "react-icons/md";
import displayPKRcurrency from '../helpers/displayCurrency'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
    const navigate = useNavigate()
      const user = useSelector(state => state?.user?.user)
    const [data, setdata] = useState([])
    const [loading, setloading] = useState(false)
    const [loadingQuantity, setloadingQuantity] = useState(false)
    const Context = useContext(context)
    const loadingcards = new Array(Context?.countCart).fill(null)

    const fetchCart = async () => {
        setloading(true)
        const response = await fetch(SummaryApi.cartProducts.url, {
            method: SummaryApi.cartProducts.method,
            credentials: 'include'
        })
        const dataResponse = await response.json()
        setdata(dataResponse.data)
        setloading(false)
    }
    const fetchCartWL = async () => {

        const response = await fetch(SummaryApi.cartProducts.url, {
            method: SummaryApi.cartProducts.method,
            credentials: 'include'
        })
        const dataResponse = await response.json()
        setdata(dataResponse.data)

    }

    const increaseQuantity = async (id, qty) => {
        
        const response = await fetch(SummaryApi.IncreaseQuantity.url, {
            method: SummaryApi.IncreaseQuantity.method,
            credentials: 'include',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({
                _id: id,
                quantity: qty + 1
            })
        })
        const dataResponse = await response.json()
        fetchCartWL()
    }
    const decreaseQuantity = async (id, qty) => {
        if (qty >= 2) {
           
            const response = await fetch(SummaryApi.IncreaseQuantity.url, {
                method: SummaryApi.IncreaseQuantity.method,
                credentials: 'include',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify({
                    _id: id,
                    quantity: qty - 1
                })


            })
            const dataResponse = await response.json()
            fetchCartWL()
        }

    }

    const handleDelete = async (id) => {
        setloading(true)
        const response = await fetch(SummaryApi.deleteCartProduct.url, {
            method: SummaryApi.deleteCartProduct.method,
            headers: {
                'content-type': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify({
                _id: id
            })
        })
        const dataResponse = await response.json()
        fetchCartWL()
        Context.countCartProducts()
        setloading(false)

    }
    
    const totalQTY = data.reduce((preve, curr) => preve + curr.quantity, 0)
    const totalPrice = data.reduce((preve, curr) => preve + (curr.quantity * curr.productId.sellingPrice), 0)
    useEffect(() => {
        if(!user?._id){
            navigate('/')
        }
        fetchCart()
    }, [])

    return (
        <div className='container gap-8 md:gap-0 flex flex-col md:justify-between md:flex-row  mx-auto p-4'>
            {
                data.length === 0 && !loading && (
                    <div className='text-2xl w-full text-center text-slate-500'>
                        No Product added in Cart!
                    </div>
                )
            }
            <div className=' max-w-3xl  '>
                {loading ? (
                    <div>

                        {
                            loadingcards.map((product, index) => {
                                return (
                                    <div key={index} className='bg-white h-32 max-w-3xl mb-4 flex '>
                                        <div className='h-32 w-32 animate-pulse bg-slate-200'>

                                        </div>
                                        <div className='p-2 flex gap-1 flex-col  w-[610px] '>
                                            <h1 className='text-ellipsis capitalize bg-slate-200 rounded-full w-26 h-6 animate-pulse  line-clamp-1 font-semibold text-md md:text-lg'></h1>
                                            <p className='capitalize w-22 h-5 bg-slate-200 animate-pulse rounded-full  text-slate-500'></p>
                                            <div className='flex items-center justify-between w-full'>
                                                <p className='text-red-500 bg-slate-200 animate-pulse w-18 h-9 rounded-full font-bold'></p>
                                                <p className='text-slate-500 bg-slate-200 animate-pulse w-18 h-9 rounded-full font-bold'></p>
                                            </div>
                                            <div className='flex gap-3 items-center mt-1'>
                                                <button className='w-6 h-6 rounded animate-pulse bg-slate-200 transition-all flex justify-center items-center'></button>

                                                <button className='w-6 h-6 rounded animate-pulse bg-slate-200 transition-all flex justify-center items-center'></button>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })
                        }

                    </div>
                ) : (
                    <div>
                        {
                            data.map((product, index) => {
                                return (
                                    <div key={index} className='bg-white relative max-w-3xl mb-4 flex '>
                                        <div className='h-24 md:h-32 w-60 md:w-32 bg-slate-200'>
                                            <img className=' h-full w-full object-scale-down mix-blend-multiply' src={product.productId.productImage[0]} alt="" />
                                        </div>
                                        <div className='p-2 w-[610px] '>
                                            <h1 className='text-ellipsis capitalize text-xs  line-clamp-1 font-semibold md:text-md md:text-lg'>{product.productId.productName}</h1>
                                            <p className='capitalize text-xs md:text-base text-slate-500'>{product.productId.category}</p>
                                            <div className='flex items-center justify-between w-full'>
                                                <p className='text-red-500 text-xs md:text-base font-bold'>{displayPKRcurrency(product.productId.sellingPrice)}</p>
                                                <p className='text-slate-500 text-xs md:text-base font-bold'>{displayPKRcurrency(product.productId.sellingPrice * product.quantity)}</p>
                                            </div>
                                            <div className='flex gap-3 items-center mt-1'>
                                                <button onClick={() => decreaseQuantity(product._id, product.quantity)} className='w-6 h-6 text-red-500 cursor-pointer hover:bg-red-500 hover:text-white transition-all flex justify-center items-center border-2 rounded border-red-400'>-</button>
                                                {loadingQuantity ? (
                                                    <span className='loader '></span>
                                                ) : (

                                                    <p className='font-bold'>{product.quantity}</p>
                                                )}
                                                <button onClick={() => increaseQuantity(product._id, product.quantity)} className='w-6 h-6 text-red-500 cursor-pointer hover:bg-red-500 hover:text-white transition-all flex justify-center items-center border-2 rounded border-red-400'>+</button>
                                            </div>
                                        </div>
                                        <div onClick={() => handleDelete(product._id)} className='z-20 absolute m-2 text-xl text-white bg-red-500  md:text-red-500 md:bg-white transition-all cursor-pointer hover:bg-red-500 hover:text-white rounded-full border-2 border-red-500 p-1 right-0'>
                                            <MdDelete />
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                )}

            </div>
            {
                data.length > 0 && (
                    <div className='w-xs relative mx-auto rounded-md h-48 bg-white'>
                        <h2 className='bg-red-500 font-semibold text-white p-1'>Summary</h2>
                        <div className='pt-3'>

                            <div className='flex items-center justify-between px-4 py-1'>
                                <h2 className='text-lg font-bold'>Total Items</h2>
                                <p className='text-md text-blue-600 font-bold'>{totalQTY}</p>
                            </div>
                            <div className='flex items-center justify-between px-4 py-1'>
                                <h2 className='text-lg font-bold'>Total Price</h2>
                                <p className='text-md text-blue-600  font-bold'>{displayPKRcurrency(totalPrice)}</p>
                            </div>
                            <div className='bg-blue-600 absolute w-full bottom-0 text-white font-semibold px-3 py-1 flex justify-center cursor-pointer items-center'>
                                <button className='cursor-pointer'>Proceed to Checkout</button>
                            </div>

                        </div>
                    </div>
                )
            }

        </div>
    )
}

export default Cart
