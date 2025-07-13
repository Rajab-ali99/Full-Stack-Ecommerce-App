import React, { useState } from 'react'
import UploadProducts from '../components/UploadProducts'
const AllProducts = () => {
  const [openUploadProduct, setopenUploadProduct] = useState(false)
  return (
    <div className='p-4'>
        <div className='bg-white rounded px-3 py-3 flex justify-between  w-full'>
          <h1 className='font-bold text-xl'>All Products</h1> 
          <button onClick={()=>setopenUploadProduct(true)} className='border-red-600 transition-all hover:bg-red-600 border-2 py-1 cursor-pointer hover:text-white text-red-600 hover px-2 rounded-full'>Upload Product</button>
        </div>
        {
          openUploadProduct &&(
            <UploadProducts onclose ={()=> setopenUploadProduct(false)}/>
          )
        }
    </div>
  )
}

export default AllProducts
