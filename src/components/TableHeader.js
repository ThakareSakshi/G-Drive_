import React from 'react'
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';

const TableHeader = () => {
  return (
    <div className='grid grid-cols-5 w-full p-2 border-b-2 border-gray-200 px-4 max-md:grid-cols-3'>
    <p  className='text-sm font-medium text-left '>Name <ArrowDownwardIcon/></p>
    <p className='text-sm font-medium text-right max-md:hidden'>Owner</p>
    <p className='text-sm font-medium text-right max-md:hidden'>Modified At</p>
    <p className='text-sm font-medium text-right'>Size</p>
    <p className='text-sm font-medium text-right'>Action</p>
</div>
  )
}

export default TableHeader
