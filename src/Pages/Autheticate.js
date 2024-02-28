import React from 'react'

const Autheticate = ({signin}) => {


  return (
    <div className='flex justify-center items-center w-full bg-[url("https://images.news18.com/ibnlive/uploads/2023/11/google-drive-logo-2023-11-c3cc4a31cc8d4becdf198a23c39062d6.jpg")] h-screen'>
     <div className='bg-white p-6 rounded-xl flex flex-col justify-center items-center min-w-[400px]'>
     {/* <h1 className='text-2xl font-semibold'>Enhance your storage Experience</h1> */}
        <img src="user.jpg" className='h-40 w-40'/>
        {/* <h1 className='text-2xl font-semibold'>Login To G-Drive Account</h1> */}
        <button className='p-2 w-full m-2 bg-purple-800 text-white rounded-md' onClick={signin}>Sign In with Google</button>
     </div>
    </div>
  )
}

export default Autheticate
