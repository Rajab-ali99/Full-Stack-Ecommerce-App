import React from 'react'
import { RxCross2 } from "react-icons/rx";
const UploadImagePreview = ({
    ImgUrl,
    onClose
}) => {
  return (
    <div className='fixed top-0 right-0  left-0 bottom-0 flex justify-center items-center bg-slate-200/50'>
       <div className='bg-white h-[90%]   w-full max-w-2xl  rounded  '>
        <RxCross2 onClick={onClose} className='w-fit ml-auto text-2xl cursor-pointer hover:text-red-500 m-1  '/>
        <img src={ImgUrl} alt="" className='h-[80vh] w-[80vh]  mx-auto' />
       </div>
    </div>
  )
}

export default UploadImagePreview
