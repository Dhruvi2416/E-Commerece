import { MdShoppingBasket, MdAdd, MdLogout } from "react-icons/md";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  UserCredential,
} from "firebase/auth";
import { app } from "../firebase.config";
import { useState } from "react";

const Header = () => {
  const [isMenu, setIsMenu] = useState(false);
  const [isUser, setUser] = useState<UserCredential | null>(
    localStorage.getItem("login")
      ? JSON.parse(localStorage.getItem("login")!)
      : null
  );
  // login with google provided by firebase signin with google
  const provider = new GoogleAuthProvider();
  // initialize Authentication service to the following app
  const firebaseAuth = getAuth(app);
  const login = async () => {
    if (isUser === null) {
      // const response = await signInWithPopup(firebaseAuth, provider): This line attempts to sign in the user using a popup window provided by Firebase Authentication. It calls the signInWithPopup() function, passing in the firebaseAuth instance (Firebase Authentication service) and the provider instance (Google authentication provider).
      const response = await signInWithPopup(firebaseAuth, provider);
   
      setUser(response);
    }
    setIsMenu(!isMenu);
  };

  const signIn = () => {
    setIsMenu(!isMenu);
  };

  // if the user is loggedIn then set all the credentials to the localStorage basically conditioned that null is not being displayed
  if (isUser) localStorage.setItem("login", JSON.stringify(isUser));
  // photo URL
  const photo = isUser?.user.photoURL;

  // logout
  const logout = () => {
    console.log("Hi");
    setUser(null);
    setIsMenu(false);
    localStorage.clear();
  };
  return (
    <header className="fixed z-50 w-screen p-6 px-16">
      {/* desktop & tablet */}
      <div className="hidden md:flex items-center w-full h-full justify-between">
        <Link to={"/"} className="flex flex-col gap-2">
          <img
            className="w-20 object-cover rounded-full"
            src="/assets/logo.png"
            alt=""
          />
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
            <div className="absolute -top-4 -right-2 w-5 h-5 rounded-full bg-pink-600 flex items-center justify-center">
              <p className="text-xs text-white font-semibold">0</p>
            </div>
          </div>
          <div className="relative">
            {/* here if user is not loggedIn then display a avatar img else display user's profile */}
            <motion.img
              whileTap={{ scale: 0.6 }}
              className="w-10 min-w-[40px] h-10 min-h-[40px] cursor-pointer rounded-full"
              src={isUser ? photo! : "/assets/avatar.png"}
              alt="user"
              onClick={signIn}
            />
            {isUser && isMenu && (
              <div className="w-40 bg-gray-50 shadow-2xl  rounded-lg flex flex-col absolute px-4 py-2 top-12 right-0">
                {/* if user is admin here I am admin with my e-mail id then only allow to create new item for adding */}
                {isUser?.user.email === "dhruvikalpesh2001@gmail.com" && (
                  <Link to="/createItem">
                    <ul>
                      <li className="px-4 py-2 flex items-center gap-3 cursor-pointer hover:bg-slate-100 transition-all duration-100 ease-in-out text-textColor text-base">
                        New Item <MdAdd />
                      </li>
                    </ul>
                  </Link>
                )}

                <p
                  className="px-4 py-2 flex items-center gap-3 cursor-pointer bg-gray-200 justify-center rounded-md shadow-md hover:bg-slate-300 transition-all duration-100 ease-in-out text-textColor text-base"
                  onClick={logout}
                >
                  Logout <MdLogout />
                </p>
              </div>
            )}
            {!isUser && isMenu && (
              <ul>
                <div className="w-64 bg-gray-50 shadow-2xl shadow-black rounded-lg flex flex-col absolute px-4 py-2 top-12 -right-12 gap-3">
                  {/* if user is admin here I am admin with my e-mail id then only allow to create new item for adding */}

                  <li
                    className="py-2 flex items-center gap-3 cursor-pointer bg-gray-200 justify-center rounded-md shadow-md hover:bg-slate-300 transition-all duration-100 ease-in-out text-textColor text-base"
                    onClick={login}
                  >
                    Login With Same account
                    <MdLogout />
                  </li>

                  <li
                    className="px-2 py-2 flex items-center gap-3 cursor-pointer bg-gray-200 justify-center rounded-md shadow-md hover:bg-slate-300 transition-all duration-100 ease-in-out text-textColor text-base"
                    // onClick={logout}
                  >
                    Login With different Account <MdLogout />
                  </li>

               
                </div>
              </ul>
            )}{" "}
          </div>
        </div>
      </div>
      {/* mobile */}
      <div className="flex md:hidden w-full h-full justify-between items-center">
        <div className="relative flex">
          <MdShoppingBasket className="text-textColor text-2xl  cursor-pointer hover:text-headingColor " />
          <div className="absolute -top-4 -right-2 w-5 h-5 rounded-full bg-pink-600 flex items-center justify-center">
            <p className="text-xs text-white font-semibold">0</p>
          </div>
        </div>

       
          <Link to={"/"} className="flex  gap-2">
            <img
              className="w-14 object-cover rounded-full"
              src="/assets/logo.png"
              alt="logo"
            />
          </Link>
      

        <div className="relative">
          {/* here if user is not loggedIn then display a avatar img else display user's profile */}
          <motion.img
            whileTap={{ scale: 0.6 }}
            className="w-10 min-w-[40px] h-10 min-h-[40px] cursor-pointer rounded-full"
            src={isUser ? photo! : "/assets/avatar.png"}
            alt="user"
            onClick={signIn}
          />
          {isUser && isMenu && (
            <ul className="flex gap-8">
              <div className="w-40 bg-gray-50 shadow-xl rounded-lg flex flex-col absolute px-4 py-2 top-12 -right-12">
                {/* if user is admin here I am admin with my e-mail id then only allow to create new item for adding */}

                {isUser.user.email === "dhruvikalpesh2001@gmail.com" && (
                  <Link to="/createItem">
                    <li className="py-2 flex items-center gap-3 cursor-pointer hover:bg-slate-100 transition-all duration-100 ease-in-out text-textColor text-base">
                      New Item <MdAdd />
                    </li>
                  </Link>
                )}
                <Link
                  to={"/"}
                  className="py-2 flex items-center gap-3 cursor-pointer hover:bg-slate-100 transition-all duration-100 ease-in-out text-textColor text-base"
                >
                  Home
                </Link>
                <li className="py-2 flex items-center gap-3 cursor-pointer hover:bg-slate-100 transition-all duration-100 ease-in-out text-textColor text-base">
                  Menu
                </li>
                <li className="py-2 flex items-center gap-3 cursor-pointer hover:bg-slate-100 transition-all duration-100 ease-in-out text-textColor text-base">
                  About Us
                </li>
                <li className="py-2 flex items-center gap-3 cursor-pointer hover:bg-slate-100 transition-all duration-100 ease-in-out text-textColor text-base">
                  Service
                </li>

                <li
                  className="px-4 py-2 flex items-center gap-3 cursor-pointer bg-gray-200 justify-center rounded-md shadow-md hover:bg-slate-300 transition-all duration-100 ease-in-out text-textColor text-base"
                  onClick={logout}
                >
                  LogOut <MdLogout />
                </li>
              </div>
            </ul>
          )}{" "}
          {!isUser && isMenu && (
            <ul className="flex gap-8">
              <div className="w-64 bg-gray-50 shadow-2xl shadow-black rounded-lg flex flex-col absolute px-4 py-2 top-12 -right-10 gap-3 ">
                {/* if user is admin here I am admin with my e-mail id then only allow to create new item for adding */}

                <li
                  className="px-4 py-2 flex items-center gap-3 cursor-pointer bg-gray-200 justify-center rounded-md shadow-md hover:bg-slate-300 transition-all duration-100 ease-in-out text-textColor text-base"
                  onClick={login}
                >
                  Login With Same account
                  <MdLogout />
                </li>

                <li
                  className="px-4 py-2 flex items-center gap-3 cursor-pointer bg-gray-200 justify-center rounded-md shadow-md hover:bg-slate-300 transition-all duration-100 ease-in-out text-textColor text-base"
                  // onClick={logout}
                >
                  Login With different Account <MdLogout />
                </li>
              </div>
            </ul>
          )}{" "}
        </div>
      </div>
    </header>
  );
};

export default Header;
