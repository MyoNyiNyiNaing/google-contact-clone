import React from 'react'
import { ClipLoader } from "react-spinners";

const Loading = () => {
  return (
    <div className=' flex items-center justify-center mt-20'>
        <ClipLoader color="#1D4ED8" size={35} />
    </div>
  )
}

export default Loading