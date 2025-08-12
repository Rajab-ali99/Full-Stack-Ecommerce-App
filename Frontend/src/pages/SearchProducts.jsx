import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import SummaryApi from '../common'
import SearchedProducts from '../components/SearchedProducts'

const SearchProducts = () => {
    const [data, setdata] = useState([])
    const [loading, setloading] = useState(false)
    const querry = useLocation()
    const fetchProducts = async () => {
        setloading(true)
        const response = await fetch(SummaryApi.searchProducts.url + querry.search, {
            method: SummaryApi.searchProducts.method
        })
        const dataResponse = await response.json()
        setdata(dataResponse.data)
        setloading(false)
    }



    useEffect(() => {
        fetchProducts()
    }, [querry])

    return (
        <div className='container px-3 py-2 mx-auto'>
            {loading && (
                <div className='h-[80vh] w-[80vw] mx-auto flex justify-center items-center'>
                    <span className='loadar  '></span>
                </div>
            )}
            {
                data.length === 0 && !loading &&(
                    <div className='text-slate-500 text-center font-medium text-2xl'>
                        Data not found...!
                    </div>
                )
            }
            {
                data.length !==0 && !loading &&(
                    <div>
                        <h2 className='text-2xl font-extrabold'>Search Results : {data.length} </h2>
                         <div className='h-[1px] full bg-slate-500 '></div>
                        <div >
                            <SearchedProducts productData ={data}/>
                        </div>
                    </div>
                )
            }



        </div>
    )
}

export default SearchProducts
