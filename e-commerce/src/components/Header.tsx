import { MdShoppingBasket, MdAdd,MdLogout } from "react-icons/md";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { app } from "../firebase.config";
import { useState } from "react";
const Header = () => {
  const[isMenu,setIsMenu]= useState(false)
  // login with google provided by firebase signin with google
  const provider = new GoogleAuthProvider();
  // initialize Authentication service to the following app
  const firebaseAuth = getAuth(app);
  const login = async () => {
    setIsMenu(!isMenu)
    // const response = await signInWithPopup(firebaseAuth, provider): This line attempts to sign in the user using a popup window provided by Firebase Authentication. It calls the signInWithPopup() function, passing in the firebaseAuth instance (Firebase Authentication service) and the provider instance (Google authentication provider).
    // const response = await signInWithPopup(firebaseAuth, provider);
    // console.log(response);
  };
  return (
    <header className="fixed z-50 w-screen p-6 px-16">
      {/* desktop & tablet */}
      <div className="hidden md:flex items-center w-full h-full justify-between">
        <Link to={"/"} className="flex gap-2">
          <img className="w-20 object-cover" src="/assets/logo.png" alt="" />
        </Link>
        <div className="flex items-center gap-8">
          <ul className="flex gap-8">
            <li className="text-base text-textColor hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer">
              Home
            </li>
            <li className="text-base text-textColor hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer">
              Cart
            </li>
            <li className="text-base text-textColor hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer">
              Payment
            </li>
          </ul>
          {/* MdShoppingBasket is a react icon for cart */}
          <div className="relative flex">
            <MdShoppingBasket className="text-textColor text-2xl  cursor-pointer hover:text-headingColor " />
            <div className="absolute -top-4 -right-2 w-5 h-5 rounded-full bg-cartNumBg flex items-center justify-center">
              <p className="text-xs text-white font-semibold">0</p>
            </div>
          </div>
          <div className="relative">
            <motion.img
              whileTap={{ scale: 0.6 }}
              className="w-10 min-w-[40px] h-10 min-h-[40px] drop-shadow-xl cursor-pointer"
              src="/assets/avatar.png"
              alt="user"
              onClick={login}
            />
            {isMenu && <div className="w-40 bg-gray-50 shadow-xl rounded-lg flex flex-col absolute px-4 py-2 top-12 right-0">
           {/* {user && userEvent.email==="dhruvikalpesh2001@gmail.com" && */}
           <Link to="/createItem"><p className="px-4 py-2 flex items-center gap-3 cursor-pointer hover:bg-slate-100 transition-all duration-100 ease-in-out text-textColor text-base">New Item <MdAdd/></p></Link>
           {/* } */}
           
            
            <p className="px-4 py-2 flex items-center gap-3 cursor-pointer hover:bg-slate-100 transition-all duration-100 ease-in-out text-textColor text-base"> Logout <MdLogout/></p>
          </div>}
          </div>
          
        </div>
      </div>
      {/* mobile */}
      <div className="flex md:hidden w-full h-full"></div>
    </header>
  );
};

export default Header;
