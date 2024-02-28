import React from 'react'
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import { db } from '../firebase/Firebase';
import { useState,useEffect } from 'react';
import { onSnapshot,collection } from 'firebase/firestore';
import TrashedFiles from '../components/TrashedFiles';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

const Trash = () => {

const [files,setFiles]=useState([]);


  useEffect(()=>{
    const listenToFiles = async () => {
      const unsubscribe =  onSnapshot(collection(db, "trash"), (snapshot) => {
          
          setFiles( snapshot.docs.map(doc => ({
            id: doc.id,
            data: doc.data()
        })));
      });
      
      
      
    
  }
  listenToFiles();
  },[])



 
  return (
   <>
   {
    files.length >0 ?<>
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
        <div className='grid grid-cols-5 w-full p-2 border-b-2 border-gray-200 px-4'>
            <p  className='text-sm font-medium text-left '>Name <ArrowDownwardIcon/></p>
            <p className='text-sm font-medium text-right max-md:hidden'>Owner</p>
            <p className='text-sm font-medium text-right max-md:hidden'>Deleted At</p>
            <p className='text-sm font-medium text-right'>Size</p>
            <p className='text-sm font-medium text-right'>Action</p>
        </div>
        {
         files.map(file=>{
            return <TrashedFiles file={file}/>
        
          })
        }


      </div></>:
      <div className='flex flex-col justify-center items-center h-screen'>
        <img src="trash.jpg"/>
       
      <h1 className='font-semibold text-3xl text-gray-800'>Nothing in trash</h1>
      <p>Move items you don't need to trash</p>
      </div>
}</>
  )
}

export default Trash 
