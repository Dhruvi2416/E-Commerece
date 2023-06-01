import {getApp,getApps,initializeApp} from 'firebase/app';
import {getFirestore} from 'firebase/firestore';
import {getStorage} from "firebase/storage"
import {  query, collection,getDocs, orderBy } from 'firebase/firestore';
const firebaseConfig = {
  apiKey: "AIzaSyD5e5u7R32B3t0xgiWJs898YaL8u9do75I",
  authDomain: "e-commerceapp-d495e.firebaseapp.com",
  databaseURL: "https://e-commerceapp-d495e-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "e-commerceapp-d495e",
  storageBucket: "e-commerceapp-d495e.appspot.com",
  messagingSenderId: "590921280670",
  appId: "1:590921280670:web:38cbec5b537f902ca81f8f",
  measurementId: "G-6M20H6CLMP"
    // apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    // authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
    // databaseURL: process.env.REACT_APP_FIREBASE_DB_URL,
    // projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID ,
    // storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
    // messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_ID ,
    // appId: process.env.REACT_APP_FIREBASE_APP_ID,
    // measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID
  };
  

  
export const getAllItems = async ()=>{
  const items = await getDocs(
    query(collection(firestore,"shoppingitems"),orderBy("id","desc"))
  );
  
  return items.docs.map((doc)=>doc.data())

}

  
  const app =getApps.length > 0 ? getApp(): initializeApp(firebaseConfig);
  const firestore = getFirestore(app)
  const storage = getStorage(app)
  export {app,firestore, storage}