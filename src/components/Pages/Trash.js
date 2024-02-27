import React from 'react'
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import { db } from '../../firebase/Firebase';
import { useState,useEffect } from 'react';
import { onSnapshot,collection } from 'firebase/firestore';
import File from '../File';
import GradeIcon from '@mui/icons-material/Grade';
import TrashedFiles from '../TrashedFiles';

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
    
      <div>
        <div className='flex w-full justify-between p-2 border-b-2 border-gray-200 px-4'>
            <p  className='text-sm'>Name <ArrowDownwardIcon/></p>
            <p className='text-sm max-md:hidden'>Owner</p>
            <p className='text-sm max-md:hidden'>Deleted At</p>
            <p className='text-sm'>Size</p>
        </div>
        {
         files.map(file=>{
            return <TrashedFiles file={file}/>
        
          })
        }


      </div></>
  )
}

export default Trash 
