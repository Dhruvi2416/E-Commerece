import {getApp,getApps,initializeApp} from 'firebase/app';
import {getFirestore} from 'firebase/firestore';
import {getStorage} from "firebase/storage"

const firebaseConfig = {
  apiKey: "AIzaSyDyAQ_QgW-5CIYw7X_v4GW-vRlzpHtnIBk",
  authDomain: "e-commerce-42687.firebaseapp.com",
  databaseURL: "https://e-commerce-42687-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "e-commerce-42687",
  storageBucket: "e-commerce-42687.appspot.com",
  messagingSenderId: "579632733108",
  appId: "1:579632733108:web:4557fe71ea849d651530e1",
  measurementId: "G-ENT1VGVMYL"
};
    // apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    // authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
    // databaseURL: process.env.REACT_APP_FIREBASE_DB_URL,
    // projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID ,
    // storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
    // messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_ID ,
    // appId: process.env.REACT_APP_FIREBASE_APP_ID,
    // measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID
  
  



  
  const app =getApps.length > 0 ? getApp(): initializeApp(firebaseConfig);
  const firestore = getFirestore(app)
  const storage = getStorage(app)
  export {app,firestore, storage}