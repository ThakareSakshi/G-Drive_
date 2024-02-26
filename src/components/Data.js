import React from 'react'
import ArrowDropDownOutlinedIcon from '@mui/icons-material/ArrowDropDownOutlined';
import FormatListBulletedOutlinedIcon from '@mui/icons-material/FormatListBulletedOutlined';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';

const Data = () => {
  return (
    <div className='w-5/6 p-4 pr-12'>
      <div>
        <div className='flex w-full justify-between p-2 border-b-2 border-gray-200'>
         <span>My Drive <ArrowDropDownOutlinedIcon/></span>
         <div className='flex gap-2'>
            <FormatListBulletedOutlinedIcon/>
            <InfoOutlinedIcon/>
         </div>
        </div>
      </div>

      <div className='flex'>
        <div className='border-2  w-fit rounded-lg m-4'>
          <div className='px-10 py-4'> <InsertDriveFileIcon style={{fontSize:"50px", color:"gray"}}/></div>
           <div className='bg-gray-100 w-full text-center p-2 text-gray-800'>Filename</div>
        </div>

        <div className='border-2  w-fit rounded-lg m-4'>
          <div className='px-10 py-4'> <InsertDriveFileIcon style={{fontSize:"50px", color:"gray"}}/></div>
           <div className='bg-gray-100 w-full text-center p-2 text-gray-800'>Filename</div>
        </div>
      </div>
      <div>
        <div className='flex w-full justify-between p-2 border-b-2 border-gray-200 px-4'>
            <p  className='text-sm'>Name <ArrowDownwardIcon/></p>
            <p className='text-sm'>Owner</p>
            <p className='text-sm'>Last Modified</p>
            <p className='text-sm'>Size</p>
        </div>
      </div>
    </div>
  )
}

export default Data
