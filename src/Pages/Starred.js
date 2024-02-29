import React from 'react'
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import { db } from '../fireData/Firebase';
import { useState,useEffect } from 'react';
import { onSnapshot,collection } from 'firebase/firestore';
import File from '../components/File';
import GradeIcon from '@mui/icons-material/Grade';

const Starred = () => {

const [files,setFiles]=useState([]);
const [starredList,setStarredList]=useState([])

  useEffect(()=>{
    const listenToFiles = async () => {
      const unsubscribe =  onSnapshot(collection(db, "myfiles"), (snapshot) => {
          
          setFiles( snapshot.docs.map(doc => ({
            id: doc.id,
            data: doc.data()
        })));
      });
    
  }
  listenToFiles();
  },[])

  useEffect(()=>{
   setStarredList(files.filter(file=>file.data.starred));
 
  },[files])

 
  return (
   <>
   {
    starredList.length >0 ?(<><div className='flex'>
    {
      starredList.map(file=>{
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
    <div className='grid grid-cols-5 w-full justify-between p-2 border-b-2 border-gray-200 px-4'>
        <p  className='text-sm font-medium text-left'>Name <ArrowDownwardIcon/></p>
        <p className='text-sm font-medium text-right max-md:hidden'>Owner</p>
        <p className='text-sm font-medium text-right max-md:hidden'>Last Modified</p>
        <p className='text-sm font-medium text-right'>Size</p>
        <p className='text-sm font-medium text-right'>Action</p>
    </div>
    {
     starredList.map(file=>{
        return <File file={file}/>
    
      })
    }


  </div></>):
  <div className='flex flex-col justify-center items-center h-screen'>
  <img src="star.png"/>
 
<h1 className='font-semibold text-3xl text-gray-800'>No starred files.</h1>
<p>Add star to things that you want to easily find later.</p>
</div>
   }
   </>
  )
}

export default Starred
