// Import the functions you need from the SDKs you need
import { initializeApp ,getApp} from "firebase/app";
import {getFirestore} from "firebase/firestore"
import {getStorage} from "firebase/storage"
import {getAuth} from "firebase/storage"


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD6JDyC8if72mTkLn34bj8QMyZMzP_uuRQ",
  authDomain: "g-drive-98016.firebaseapp.com",
  projectId: "g-drive-98016",
  storageBucket: "g-drive-98016.appspot.com",
  messagingSenderId: "448704675510",
  appId: "1:448704675510:web:59c2dce93b87e16c89f017"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db=app.firestore();
const storage=app.storage();
const auth=app.auth();
const provider=new app.auth.GoogleAuthProvider();

export {db ,storage,auth,provider}
