import React, { useState } from 'react'
import { MdModeEditOutline } from "react-icons/md";
import EditUploadedProduct from './EditUploadedProduct';
import displayPKRcurrency from '../helpers/displayCurrency';
const ProductCard = ({
    data,
    calFun,
}) => {
    const [openEditProduct, setopenEditProduct] = useState(false)
  return (
    <div className=' p-2 rounded w-40 h-46 relative group bg-white'>
      <div className='className="w-[110px] h-[110px] mx-auto" '>
      <img className=' object-contain w-full h-full' src={data?.productImage[0]} alt="" />
      </div>
      <p className='font-bold text-ellipsis line-clamp-2 text-sm text-center'>{data?.productName}</p> 
      <p className='text-center text-red-500 text-xs font-bold'>{displayPKRcurrency(data?.sellingPrice)}</p>
      <MdModeEditOutline  
      onClick={()=> setopenEditProduct(true)}
      className='bg-green-300 hidden group-hover:block cursor-pointer rounded-full p-1 hover:text-white hover:bg-green-600 text-2xl m-2 absolute bottom-0 right-0'/>
      {
        openEditProduct&&(
            <EditUploadedProduct ProductData={data} calFun={calFun} onclose={()=> setopenEditProduct(false)}/>
        )
      }
    </div>
  )
}

export default ProductCard
