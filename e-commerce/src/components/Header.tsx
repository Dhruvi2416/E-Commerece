import { MdShoppingBasket, MdAdd, MdLogout } from "react-icons/md";
import {  AiFillHome} from "react-icons/ai";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";

import { useState } from "react";
import { useSelector } from "react-redux";
import type { RootState } from "../redux-toolkit/store";
import { useNavigate } from "react-router-dom";
import {
  
  handleLoggedOut,
} from "../redux-toolkit/product/productSlice";
import { useDispatch } from "react-redux";

const Header = () => {
  const email = useSelector((state: RootState) => state.product.userEmail);
const photoUrl = useSelector((state:RootState)=> state.product.userPhotoUrl)
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const addProduct = useSelector((state: RootState) => state.product.cartList);
  const [isMenu, setIsMenu] = useState(false);

  const login = () => {
    setIsMenu(!isMenu);
    navigate("/login");
  };

  const signIn = () => {
    setIsMenu(!isMenu);
  };

  // if the user is loggedIn then set all the credentials to the localStorage basically conditioned that null is not being displayed

  // photo URL

  // logout

  const logout = () => {
    setIsMenu(false);

    dispatch(handleLoggedOut());
    navigate("/home");
  };
  const location = useLocation();
  const routeName = location.pathname;
  console.log(routeName);
  return (
    <header className="fixed z-50 w-screen p-6  bg-primary ">
      {/* desktop & tablet */}
      <div className="hidden md:flex items-center w-full h-full justify-between">
        <img
          className="w-20 object-cover rounded-full"
          src="/assets/logo.png"
          alt=""
        />

        <div className="flex items-center gap-8">
          <ul className="flex gap-8">
            {routeName !== "/home" && (
              <Link to="/home" className="flex flex-col gap-2">
                <li className="text-base text-textColor hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer">
                  Home

                </li>
              
              </Link>
            )}
            {routeName !== "/payment" && routeName !== "/login" && email && (
              <li
                className="text-base text-textColor hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer"
                onClick={() => navigate("/payment")}
              >
                Payment
              </li>
            )}
          </ul>
          {/* MdShoppingBasket is a react icon for cart */}
          {routeName !== "/payment" && routeName !== "/login" && (
            <div className="relative flex">
              <MdShoppingBasket
                className="text-textColor text-2xl  cursor-pointer hover:text-headingColor "
                onClick={() => navigate("/cart")}
              />
              <div className="absolute -top-4 -right-2 w-5 h-5 rounded-full bg-pink-600 flex items-center justify-center">
                <p className="text-xs text-white font-semibold">
                  {addProduct.length}
                </p>
              </div>
            </div>
          )}
          <div className="relative">
            {/* here if user is not loggedIn then display a avatar img else display user's profile */}
            <motion.img
              whileTap={{ scale: 0.6 }}
              className="w-10 min-w-[40px] h-10 min-h-[40px] cursor-pointer rounded-full"
              src={email ? photoUrl! : "/assets/avatar.png"}
              alt="user"
              onClick={signIn}
            />
            {email && isMenu && (
              <div className="w-40 z-50 bg-gray-50 shadow-2xl border-2 rounded-lg flex flex-col absolute px-4 py-2 top-12 -right-4">
                {/* if user is admin here I am admin with my e-mail id then only allow to create new item for adding */}
                {email === process.env.REACT_APP_ADMIN_EMAIL &&
                  routeName !== "/createItem" &&
                  routeName !== "/login" && (
                    <Link to="/createItem">
                      <ul>
                        <li
                          className="px-2 py-2 flex items-center gap-3 cursor-pointer hover:bg-slate-100 transition-all duration-100 ease-in-out text-textColor text-base"
                          onClick={() => setIsMenu(false)}
                        >
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
            {!email && isMenu && (
              <ul>
                <div className="w-40 bg-gray-50 shadow-2xl shadow-black rounded-lg flex flex-col absolute px-4 py-2 top-12 -right-4 gap-3">
                  {/* if user is admin here I am admin with my e-mail id then only allow to create new item for adding */}

                  <li
                    className="py-2 flex items-center gap-3 cursor-pointer bg-gray-200 justify-center rounded-md shadow-md hover:bg-slate-300 transition-all duration-100 ease-in-out text-textColor text-base"
                    onClick={login}
                  >
                    Login
                    <MdLogout />
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
          <MdShoppingBasket
            className="text-textColor text-2xl  cursor-pointer hover:text-headingColor "
            onClick={() => navigate("/cart")}
          />
          <div className="absolute -top-4 -right-2 w-5 h-5 rounded-full bg-pink-600 flex items-center justify-center">
            <p className="text-xs text-white font-semibold">
              {addProduct.length}
            </p>
          </div>
        </div>

        <img
          className="w-14 object-cover rounded-full"
          src="/assets/logo.png"
          alt="logo"
        />

        <div className="relative">
          {/* here if user is not loggedIn then display a avatar img else display user's profile */}
          <motion.img
            whileTap={{ scale: 0.6 }}
            className="w-10 min-w-[40px] h-10 min-h-[40px] cursor-pointer rounded-full"
            src={email ? photoUrl! : "/assets/avatar.png"}
            alt="user"
            onClick={signIn}
          />
          {email && isMenu && (
            <ul className="flex gap-8">
              <div className="w-40 border-2 bg-white z-50 shadow-xl rounded-lg flex flex-col absolute px-4 py-2 top-12 -right-4">
                {/* if user is admin, here I am admin with my e-mail id then only allow to create new item for adding */}

                {email === process.env.REACT_APP_ADMIN_EMAIL &&
                  routeName !== "/createItem" &&
                  routeName !== "/login" && (
                    <Link to="/createItem">
                      <li
                        className="py-2 flex items-center gap-3 cursor-pointer hover:bg-slate-100 transition-all duration-100 ease-in-out text-textColor text-base"
                        onClick={() => setIsMenu(false)}
                      >
                        New Item <MdAdd />
                      </li>
                    </Link>
                  )}
                {routeName !== "/home" && (
                  <Link
                    to={"/home"}
                    className=" ml-6 py-2 flex items-center gap-3 cursor-pointer hover:bg-slate-100 transition-all duration-100 ease-in-out text-textColor text-base"
                    onClick={() => setIsMenu(false)}
                  >
                    Home
                    <AiFillHome/>
                  </Link>
                
                )}
                {routeName !== "/payment" &&
                  email &&
                  routeName !== "/login" && (
                    <li
                      className=" py-2 flex items-center gap-3 cursor-pointer hover:bg-slate-100 transition-all duration-100 ease-in-out text-textColor text-base"
                      onClick={() => {
                        setIsMenu(false);
                        navigate("/payment");
                      }}
                    >
                      Payment
                    </li>
                  )}

                <li
                  className="px-4 py-2 flex items-center gap-3 cursor-pointer bg-gray-200 justify-center rounded-md shadow-md hover:bg-slate-300 transition-all duration-100 ease-in-out text-textColor text-base"
                  onClick={logout}
                >
                  LogOut <MdLogout />
                </li>
              </div>
            </ul>
          )}{" "}
          {!email && isMenu && (
            <ul className="flex gap-8">
              <div className="w-40 bg-gray-50 shadow-2xl shadow-black rounded-lg flex flex-col absolute px-4 py-2 top-12 -right-4 gap-3 ">
                {/* if user is admin here I am admin with my e-mail id then only allow to create new item for adding */}

                {routeName !== "/home" && (
                  <Link
                    to={"/home"}
                    className=" ml-6 py-2 flex items-center mx-4 gap-3 cursor-pointer hover:bg-slate-100 transition-all duration-100 ease-in-out text-textColor text-base "
                    onClick={() => setIsMenu(false)}
                  >
                    Home
                    <AiFillHome/>
                  </Link>
                )}

                {routeName !== "/login" && (
                  <li
                    className="px-4 py-2 flex items-center gap-3 cursor-pointer bg-gray-200 justify-center rounded-md shadow-md hover:bg-slate-300 transition-all duration-100 ease-in-out text-textColor text-base"
                    onClick={login}
                  >
                    Login
                    <MdLogout />
                  </li>
                )}
              </div>
            </ul>
          )}{" "}
        </div>
      </div>
    </header>
  );
};

export default Header;
