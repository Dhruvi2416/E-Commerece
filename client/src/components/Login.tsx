import React, { useEffect,useState } from "react";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  User,
} from "firebase/auth";
import { app } from "../firebase.config";

import { handleUserEMail,handleUserPhotUrl } from "../redux-toolkit/product/productSlice";
import { RootState } from "../redux-toolkit/store";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { log } from "console";

const Login = () => {
  const loggedIn = useSelector((state: RootState) => state.product.userEmail);
 const[isUser,setIsUser]= useState<null | User>(null);
  const dispatch = useDispatch();
  // login with google provided by firebase signin with google
  const provider = new GoogleAuthProvider();
  // initialize Authentication service to the following app
  const firebaseAuth = getAuth(app);

  const loginFunction = async () => {
    console.log("Hi");
    try {
      const providerWithParams = provider.setCustomParameters({
        prompt: "select_account",
      });
  
      const response = await signInWithPopup(firebaseAuth, providerWithParams);
      console.log("response", response);
      console.log("response.user",response.user)
  //  setIsUser(response.user)
      dispatch(handleUserEMail(response.user.email!));
      dispatch(handleUserPhotUrl(response.user.photoURL!))
    } catch (error) {
      // Handle the unknown error case
      console.log("dhruvi", error);
      // Display a generic error message or perform any other action
    }
  };
  

  useEffect(() => {
    if (!loggedIn) {
      loginFunction();
      console.log("react")
    }
  }, []);
  console.log(loggedIn);
  return (
    <div className="mt-44">
      <div></div>
    </div>
  );
};

export default Login;
