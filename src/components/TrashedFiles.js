
import { doc, collection ,deleteDoc,addDoc} from "firebase/firestore";
import { db } from "../fireData/Firebase";
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import { serverTimestamp
 } from "firebase/firestore";
 import RestoreIcon from '@mui/icons-material/Restore';
import { useContext } from "react";
import FileContext, { FileCtx } from "../Context/FileContext";
import MoreVertIcon from '@mui/icons-material/MoreVert';


const TrashedFiles = ({file}) => {

  const ctx=useContext(FileCtx);

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
      className=" group grid grid-cols-5 w-full justify-between p-4 border-b-[1px] border-gray-200 px-4"
      key={file.id}
    >
      <p className="text-[15px] text-left flex items-center gap-1">
    
        <a href={file.data.fileURL}><InsertDriveFileIcon style={{color:"#5591F5" ,marginRight:"10px"}}/>{file.data.filename}</a>
      </p>
      <p className="text-[15px] text-right max-md:hidden flex items-center justify-end"><img src={ctx.photo} className="h-6 mr-2 rounded-full"/>Me</p>
      <p className="text-[15px] text-right max-md:hidden"> {formatTimestamp(file.data.timestamp)} </p>
      <p className="text-[15px] text-right">{changeBytes(file.data.size)} </p>
      <span className="cursor-pointer text-right hover:text-purple-800 flex items-center justify-end" onClick={restoreFile}>
           <div className="group-hover:block hidden">
           <RestoreIcon/>
           </div>
           <MoreVertIcon/>
        </span>
      
    </div>
  )
}

export default TrashedFiles
