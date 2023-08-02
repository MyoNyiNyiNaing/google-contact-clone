import React from 'react'
import Lottie from 'lottie-react'
import animationData from '../lotties/animation_404_error.json'
import { Link } from 'react-router-dom'

const Error = () => {
   
  return (
    <div className=' bg-black text-white min-h-screen font-poppins max-md:flex flex-col justify-center md:grid grid-cols-2 items-center p-5'>
        <div className=' max-w-[600px]'>
        <Lottie animationData={animationData} loop={true} />
        </div>

        <div className=' max-sm:text-center mx-auto'>
            <h4 className=' text-[20px] font-[500] text-gray-300'>Error Code: <span className=' text-[#78199A]'>404</span></h4>
            <h1 className=' uppercase max-sm:text-[30px] text-[50px] font-[700] mb-5'>page not found</h1>
            <h4 className=' text-[20px] text-gray-300 mb-5'>
                The page you're looking for might be <br /> renamed or removed
            </h4>
            <div className=''>
                <Link to={'/'}>
                <button className=' px-5 py-2 bg-[#5A0980] rounded font-[500] hover:bg-[#370550] transition duration-200'>Go Back to Home Page</button>
                </Link>
            </div>
        </div>
    </div>
  )
}

export default Error