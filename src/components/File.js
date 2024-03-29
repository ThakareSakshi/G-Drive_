import React, { useContext } from "react";
import GradeIcon from "@mui/icons-material/Grade";
import {
  doc,
  updateDoc,
  collection,
  deleteDoc,
  addDoc,
} from "firebase/firestore";
import { db } from "../fireData/Firebase";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import LinkIcon from "@mui/icons-material/Link";
import { serverTimestamp } from "firebase/firestore";
import { FileCtx } from "../Context/FileContext";

const File = ({ file }) => {
  const ctx = useContext(FileCtx);

  const shareFile = () => {
    console.log(file.data.fileURL);
    navigator.clipboard.writeText(file.data.fileURL);
    alert("link copied !");
  };

  const handleStarred = async () => {
    const docRef = doc(db, "myfiles", file.id); // Assuming "myfiles" is the collection name
    try {
      await updateDoc(docRef, {
        starred: !file.data.starred,
      });
      console.log("Document successfully updated!", file.data.starred);
    } catch (error) {
      console.error("Error updating document: ", error);
    }
  };

  async function deleteFile() {
    if (!file.data.starred) {
      await addDoc(collection(db, "trash"), {
        timestamp: serverTimestamp(),
        filename: file.data.filename,
        fileURL: file.data.fileURL,
        size: file.data.size,
        starred: false,
      });

      const docRef = doc(db, "myfiles", file.id); // Assuming "myfiles" is the collection name
      try {
        await deleteDoc(docRef);
        console.log("Document successfully deleted!");
      } catch (error) {
        console.error("Error deleting document: ", error);
      }
    } else {
      alert("you cannot delete starred files");
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
    const milliseconds =
      timestamp.seconds * 1000 + timestamp.nanoseconds / 1000000;

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
      className="group grid grid-cols-5 w-full  p-4 border-b-[1px] border-gray-200 px-4 max-md:grid-cols-3 cursor-pointer"
      key={file.id}
    >
      <p className="text-[15px] text-left flex items-center gap-1">
        <a href={file.data.fileURL} className="">
          <InsertDriveFileIcon
            style={{ color: "#5591F5", marginRight: "10px" }}
          />
          {file.data.filename}
        </a>
      </p>
      <p className="text-[15px] text-right max-md:hidden flex items-center justify-end">
        <img src={ctx.photo} className="h-6 mr-2 rounded-full" />
        Me
      </p>
      <p className="text-[15px] text-right max-md:hidden">
        {file.data.timestamp ? formatTimestamp(file.data.timestamp) : null}
      </p>
      <p className="text-[15px] text-right">{changeBytes(file.data.size)}</p>

      <div className="gap-2 justify-end flex">

        <div onClick={handleStarred} className="group-hover:block hidden">
          {file.data.starred ? (
            <GradeIcon style={{ fontSize: "20px", color: "gold" }} />
          ) : (
            <GradeIcon style={{ fontSize: "20px", color: "gray" }} />
          )}
        </div>

        <div  className="group-hover:block hidden" onClick={shareFile}>
          <LinkIcon style={{ color: "gray" }} />
        </div>


        <div className="cursor-pointer text-right group-hover:block hidden" onClick={deleteFile}>
          <DeleteOutlineIcon style={{ color: "gray" }} />
        </div>
        <MoreVertIcon/>

      </div>
    </div>
  );
};

export default File;
