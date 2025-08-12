import React from 'react'
import ProductCategory from '../components/ProductCategory'
import SliderBanner from '../components/SliderBanner'
import HorizontalProductCard from '../components/HorizontalProductCard'
import VerticalProductCard from '../components/VerticalCardProduct'

const Home = () => {
  return (
    <div>
      <ProductCategory/>
      <SliderBanner/>
      <HorizontalProductCard category={'airpodes'} heading={'The Best Selling AirPods...'}/>
      <HorizontalProductCard category={'earphones'} heading={'Latest Earphones with Crystal Clear Sound...'}/>
      <VerticalProductCard category={'camera'} heading={' Capture Moments with Our Best Cameras...'}/>
      <VerticalProductCard category={'televisions'} heading={'Top-Rated Smart TVs You’ll Love...'}/>
      <VerticalProductCard category={'refrigerators'} heading={'Top Refrigerators for Smart Cooling...'}/>
      <VerticalProductCard category={'mouse'} heading={'Smooth Performance with Our Top Mice...'}/>
      <VerticalProductCard category={'watches'} heading={'Best-Selling Digital & Smart Watches...'}/>
      <VerticalProductCard category={'speakers'} heading={'Experience Sound with Our Best Speakers...'}/>
      <VerticalProductCard category={'mobiles'} heading={'Top Trending Smartphones of the Season...'}/>
      <VerticalProductCard category={'processor'} heading={'High-Performance Processors for Power Users...'}/>
      <VerticalProductCard category={'printers'} heading={'Best-Selling Printers for Home & Office...'}/>
      <VerticalProductCard category={'trimmers'} heading={'Top Grooming Trimmers for You...'}/>
    </div>
  )
}

export default Home
