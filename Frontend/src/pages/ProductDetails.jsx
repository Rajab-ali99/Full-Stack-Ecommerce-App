import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import SummaryApi from '../common'
import { FaStar } from "react-icons/fa";
import { FaStarHalf } from "react-icons/fa";
import displayPKRcurrency from '../helpers/displayCurrency';
import ReleventProducts from '../components/ReleventProducts';
import AddToCart from '../helpers/AddToCart';
import context from '../context';
const ProductDetails = () => {
    const navigate = useNavigate()
    const [data, setdata] = useState({
        productName: '',
        brandName: '',
        category: '',
        productImage: [],
        description: '',
        price: '',
        sellingPrice: ''
    })
    const [loadind, setloadind] = useState(false)
    const [bgPosition, setBgPosition] = useState('center');
    const [showZoomImage, setshowZoomImage] = useState(false)
    const [activeImg, setactiveImg] = useState('')
    const params = useParams()

    const fetchProduct = async () => {
        setloadind(true)
        const response = await fetch(SummaryApi.ProductDetails.url, {
            method: SummaryApi.ProductDetails.method,
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({ productId: params?.id })

        })

        const dataResponse = await response.json()
        setactiveImg(dataResponse.data.productImage[0])
        setdata(dataResponse.data)
        setloadind(false)
    }
    const { countCartProducts } = useContext(context)
    const AddToCartProduct = async (e, id) => {
        await AddToCart(e, id)
        countCartProducts()
    }
    const BuyProduct = async (e, id) => {
        await AddToCart(e, id)
        countCartProducts()
       navigate('/cart')
    }



    const handleZoomImage = (e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;

        setBgPosition(`${x}% ${y}%`);
    };

    const resetZoomImage = () => {
        setBgPosition('center');
    };
    const mouseEnter = () => {
        setshowZoomImage(true)
    }
    const mouseOut = () => {
        setshowZoomImage(false)
    }

    useEffect(() => {
        fetchProduct()
    }, [params])
    return (
        <div className='container mx-auto p-4'>
            <div className='flex flex-col md:flex-row md:p-6 gap-5'>
                <div className='flex md:flex-row flex-col-reverse gap-5'>


                    <div className='flex md:flex-col  h-fit md:gap-4 gap-3  justify-between '>
                        {
                            loadind ? (
                                data.productImage.map((ImgUrl, index) => {
                                    return (
                                        <div onMouseEnter={() => {
                                            if (activeImg !== ImgUrl) {
                                                setactiveImg(ImgUrl);
                                            }
                                        }}
                                            onClick={() => {
                                                if (activeImg !== ImgUrl) {
                                                    setactiveImg(ImgUrl);
                                                }
                                            }}
                                            className=' cursor-pointer animate-pulse h-20 w-20 shadow bg-slate-200'>

                                        </div>
                                    )
                                })
                            ) : (
                                data.productImage.map((ImgUrl, index) => {
                                    return (
                                        <div onMouseEnter={() => {
                                            if (activeImg !== ImgUrl) {
                                                setactiveImg(ImgUrl);
                                            }
                                        }}
                                            onClick={() => {
                                                if (activeImg !== ImgUrl) {
                                                    setactiveImg(ImgUrl);
                                                }
                                            }}
                                            className=' cursor-pointer  h-20 w-20 shadow bg-slate-200'>
                                            <img className='object-scale-down h-full w-full mix-blend-multiply' src={ImgUrl} alt="img" />
                                        </div>
                                    )
                                })
                            )

                        }
                    </div>
                    {
                        loadind ? (
                            <div className='h-96 w-96 animate-pulse bg-slate-200'>

                            </div>
                        ) : (
                            <div className=''>

                                <div onMouseMove={handleZoomImage}
                                    onMouseLeave={resetZoomImage}
                                    onMouseEnter={mouseEnter}
                                    onMouseOut={mouseOut}
                                    className='md:h-96 md:w-96 h-[80vw] flex items-center justify-center w-[92vw] cursor-pointer   bg-slate-200'>
                                    <img className='h-full w-full mix-blend-multiply object-scale-down' src={activeImg} alt="" />
                                </div>
                                {showZoomImage && (
                                    <div className='h-96 absolute right-[400px] top-28  w-96 hidden md:block bg-slate-200'>
                                        <div style={{
                                            backgroundImage: `url(${activeImg})`,
                                            backgroundRepeat: "no-repeat",
                                            backgroundSize: '200%', // zoom effect
                                            backgroundPosition: bgPosition,
                                        }}
                                            className='h-full w-full mix-blend-multiply'>

                                        </div>
                                    </div>
                                )}

                            </div>
                        )
                    }
                </div>
                <div className=''>

                    {
                        loadind ? (
                            <div className='p-3 grid gap-1'>
                                <h2 className='bg-slate-200 rounded-full animate-pulse h-6 max-w-[100px]'></h2>
                                <h1 className='bg-slate-200 rounded-full animate-pulse h-7 max-w-[150px]'></h1>
                                <p className='bg-slate-200 rounded-full animate-pulse h-6 max-w-[100px]'></p>
                                <div className='bg-slate-200 rounded-full animate-pulse h-4 max-w-[90px]'>

                                </div>
                                <div className='flex gap-5  rounded-full animate-pulse h-6 max-w-[300px]'>
                                    <p className='bg-slate-200 rounded-full animate-pulse h-full w-1/2 '></p>
                                    <p className='bg-slate-200 rounded-full animate-pulse h-full w-1/2'></p>
                                </div>
                                <div className='flex gap-5 bg-slate-200 rounded-full animate-pulse h-8 max-w-[250px]'>
                                    <button className='bg-slate-200 rounded-full animate-pulse h-full w-1/2'></button>
                                    <button className='bg-slate-200 rounded-full animate-pulse h-full w-1/2'></button>
                                </div>
                                <h1 className='text-xl font-semibold'></h1>
                                <div className='w-[50vw] h-[18vh] bg-slate-200 rounded-md animate-pulse  '>
                                    <p className='text-sm text-slate-500'></p>
                                </div>
                            </div>
                        ) : (
                            <div className='p-3 grid gap-1'>
                                <h2 className='bg-red-200 w-fit text-red-600 px-3 rounded-full py-1'>{data?.brandName}</h2>
                                <h1 className='md:text-4xl text-xl font-semibold text-ellipsis line-clamp-2'>{data.productName}</h1>
                                <p className='capitalize text-slate-500'>{data.category}</p>
                                <div className='flex text-red-500 gap-0.5'>
                                    <FaStar />
                                    <FaStar />
                                    <FaStar />
                                    <FaStar />
                                    <FaStarHalf />
                                </div>
                                <div className='flex gap-5 text-2xl font-semibold'>
                                    <p className='text-red-500'>{displayPKRcurrency(data.sellingPrice)}</p>
                                    <p className='text-slate-500 line-through'>{displayPKRcurrency(data.price)}</p>
                                </div>
                                <div className='flex gap-5'>
                                    <button className='min-w-28 px-2 py-1  rounded-md bg-white border-2 border-red-500 text-red-500 hover:text-white transition-all cursor-pointer hover:bg-red-500' onClick={(e) => BuyProduct(e, data?._id)}>Buy</button>
                                    <button className='min-w-28 px-2 py-1 cursor-pointer transition-all border-red-500 border-2  rounded-md bg-red-500 text-white hover:bg-white hover:text-red-500' onClick={(e) => AddToCartProduct(e, data?._id)}>Add To Cart</button>
                                </div>
                                <h1 className='text-xl font-semibold'>Description :</h1>
                                <div className='w-[80vw] md:w-[50vw]  h-[18vh] overflow-y-scroll  rounded px-3 bg-slate-50'>
                                    <p className='text-sm text-slate-500'>{data.description}</p>
                                </div>
                            </div>
                        )
                    }

                </div>

            </div>
            {
                data.category && (

                    <ReleventProducts category={data?.category} heading={'Recomended Products...'} />
                )
            }
        </div>
    )
}

export default ProductDetails
