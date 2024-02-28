import { signInWithPopup,getAuth } from "firebase/auth";
import Home from "./Pages/Home";
import { provider } from "./firebase/Firebase";
import FileContext, { FileCtx } from "./Context/FileContext";
import Autheticate from "./Pages/Autheticate";
import { useContext, useState } from "react";

function App() {

  const [user, setUser] = useState(null);
  const auth=getAuth();
  const ctx=useContext(FileCtx);
  const signIn = () => {
    signInWithPopup(auth, provider)
            .then(({ users }) => {
              setUser(users);
              console.log(users);
              ctx.setphoto(users.photoURL);
            })
            .catch(err => alert(err))
  }
  return (
   <FileContext>
     <div className="">
    
   {
    user ?( <Home profile={user.photoURL}/>): <Autheticate signin={signIn}/>
   }
    </div>
   </FileContext>
  );
}

export default App;
