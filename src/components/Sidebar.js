import React, { useContext, useState } from 'react'
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import DriveFolderUploadOutlinedIcon from '@mui/icons-material/DriveFolderUploadOutlined';
import DevicesOutlinedIcon from '@mui/icons-material/DevicesOutlined';
import GroupOutlinedIcon from '@mui/icons-material/GroupOutlined';
import ScheduleOutlinedIcon from '@mui/icons-material/ScheduleOutlined';
import StarBorderOutlinedIcon from '@mui/icons-material/StarBorderOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import CloudQueueOutlinedIcon from '@mui/icons-material/CloudQueueOutlined';
import { Modal } from '@mui/material';
import {db, firestore, storage} from "../firebase/Firebase";
import { uploadBytesResumable,getDownloadURL, } from 'firebase/storage';
import { collection,addDoc } from 'firebase/firestore';
import { serverTimestamp } from 'firebase/firestore';
import { ref, uploadBytes } from 'firebase/storage';
import { FileCtx } from '../Context/FileContext';
import MyDrive from '../Pages/MyDrive';
import Starred from '../Pages/Starred';
import Trash from '../Pages/Trash';
// import firebase from "firebase"

const Sidebar = () => {
    const [isOpen,setISOpen]=useState(false);
    const [uploading,setUploading]=useState(false);
    const [file,setFile]=useState(null);
    const ctx=useContext(FileCtx);

    const handleFile=(e)=>{
      if(e.target.files[0]){
        setFile(e.target.files[0])
      }
    }

    const handleUpload=async(e)=>{
     e.preventDefault();
     setUploading(true);
     const storageRef = ref(storage, `files/${file.name}`);
     try {
         const uploadTaskSnapshot = await uploadBytesResumable(storageRef, file);
 
         // Get the download URL
         const downloadURL = await getDownloadURL(uploadTaskSnapshot.ref);
 
         // Add file details to Firestore
         await addDoc(collection(db, "myfiles"), {
             timestamp: serverTimestamp(),
             filename: file.name,
             fileURL: downloadURL,
             size: uploadTaskSnapshot.totalBytes,
             starred:false
         });
 
         // Reset state
         setUploading(false);
         setFile(null);
         setISOpen(false);
     } catch (error) {
         console.error("Error uploading file: ", error);
         // Handle error
     }
    }
  return (
    <>
    <Modal open={isOpen} onClose={()=>setISOpen(false)} >
    <div className=' min-w-80  bg-white absolute top-[35%] left-[35%]  '>
        <h2 className='text-center border-b-[1px] border-solid border-gray-200 h-10 p-2 font-medium capitalize'>select the file</h2>
        <div className='w-full p-4 uppercase rounded-md cursor-pointer mt-2'>
            <form onSubmit={handleUpload}>
              {
                uploading ? <div className='text-center capitalize'>uploading ...</div>:
                <><input type='file' className='p-5 block mt-2' onChange={handleFile}/>
                <button type='submit' className='p-2 bg-fuchsia-900 text-white px-4 rounded-full w-full'>Upload</button></>
              }
            </form>
        </div>
    </div>

    </Modal>
    <div className='w-1/6 flex flex-col item-center gap-2 px-2 justify-start bg-[#F8FAFD] max-md:hidden h-screen '>
        <div className='shadow-lg rounded-full p-4 px-6 w-fit cursor-pointer' onClick={()=>setISOpen(true)}>
           <AddOutlinedIcon/>
            <span className='p-2'>New</span>
        </div>
        <div className='flex gap-4 items-center px-2 cursor-pointer hover:bg-blue-400 hover:rounded-full py-2'>
            <DriveFolderUploadOutlinedIcon/>
            <span className='text-sm text-[#1f1f1f] ' onClick={()=>{ctx.setCurrentPage(<MyDrive/>)}}>My Drive</span>
        </div>
        <div className='flex gap-4 items-center p-2 cursor-pointer hover:bg-blue-400 hover:rounded-full'>
            <DevicesOutlinedIcon/>
            <span className='text-sm text-[#1f1f1f]'>Computers</span>
        </div>
        <div className='flex gap-4 items-center p-2 cursor-pointer hover:bg-blue-400 hover:rounded-full'>
            <GroupOutlinedIcon/>
            <span className='text-sm text-[#1f1f1f]'>Shared with Me</span>
        </div>
        <div className='flex gap-4 items-center p-2 cursor-pointer hover:bg-blue-400 hover:rounded-full'>
            <ScheduleOutlinedIcon/>
            <span className='text-sm text-[#1f1f1f]'>Recent</span>
        </div>
        <div className='flex gap-4 items-center p-2 cursor-pointer hover:bg-blue-400 hover:rounded-full'>
            <StarBorderOutlinedIcon/>
            <span className='text-sm text-[#1f1f1f]' onClick={()=>{ctx.setCurrentPage(<Starred/>)}}>Starred</span>
        </div>
        <div className='flex gap-4 items-center p-2 cursor-pointer hover:bg-blue-400 hover:rounded-full'>
            <DeleteOutlineOutlinedIcon/>
            <span className='text-sm text-[#1f1f1f]' onClick={()=>{ctx.setCurrentPage(<Trash/>)}}>Trash</span>
        </div>
        <hr/>
        <div className='flex gap-4 items-center px-2'>
            <CloudQueueOutlinedIcon/>
            <span className='text-sm text-[#1f1f1f]'>Storage</span>
            
        </div>
       
        <div>
       <div className='h-2 w-full bg-gray-200 border-[1px] border-solid border-gray-300 rounded-full overflow-hidden '>
        <div className='bg-blue-500 h-full w-1/6'></div>
       </div>
        <div>
            <span className='text-[13px] text-[#1f1f1f]'>2.07 GB of 15GB Used</span>
        </div>
        </div>
      
    </div>
    </>
  )
}

export default Sidebar
