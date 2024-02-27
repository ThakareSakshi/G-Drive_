import React from 'react'
import ArrowDropDownOutlinedIcon from '@mui/icons-material/ArrowDropDownOutlined';
import FormatListBulletedOutlinedIcon from '@mui/icons-material/FormatListBulletedOutlined';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';

import MyDrive from './Pages/MyDrive';
import Starred from './Pages/Starred';
import Trash from './Pages/Trash';

const Data = () => {
   



  return (
    <div className='w-5/6 p-4 pr-12 max-md:w-full max-md:pr-0'>
      <div>
        <div className='flex w-full justify-between p-2 border-b-2 border-gray-200'>
         <span><select className=''>
          <option value={<MyDrive/>}>My Drive</option>
          <option value={<Starred/>}>Starred</option>
          <option value={<Trash/>}>Trash</option></select></span>
         <div className='flex gap-2'>
            <FormatListBulletedOutlinedIcon/>
            <InfoOutlinedIcon/>
         </div>
        </div>
      </div>

    
    </div>
  )
}

export default Data
