import React,{useEffect} from 'react'
import {
    getAuth,
    signInWithPopup,
    GoogleAuthProvider,
    UserCredential,
  } from "firebase/auth";
  import { app } from "../firebase.config";

  import { handleLoggedIn } from '../redux-toolkit/product/productSlice';
  import { RootState } from '../redux-toolkit/store';
  import { useDispatch, useSelector } from 'react-redux';
  import { useNavigate } from 'react-router-dom';

const loggedIn =useSelector((state:RootState)=>state.product.isLoggedIn)

const Login = () => {
    const dispatch = useDispatch();
    // login with google provided by firebase signin with google
  const provider = new GoogleAuthProvider();
  // initialize Authentication service to the following app
  const firebaseAuth = getAuth(app);
  useEffect(
    async () => {try {
        if (loggedIn === null) {
          const response = await signInWithPopup(
            firebaseAuth,
            provider.setCustomParameters({
              prompt: "select_account",
            })
          );
  
        
          dispatch(handleLoggedIn(response));
        }
     
      } catch (error) {
        // Handle the unknown error case
        console.log("Sign-in error:", error);
        // Display a generic error message or perform any other action
      }}
    
    
    , []);
    
  return (
    <div>Login</div>
  )
}

export default Login