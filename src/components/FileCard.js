import React from 'react'
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';

const FileCard = ({file}) => {
  return (
    <a href={file.data.fileURL} key={file.id}>
              <div className='border-2  w-fit rounded-lg m-4 max-w-40' >
            <div className='px-10 py-4'> <InsertDriveFileIcon style={{fontSize:"50px", color:"gray"}}/></div>
            <div className='bg-gray-100 w-full text-center p-2 text-gray-800'>{file.data.filename}</div>
        </div>
            </a>
  )
}

export default FileCard
