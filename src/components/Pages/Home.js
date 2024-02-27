import React from 'react'
import Data from '../Data'
import Sidebar from '../Sidebar'
import Header from '../Header'

const Home = () => {
  return (
    <><Header/>
    <div className="w-full flex">
      <Sidebar/>
      <Data/>
    </div>
    </>

  )
}

export default Home
