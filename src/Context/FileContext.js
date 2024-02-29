import { createContext,useContext,useState } from "react";
import React from 'react'
import MyDrive from "../Pages/MyDrive";

export const FileCtx=createContext();



const FileContext = (props) => {
    const [currentPage,setCurrentPage]=useState(<MyDrive/>)
    const [photo,setPhoto]=useState("user.jpg");
   

    const data={
      currentPage,
      setCurrentPage,
      photo, 
      setPhoto 
    }
  return (
   <FileCtx.Provider value={data}>
    {props.children}
   </FileCtx.Provider>
  )
}

export default FileContext;
