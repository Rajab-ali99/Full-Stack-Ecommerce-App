import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import productCategory from '../helpers/productCategory'
import SummaryApi from '../common'
import SearchedProducts from '../components/SearchedProducts'
import { IoClose } from "react-icons/io5";
import { RxHamburgerMenu } from "react-icons/rx";
const CategoryProducts = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const urlSearch = new URLSearchParams(location.search)
  const urlCategoryInArray = urlSearch.getAll('category')
  const categoryObject = {}
  urlCategoryInArray.forEach(el => {
    categoryObject[el] = true
  })
  const [sortBy, setsortBy] = useState("")
  const [data, setdata] = useState([])
  const [loading, setloading] = useState(false)
  const [selectCategory, setselectCategory] = useState(categoryObject)
  const [arrayOfCategory, setarrayOfCategory] = useState([])
  const filter = async () => {
    setloading(true)
    const response = await fetch(SummaryApi.filterProducts.url, {
      method: SummaryApi.filterProducts.method,
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify({
        category: arrayOfCategory
      })
    })
    const responseData = await response.json()
    setdata(responseData?.data)
    setloading(false)
  }
  const handleMoveLeft = (e) => {
    const sidebar = document.getElementById('sidebar');
    sidebar.style.left = '-300px';
  }
  const handleMoveRight = ()=>{
    const sidebar = document.getElementById('sidebar');
    sidebar.style.left = '16px';
  }

  const handleSelectCategory = (e) => {
    const { name, value, checked } = e.target
    setselectCategory((preve) => {
      return {
        ...preve,
        [value]: checked
      }
    })
  }

  const handleSortBy = (e) => {
    const { value } = e.target
    setsortBy(value)
    if (value === 'asc') {
      setdata(preve => preve.sort((a, b) => a.sellingPrice - b.sellingPrice))
    }

    if (value === 'dsc') {
      setdata(preve => preve.sort((a, b) => b.sellingPrice - a.sellingPrice))
    }
  }
  useEffect(() => {

  }, [sortBy])

  useEffect(() => {
    const arrayOfCategory = Object.keys(selectCategory).map(categoryKeyName => {
      if (selectCategory[categoryKeyName]) {
        return categoryKeyName
      }
      return null
    }).filter(el => el)
    setarrayOfCategory(arrayOfCategory)
    //url format while changing category
    const urlFormat = arrayOfCategory.map((el, index) => {
      if (arrayOfCategory.length - 1 === index) {
        return `category=${el}`
      }
      return `category=${el}&&`
    })
    navigate(`/productCategory?` + urlFormat.join(''))
  }, [selectCategory])
  useEffect(() => {
    filter()

  }, [arrayOfCategory])


  return (
    <div className='container md:px-4 py-2 mx-auto'>
      {/**Desktop view */}
      
        <RxHamburgerMenu className='mx-4 block md:hidden' onClick={handleMoveRight} />
     
      <div className='flex gap-5 justify-center md:justify-items-normal items-center'>
        {/**Left */}
        <div id='sidebar' className='w-[250px] md:h-[86vh] left-4 transition-all ease-in-out duration-500  md:relative md:top-0 h-[55vh] absolute top-20 z-10  p-2  shadow-md rounded bg-white'>
          <div>
            <div className='flex items-center text-slate-500 border-b-1 justify-between'>
              <p className='  font-medium text-slate-500 '>SORT BY</p>
              <IoClose className='text-xl block md:hidden text-red-500' onClick={handleMoveLeft} />
            </div>
            <form className='py-2' >
              <div className='flex items-center gap-2'>
                <input type="radio" checked={sortBy === 'asc'} value={'asc'} onChange={handleSortBy} name="sortBy" />
                <label  >Price - Low to High</label>
              </div>
              <div className='flex items-center gap-2'>
                <input type="radio" checked={sortBy === 'dsc'} value={'dsc'} onChange={handleSortBy} name="sortBy" />
                <label   >Price - High to Low</label>
              </div>
            </form>
          </div>
          <div>
            <div className=' mt-1 font-medium text-slate-500 border-b-1'>CATEGORY</div>
            <div className='py-2'>

              {
                productCategory.map((prod, index) => {
                  return (
                    <div className='flex items-center gap-2'>
                      <input type="checkbox" checked={selectCategory[prod?.value]} name={'category'} value={prod?.value} id={prod?.value} onChange={handleSelectCategory} />
                      <label htmlFor={prod.value}>{prod.label}</label>
                    </div>
                  )
                })
              }
            </div>

          </div>
        </div>
        {/**Right */}

        <div className='w-[80vw] md:px-10 overflow-y-scroll h-[85vh]'>
          <p className='text-xl font-extrabold'>Searched Results : {data.length}</p>
          {
            loading ? (
              <div className='flex h-full items-center justify-center'>
                <span className='loadar  '></span>
              </div>
            ) : (

              <SearchedProducts productData={data} />
            )
          }
        </div>
      </div>
    </div>
  )
}

export default CategoryProducts
