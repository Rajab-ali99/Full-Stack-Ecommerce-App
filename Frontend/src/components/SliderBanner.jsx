import React, { useEffect, useState } from 'react'
import image1 from '../assets/banner/IMG1.png'
import image2 from '../assets/banner/IMG2.png'
import image3 from '../assets/banner/IMG3.jpg'
import image4 from '../assets/banner/IMG4.jpg'
import image5 from '../assets/banner/IMG5.jpg'

import imgMB1 from '../assets/banner/IMG1m.jpg'
import imgMB2 from '../assets/banner/IMG2m.jpg'
import imgMB3 from '../assets/banner/IMG4m.jpg'
import imgMB4 from '../assets/banner/IMG4m.webp'
import imgMB5 from '../assets/banner/IMG5m.jpg'
import { FaAngleLeft } from "react-icons/fa";
import { FaAngleRight } from "react-icons/fa";

const SliderBanner = () => {
    const [countslide, setcountslide] = useState(0)
    const DesktopSlider = [
        image1,
        image2,
        image3,
        image4,
        image5
    ]

    const MobileSlider = [
        imgMB1,
        imgMB2,
        imgMB3,
        imgMB4,
        imgMB5
    ]
    const handleNext = () => {
        if (DesktopSlider.length - 1 > countslide) {

            setcountslide(preve => preve + 1)
        }
    }
    const handleprev = () => {
        if (DesktopSlider.length - 5 < countslide) {

            setcountslide(preve => preve - 1)
        }
    }
    useEffect(() => {
        const intervel = setInterval(() => {
            if (DesktopSlider.length - 1 > countslide) {

                handleNext()
            } else { setcountslide(0) }
        }, 3000);

        return () => {
            clearInterval(intervel)
        }
    }, [countslide])



    return (
        <div className='container  mx-auto px-4'>
            {/* Desktop Slider */}
            <div className='md:flex relative hidden  rounded-md w-full overflow-hidden'>
                <div className='absolute z-10 flex w-full   h-full items-center justify-between '>
                    <button onClick={handleprev} className='text-2xl p-1  bg-white cursor-pointer rounded-full hover:scale-105 transition-all'><FaAngleLeft /></button>
                    <button onClick={handleNext} className='text-2xl p-1  bg-white cursor-pointer rounded-full hover:scale-105 transition-all'><FaAngleRight /></button>
                </div>

                {
                    DesktopSlider.map((img, index) => {
                        return (
                            <div className='h-80 md:h-96 min-w-full ' key={index}>
                                <img className='h-full  w-full transition-all duration-500 ease-out ' style={{ transform: `translateX(-${countslide * 100}%)` }} src={img} alt="banner" />
                            </div>
                        )
                    })
                }
            </div>
            {/* MobileSlider */}
            <div className='flex relative md:hidden rounded-md w-full overflow-hidden'>
                

                {
                    MobileSlider.map((img, index) => {
                        return (
                            <div className='h-80 min-w-full ' key={index}>
                                <img className='h-full  w-full transition-all duration-700 ease-out  ' style={{ transform: `translateX(-${countslide * 100}%)` }} src={img} alt="banner" />
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default SliderBanner
