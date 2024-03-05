import React from 'react'
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import { db } from '../fireData/Firebase';
import { useState,useEffect } from 'react';
import { onSnapshot,collection } from 'firebase/firestore';
import TrashedFiles from '../components/TrashedFiles';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import TableHeader from '../components/TableHeader';
import FileCard from '../components/FileCard';

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
      <div className='flex flex-wrap'>
        {
          files.map(file=>{
            return <FileCard key={file.id} file={file}/>
          })
        }

       
      </div>
    
      <div>
      <TableHeader/>
        {
         files.map(file=>{
            return <TrashedFiles  key={file.id} file={file}/>
        
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
