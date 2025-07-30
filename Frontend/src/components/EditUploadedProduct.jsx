import React, { useState } from 'react'
import { RxCross2 } from "react-icons/rx";
import productCategory from '../helpers/productCategory';
import { FaCloudUploadAlt } from "react-icons/fa";
import uploadFile from '../helpers/uploadFile';
import { MdDelete } from "react-icons/md";
import UploadImagePreview from './UploadImagePreview';
import SummaryApi from '../common';
import { toast } from 'react-toastify';

const EditUploadedProduct = ({onclose,ProductData,calFun}) => {
     const [showFullimage, setshowFullimage] = useState(false)
    const [showFullImageUrl, setshowFullImageUrl] = useState('')
    const [dataUpload, setdataUpload] = useState({
        ...ProductData,
        productName: ProductData?.productName,
        brandName: ProductData?.brandName,
        category: ProductData?.productCategory,
        productImage: ProductData?.productImage,
        description: ProductData?.description,
        price: ProductData?.price,
        sellingPrice: ProductData?.sellingPrice

    })
    const handleSubmit = async(e)=>{
     e.preventDefault()
     const Response = await fetch(SummaryApi.updateProduct.url,{
        method : SummaryApi.updateProduct.method,
        credentials:'include',
        headers:{
            'content-type':'application/json'
        },
        body:JSON.stringify(dataUpload)
     })

         const dataApi = await Response.json()

         if(dataApi.success){
            toast.success(dataApi.message)
            calFun()
            onclose()
         }
         if(dataApi.error){
            toast.error(dataApi.message)
         }
     
    }
    const handleUploadPic = async (e) => {
        let file = e.target.files[0]
        const uploadPhoto = await uploadFile(file)
        setdataUpload((preve) => {
            return {
                ...preve,
                productImage: [...preve.productImage, uploadPhoto.url]
            }

        })


    }
    const handleOnChange = (e) => {
        const { name, value } = e.target

        setdataUpload((preve) => {
            return {
                ...preve,
                [name]: value
            }
        })
    }
const handleDelete = (index)=>{
    const updateProductImage = [...dataUpload.productImage]
    updateProductImage.splice(index,1)
   setdataUpload((preve) => {
            return {
                ...preve,
                productImage: [...updateProductImage]
            }

        })
}
   return (
        <div className='fixed z-10 top-0 bottom-0 left-0 right-0 flex justify-center items-center bg-slate-200/55'>
            <div className='bg-white w-full rounded p-4 max-w-2xl h-[85%] overflow-hidden'>
                <div className='flex items-center justify-between'>
                    <h1 className='font-bold text-xl'>Edit Product</h1>
                    <button onClick={onclose}>
                        <RxCross2 className='text-2xl cursor-pointer hover:text-red-500' />
                    </button>
                </div>

                <form className='mt-4 py-4 grid overflow-y-scroll h-full  gap-3' onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="productName" className=' font-medium text-sm'>Product Name:</label>
                        <input
                            required
                            type="text"
                            name='productName'
                            id='productName'
                            onChange={handleOnChange}
                            placeholder='Enter product name...'
                            value={dataUpload.productName}
                            className='w-full bg-slate-100 mt-1 p-2 outline-none shadow' />
                    </div>
                    <div>

                        <label htmlFor="brandName" className='font-medium  text-sm'>Brand Name:</label>
                        <input
                            required
                            type="text"
                            name='brandName'
                            id='brandName'
                            onChange={handleOnChange}
                            placeholder='Enter brand name...'
                            value={dataUpload.brandName}
                            className='w-full bg-slate-100 mt-1 p-2 outline-none shadow' />
                    </div>
                    <div>
                        <label htmlFor="category" className='font-medium  text-sm'>Category:</label>
                        <select
                            required
                            name="category"
                            className='w-full bg-slate-100 mt-1 p-2 outline-none shadow'
                            value={dataUpload.category}
                            onChange={handleOnChange}>

                            <option value={''}>Select Category</option>
                            {
                                productCategory.map((el, index) => {
                                    return (
                                        <option value={el.value} key={el.id}>{el.label}</option>
                                    )
                                })
                            }
                        </select>
                    </div>
                    <div>
                        <label htmlFor="productImage" className='font-medium  text-sm'>Product Image:</label>
                        <label htmlFor="uploadImages">
                            <div className='w-full h-32 cursor-pointer  flex flex-col justify-center items-center bg-slate-100 mt-1 p-2 outline-none shadow'>

                                <FaCloudUploadAlt className='text-3xl cursor-pointer' />

                                <p className='text-slate-500'>upload your images...</p>
                                <input type="file" className='hidden' name='uploadImages' onChange={handleUploadPic} id='uploadImages' />
                            </div>
                        </label>
                        {

                            dataUpload.productImage[0] ? (
                                
                                    <div className=' flex gap-10 items-center m-3'>
                                        {
                                            dataUpload.productImage.map((el, index) => {
                                                return (
                                                    
                                                    <div key={index} className='relative cursor-all-scroll group  '> 
                                                    <img 
                                                    
                                                    src={el} 
                                                    alt="error"
                                                    onClick={()=>{
                                                        setshowFullImageUrl(el)
                                                        setshowFullimage(true)
                                                    }} 
                                                    className='bg-slate-100 object-cover  w-[100px] h-[100px]' />
                                                    
                                                        <MdDelete onClick={()=>handleDelete(index)} className='text-2xl hover:cursor-pointer absolute right-0 hidden group-hover:block p-1 bottom-0 bg-red-500 m-1 rounded-full text-white'/>
                                                    </div>
                                                    

                                                )
                                            })
                                        }
                                    </div>
                                
                            ) :(
                                <p className='text-red-500 text-xs p-1'>please upload images</p>
                            )
                        }
                    </div>
                    <div>

                        <label htmlFor="price" className='font-medium  text-sm'>Price:</label>
                        <input
                            required
                            type="number"
                            name='price'
                            id='price'
                            onChange={handleOnChange}
                            placeholder='Enter price...'
                            value={dataUpload.price}
                            className='w-full bg-slate-100  p-2 outline-none shadow' />
                    </div>
                     <div>

                        <label htmlFor="sellingPrice" className='font-medium  text-sm'>Selling Price:</label>
                        <input
                            type="number"
                            required
                            name='sellingPrice'
                            id='sellingPrice'
                            onChange={handleOnChange}
                            placeholder='Enter selling price...'
                            value={dataUpload.sellingPrice}
                            className='w-full bg-slate-100  p-2 outline-none shadow' />
                    </div>
                     <label htmlFor="description" className='font-medium  text-sm'>Description:</label>
                     <textarea 
                     name="description" 
                     id="description"
                     value={dataUpload.description} 
                     onChange={handleOnChange}
                     placeholder='Enter product description...'
                     className='resize-none rounded bg-slate-100 p-2 outline-none shadow h-32'
                     ></textarea>
                    <button className='mb-10 w-md mt-3 mx-auto bg-red-600 transition-all hover:bg-red-700 border-2 py-1 cursor-pointer text-white  hover px-2 rounded-full'>Update Product</button>
                </form>
                {
                  showFullimage &&(
                    <UploadImagePreview  ImgUrl={showFullImageUrl} onClose={()=>{setshowFullimage(false)}}/>
                  )  
                }
            </div>
        </div>
    )
}

export default EditUploadedProduct
