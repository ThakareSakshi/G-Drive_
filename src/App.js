import { signInWithPopup,getAuth } from "firebase/auth";
import Home from "./Pages/Home";
import { provider } from "./firebase/Firebase";
import FileContext, { FileCtx } from "./Context/FileContext";
import Autheticate from "./Pages/Autheticate";
import { useContext, useEffect, useState } from "react";

function App() {
  const ctx=useContext(FileCtx);
  const [users, setUser] = useState(JSON.parse(localStorage.getItem("user"))  ||null);
  const auth=getAuth();
 
  const signIn = () => {
    signInWithPopup(auth, provider)
            .then(({ user }) => {
              setUser(user);
              localStorage.setItem("user",JSON.stringify(user));
              console.log(user);
              
            })
            .catch(err => alert(err))
  }


  return (
   <FileContext>
     <div className="">
    
   {
    users ?( <Home profile={users.photoURL}/>): <Autheticate signin={signIn}/>
   }
    </div>
   </FileContext>
  );
}

export default App;
