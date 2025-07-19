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
    <div className=' p-3 rounded relative group bg-white'>
      <img src={data?.productImage[0]} alt="" width={100} height={100} />
      <p className='font-bold text-sm text-center'>{data?.productName}</p> 
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
