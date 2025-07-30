import React, { useEffect, useState } from 'react'
import UploadProducts from '../components/UploadProducts'
import SummaryApi from '../common'
import { data } from 'react-router-dom'
import ProductCard from '../components/ProductCard'
const AllProducts = () => {
  const [openUploadProduct, setopenUploadProduct] = useState(false)
  const [productData, setproductData] = useState([])
  const getProductData = async () => {
    const fetchData = await fetch(SummaryApi.getProducts.url)
    const Response = await fetchData.json()
    setproductData(Response?.data || [])
  }


  useEffect(() => {
    getProductData()


  }, [])


  return (
    <div className='p-4 '>
      <div className='bg-white rounded px-3 py-3 flex justify-between  w-full'>
        <h1 className='font-bold text-xl'>All Products</h1>
        <button onClick={() => setopenUploadProduct(true)} className='border-red-600 transition-all hover:bg-red-600 border-2 py-1 cursor-pointer hover:text-white text-red-600 hover px-2 rounded-full'>Upload Product</button>
      </div>
      {
        openUploadProduct && (
          <UploadProducts calFun={getProductData} onclose={() => setopenUploadProduct(false)} />
        )
      }
      <div className='flex flex-wrap h-[calc(100vh-230px)]  overflow-y-scroll gap-5  mt-2'>

        {
          productData.map((product, index) => {
            return (
              <ProductCard  data={product} key={index + 'all products'} calFun={getProductData} />
            )
          })
        }
      </div>
    </div>
  )
}

export default AllProducts
