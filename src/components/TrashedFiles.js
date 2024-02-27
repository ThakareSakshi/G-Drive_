import React from "react";
import GradeIcon from "@mui/icons-material/Grade";
import { doc, updateDoc, collection ,deleteDoc,addDoc} from "firebase/firestore";
import { db } from "../firebase/Firebase";
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { serverTimestamp
 } from "firebase/firestore";
 import RestoreIcon from '@mui/icons-material/Restore';


const TrashedFiles = ({file}) => {

    async function restoreFile() {

        try{
            await addDoc(collection(db, "myfiles"), {
                timestamp: serverTimestamp(),
                filename: file.data.filename,
                fileURL: file.data.fileURL,
                size: file.data.size,
                starred:false,
            });
        
            const docRef = doc(db, "trash", file.id); // Assuming "myfiles" is the collection name
            try {
                await deleteDoc(docRef);
                console.log("Document successfully deleted!");
            } catch (error) {
                console.error("Error deleting document: ", error);
            }
        }catch(e){
            console.log("error",e)
        }
    }
    
    
    
      const changeBytes = (bytes, decimals = 2) => {
        if (bytes === 0) return "0 Bytes";
        const k = 1024;
        const dm = decimals < 0 ? 0 : decimals;
        const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
      };
    
      function formatTimestamp(timestamp) {
        const milliseconds =timestamp.seconds * 1000 + timestamp.nanoseconds / 1000000;
    
        const date = new Date(milliseconds);
    
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, "0"); // Month is zero-based
        const day = String(date.getDate()).padStart(2, "0");
    
        const hours = String(date.getHours()).padStart(2, "0");
        const minutes = String(date.getMinutes()).padStart(2, "0");
        const seconds = String(date.getSeconds()).padStart(2, "0");
    
        const formattedDateTime = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    
        return formattedDateTime;
      }
  return (
    <div
      className="flex w-full justify-between p-4 border-b-[1px] border-gray-200 px-4"
      key={file.id}
    >
      <p className="text-[13px] text-center flex items-center gap-1">
    
        <a href={file.data.fileURL}>{file.data.filename}</a>
      </p>
      <p className="text-[13px] text-center max-md:hidden">owner</p>
      <p className="text-[13px] text-center max-md:hidden">
        {formatTimestamp(file.data.timestamp)}
      </p>
      <p className="text-[13px] text-center flex items-center gap-2">{changeBytes(file.data.size)}
        <div className="cursor-pointer" >
            <RestoreIcon/>
        </div>
      </p>
    </div>
  )
}

export default TrashedFiles
