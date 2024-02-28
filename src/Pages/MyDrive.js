import React from 'react'
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import { db } from '../firebase/Firebase';
import { useState,useEffect } from 'react';
import { onSnapshot,collection } from 'firebase/firestore';
import File from '../components/File';
import GradeIcon from '@mui/icons-material/Grade';

const MyDrive = () => {

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

 
  return (
   <>
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
        <div className=' w-full grid grid-cols-5  p-2 border-b-2 border-gray-200 px-4'>
            <p  className='text-sm font-medium text-left'>Name <ArrowDownwardIcon/></p>
            <p className='text-sm font-medium max-md:hidden text-right'>Owner</p>
            <p className='text-sm font-medium max-md:hidden text-right'>Last Modified</p>
            <p className='text-sm font-medium text-right'>Size</p>
            <p className='text-sm font-medium text-right'>action</p>

        </div>
        {
          files.map(file=>{
            return <File file={file}/>
        
          })
        }


      </div></>
  )
}

export default MyDrive
