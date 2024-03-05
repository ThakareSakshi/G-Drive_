import React from 'react'

import { db } from '../fireData/Firebase';
import { useState,useEffect } from 'react';
import { onSnapshot,collection } from 'firebase/firestore';
import File from '../components/File';
import FileCard from '../components/FileCard';
import TableHeader from '../components/TableHeader';

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
    starredList.length >0 ?(<><div className='flex flex-wrap'>
    {
      starredList.map(file=>{
        return <FileCard key={file.id} file={file}/>
      })
    }

   
  </div>

  <div>
   <TableHeader/>
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
