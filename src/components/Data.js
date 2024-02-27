import React from 'react'
import ArrowDropDownOutlinedIcon from '@mui/icons-material/ArrowDropDownOutlined';
import FormatListBulletedOutlinedIcon from '@mui/icons-material/FormatListBulletedOutlined';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import { db } from '../firebase/Firebase';
import { useState,useEffect } from 'react';
import { onSnapshot,collection } from 'firebase/firestore';
import { Unsubscribe } from '@mui/icons-material';
const Data = () => {

  const [files,setFiles]=useState([]);

  useEffect(()=>{
    const listenToFiles = async () => {
      const unsubscribe = onSnapshot(collection(db, "myfiles"), (snapshot) => {
          
          setFiles( snapshot.docs.map(doc => ({
            id: doc.id,
            data: doc.data()
        })));
      });
      
      console.log(files);
      // Return unsubscribe function in case you need to stop listening to changes later
    
  }
  listenToFiles();
  },[])

  const changeBytes = (bytes, decimals = 2) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}


function formatTimestamp(timestamp) {
  
  const milliseconds = timestamp.seconds * 1000 + timestamp.nanoseconds / 1000000;

  
  const date = new Date(milliseconds);

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Month is zero-based
  const day = String(date.getDate()).padStart(2, '0');
  

  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const seconds = String(date.getSeconds()).padStart(2, '0');

  
  const formattedDateTime = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;

  return formattedDateTime;
}
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
        {
          files.map(file=>{
            return <a href={file.data.fileURL} key={file.id}>
              <div className='border-2  w-fit rounded-lg m-4' >
            <div className='px-10 py-4'> <InsertDriveFileIcon style={{fontSize:"50px", color:"gray"}}/></div>
            <div className='bg-gray-100 w-full text-center p-2 text-gray-800'>{file.data.filename}</div>
        </div>
            </a>
          })
        }

       
      </div>
      <div>
        <div className='flex w-full justify-between p-2 border-b-2 border-gray-200 px-4'>
            <p  className='text-sm'>Name <ArrowDownwardIcon/></p>
            <p className='text-sm'>Owner</p>
            <p className='text-sm'>Last Modified</p>
            <p className='text-sm'>Size</p>
        </div>
        {
          files.map(file=>{
            return <a href={file.data.fileURL}>
              <div className='flex w-full justify-between p-4 border-b-[1px] border-gray-200 px-4' key={file.id}>
              <p className='text-[13px] text-center flex items-center gap-1'><InsertDriveFileIcon style={{fontSize:"16px", color:"gray"}}/>{file.data.filename}</p>
              <p className='text-[13px] text-center'>owner</p>
              <p className='text-[13px] text-center'>{formatTimestamp(file.data.timestamp)}</p>
              <p className='text-[13px] text-center'>{changeBytes(file.data.size)}</p>

            </div>
            </a>
          })
        }


      </div>
    </div>
  )
}

export default Data
