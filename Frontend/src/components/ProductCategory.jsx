import React, { useEffect, useState } from 'react'
import SummaryApi from '../common'
import { Link } from 'react-router-dom'

const ProductCategory = () => {
    const [productCategory, setproductCategory] = useState([])
    const [loading, setloading] = useState(false)
    const loadCategory = new Array(13).fill(null)
    const getProductByCategory = async () => {
        setloading(true)
        const response = await fetch(SummaryApi.getProductCategory.url)
        const dataResponse = await response.json()
        setloading(false)

        setproductCategory(dataResponse.data)
    }

    useEffect(() => {
        getProductByCategory()
    }, [])

    return (
        <div className='container  mx-auto p-4'>
            <div className='flex items-center scrollbar-none overflow-scroll justify-between gap-3'>
                {
                    loading ? (

                      
                        loadCategory.map((el, index) => {
                            return (
                                <div key={index} className='bg-slate-200 h-18 w-18 hidden animate-pulse md:block md:h-20 md:w-20 rounded-full'>
                                </div>
                            )
                        })
                      
                    ) : (

                        productCategory.map((product, index) => {
                            return (
                                <Link to={'/productCategory?category='+product?.category} key={index} className='cursor-pointer'>
                                    <div className='w-18 h-18 md:w-20 md:h-20  rounded-full flex justify-center items-center bg-slate-200 ' key={"ProductCategory" + index}>
                                        <img className='object-scale-down p-3 h-full hover:scale-125 transition-all  mix-blend-multiply' src={product?.productImage[0]} alt={product?.category} />
                                    </div>
                                    <div className='flex items-center justify-center text-sm md:text-base capitalize'>{product?.category}</div>
                                </Link>
                            )
                        })
                    )
                }
            </div>
        </div>
    )
}

export default ProductCategory
