import React from 'react'
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import { db } from '../fireData/Firebase';
import { useState,useEffect } from 'react';
import { onSnapshot,collection } from 'firebase/firestore';
import File from '../components/File';
import GradeIcon from '@mui/icons-material/Grade';
import FileCard from '../components/FileCard';
import TableHeader from '../components/TableHeader';

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
            return <File file={file}/>
        
          })
        }


      </div></>
  )
}

export default MyDrive
