import {getApp,getApps,initializeApp} from 'firebase/app';
import {getFirestore} from 'firebase/firestore';
import {getStorage} from "firebase/storage"

const firebaseConfig = {
    apiKey: "AIzaSyD5e5u7R32B3t0xgiWJs898YaL8u9do75I",
    authDomain: "e-commerceapp-d495e.firebaseapp.com",
    databaseURL: "https://e-commerceapp-d495e-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "e-commerceapp-d495e",
    storageBucket: "e-commerceapp-d495e.appspot.com",
    messagingSenderId: "590921280670",
    appId: "1:590921280670:web:38cbec5b537f902ca81f8f",
    measurementId: "G-6M20H6CLMP"
  };
  
  const app =getApps.length > 0 ? getApp(): initializeApp(firebaseConfig);
  const firestore = getFirestore(app)
  const storage = getStorage(app)
  export {app,firestore, storage}