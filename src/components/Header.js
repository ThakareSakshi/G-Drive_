import React from 'react'
import searchIcon from "@mui/icons-material/Search"
import HelpOutlineOutlinedIcon from '@mui/icons-material/HelpOutlineOutlined';
import AppsOutlinedIcon from '@mui/icons-material/AppsOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import { AppBar } from '@mui/material'

const Header = () => {
  return (
    <div className='flex items-center  px-4 justify-between bg-[#F8FAFD]'>
     <div className='flex items-center'> <img src="https://download.logo.wine/logo/Google_Drive/Google_Drive-Logo.wine.png" className='h-10' />
      <span className='font-semibold'>G-Drive</span></div>

      <div >
        <div className=' bg-[#E9EEF6] px-3 m-2 rounded-full p-1'>
            
            <i className="fa-solid fa-magnifying-glass"></i>
            <input className='p-2 w-[550px] bg-[#E9EEF6] outline-none' placeholder='Search in Drive ...' type="text"/>
            <i class="fa-solid fa-sliders"></i>

        </div>
       
      </div>
      <div className='flex gap-4 items-center text-xl'>
        <HelpOutlineOutlinedIcon/>
        <SettingsOutlinedIcon/>
        <AppsOutlinedIcon/>
        <i className="fa-solid fa-user cursor-pointer"></i>

      </div>
    </div>
  )
}

export default Header
