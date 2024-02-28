import React, { useContext, useEffect, useState } from 'react'
import ArrowDropDownOutlinedIcon from '@mui/icons-material/ArrowDropDownOutlined';
import FormatListBulletedOutlinedIcon from '@mui/icons-material/FormatListBulletedOutlined';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';

import MyDrive from '../Pages/MyDrive';
import Starred from '../Pages/Starred';
import Trash from '../Pages/Trash';
import { FileCtx } from '../Context/FileContext';

const Data = () => {
 const ctx=useContext(FileCtx);


   const handlePages=(e)=>{
   switch(e.target.value){
    case "MyDrive": ctx.setCurrentPage(<MyDrive/>);break;
    case "starred":ctx.setCurrentPage(<Starred/>);break;
    case "trash":ctx.setCurrentPage(<Trash/>);break;

   }
       
   }



  return (
    <div className='w-5/6 p-4 pr-12 max-md:w-full max-md:pr-0 rounded-lg mr-10'>
      <div>
        <div className='flex w-full justify-between p-2 border-b-2 border-gray-200'>
         <span><select className='' onChange={handlePages}>
          <option value="MyDrive">My Drive</option>
          <option value="starred">Starred</option>
          <option value="trash">Trash</option></select></span>
         <div className='flex gap-2'>
            <FormatListBulletedOutlinedIcon/>
            <InfoOutlinedIcon/>
         </div>
        </div>
      </div>
      <div>
       {ctx.currentPage}
      </div>

    
    </div>
  )
}

export default Data
