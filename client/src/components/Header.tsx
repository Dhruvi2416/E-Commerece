import { MdShoppingBasket, MdAdd, MdLogout } from "react-icons/md";
import { AiFillHome } from "react-icons/ai";
import { categories } from "../data/data";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { useState } from "react";
import { useSelector } from "react-redux";
import type { RootState } from "../redux-toolkit/store";
import { useNavigate } from "react-router-dom";

import { favouriteCategory } from "../redux-toolkit/product/productSlice";
import {
  collectUserEmail,
  handleUserLoggedIn,
  collectUserPhotoURL,
} from "../redux-toolkit/product/productSlice";
import { useDispatch } from "react-redux";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  UserCredential,
} from "firebase/auth";
import { app } from "../firebase.config";
const Header = () => {
  const [clickedIndex, setClickedIndex] = useState<number | null>(null);
  const handleClick = (index: number) => {
    setClickedIndex(index);
  };
  
  const isLoggedIn = useSelector(
    (state: RootState) => state.product.userLoggedIn
  );
  const photoURL = useSelector(
    (state: RootState) => state.product.userPhotoURL
  );
  const email = useSelector((state: RootState) => state.product.userEmail);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const addProduct = useSelector((state: RootState) => state.product.cartList);

  const [isUser, setIsUser] = useState<null | UserCredential>(null);
  const provider = new GoogleAuthProvider();
  // initialize Authentication service to the following app
  const firebaseAuth = getAuth(app);

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const login = async () => {
    setIsDropdownOpen(false);
    try {
      if (isUser === null) {
        const response = await signInWithPopup(
          firebaseAuth,
          provider.setCustomParameters({
            prompt: "select_account",
          })
        );

        setIsUser(response);
        dispatch(handleUserLoggedIn(true));
        dispatch(collectUserEmail(response.user.email!));
        dispatch(collectUserPhotoURL(response.user.photoURL!));
      }
    } catch (error) {
      // Handle the unknown error case
      console.log("Sign-in error:", error);
      // Display a generic error message or perform any other action
    }
  };

  // if the user is loggedIn then set all the credentials to the localStorage basically conditioned that null is not being displayed

  // photo URL

  // logout

  const logout = () => {
    setIsDropdownOpen(false);
    dispatch(handleUserLoggedIn(false));
    navigate("/home");
  };
  const location = useLocation();
  const routeName = location.pathname;
  console.log(routeName);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <header className="fixed z-50 w-screen p-6  bg-primary">
      {/* desktop & tablet */}
      <ToastContainer />
      <div className=" flex items-center w-full h-full justify-between">
        <img
          className="w-20 object-cover rounded-full"
          src="/assets/logo.png"
          alt=""
        />

        <div className="flex items-center gap-8">
          <ul className="flex gap-8">
            <Link
              to="/home"
              onClick={() => setIsDropdownOpen(false)}
              className="hidden flex flex-col gap-2  sm:block"
            >
              {routeName === "/home" ? (
                <li className="text-base font-semibold text-pink-700 hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer">
                  Home
                </li>
              ) : (
                <li className="text-base text-textColor hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer">
                  Home
                </li>
              )}
            </Link>

            {/* MdShoppingBasket is a react icon for cart */}
            <div className="hidden sm:block relative flex">
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

            {isLoggedIn && (
              <Link
                onClick={() => setIsDropdownOpen(false)}
                to="/myorders"
                className="hidden sm:block flex flex-col gap-2"
              >
                {routeName === "/myorders" ? (
                  <li className="text-base font-semibold text-pink-700 hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer">
                    My Orders
                  </li>
                ) : (
                  <li className="lg:text-base text-textColor hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer">
                    My Orders
                  </li>
                )}
              </Link>
            )}

            {isLoggedIn ? (
              <>
                {" "}
                {email === process.env.REACT_APP_OWNER_EMAIL && (
                  <Link
                    to="/createItem"
                    onClick={() => setIsDropdownOpen(false)}
                    className="hidden sm:block flex flex-col gap-2"
                  >
                    {routeName === "/createItem" ? (
                      <li className="text-base font-semibold text-pink-700 hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer">
                        New Item
                      </li>
                    ) : (
                      <li className="text-base text-textColor hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer">
                        New Item
                      </li>
                    )}
                  </Link>
                )}
                <li
                  className="hidden sm:block text-base font-semibold  hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer"
                  onClick={logout}
                >
                  Logout
                </li>
              </>
            ) : (
              <li
                className="hidden sm:block text-base font-semibold  hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer"
                onClick={login}
              >
                Login
              </li>
            )}
          </ul>

          <div className="hidden sm:block relative">
            {/* here if user is not loggedIn then display a avatar img else display user's profile */}
            <motion.img
              whileTap={{ scale: 0.6 }}
              className="w-10 min-w-[40px] h-10 min-h-[40px] cursor-pointer rounded-full"
              src={isLoggedIn ? photoURL : "/assets/avatar.png"}
              alt="user"
            />
          </div>
          <button
            className="text-textColor text-2xl cursor-pointer sm:hidden"
            onClick={toggleDropdown}
          >
            &#9776;
          </button>
          {isDropdownOpen && (
            <div className="z-50 sm:hidden absolute top-24 px-2 right-2 mt-2 py-2 w-28  bg-white border border-gray-200 rounded-md shadow-lg">
              <ul className="flex flex-col gap-2">
                <li>
                  <Link
                    to="/home"
                    onClick={() => setIsDropdownOpen(false)}
                    className={`text-base ${
                      routeName === "/home"
                        ? "font-semibold text-pink-700 hover:text-headingColor"
                        : "text-textColor hover:text-headingColor"
                    } duration-100 transition-all ease-in-out cursor-pointer`}
                  >
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                    to="/myorders"
                    onClick={() => setIsDropdownOpen(false)}
                    className={`text-base ${
                      routeName === "/myorders"
                        ? "font-semibold text-pink-700 hover:text-headingColor"
                        : "text-textColor hover:text-headingColor"
                    } duration-100 transition-all ease-in-out cursor-pointer`}
                  >
                    My Orders
                  </Link>
                </li>
                <li>
                  <Link
                    to="/cart"
                    onClick={() => setIsDropdownOpen(false)}
                    className={`text-base ${
                      routeName === "/cart"
                        ? "font-semibold text-pink-700 hover:text-headingColor"
                        : "text-textColor hover:text-headingColor"
                    } duration-100 transition-all ease-in-out cursor-pointer`}
                  >
                    Cart
                  </Link>
                </li>

                {isLoggedIn ? (
                  <div>
                    {" "}
                    {email === process.env.REACT_APP_OWNER_EMAIL && (
                      <Link
                        to="/createItem"
                        className=" flex flex-col gap-2 mb-2"
                        onClick={() => setIsDropdownOpen(false)}
                      >
                        {routeName === "/createItem" ? (
                          <li className="text-base font-semibold text-pink-700 hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer">
                            New Item
                          </li>
                        ) : (
                          <li className="text-base text-textColor hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer">
                            New Item
                          </li>
                        )}
                      </Link>
                    )}
                    <li
                      className=" text-base font-semibold  hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer"
                      onClick={logout}
                    >
                      Logout
                    </li>
                  </div>
                ) : (
                  <li
                    className="text-base font-semibold  hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer"
                    onClick={login}
                  >
                    Login
                  </li>
                )}
              </ul>
            </div>
          )}
        </div>
      </div>

      {routeName=="/home" &&  <a href="#dhruvi">
      <div className="w-full flex flex-col mt-12 sm:mt-20 2xl:mt-36  bg-white">
     
        <div className="fixed z-30  w-full overflow-auto scrollbar-thin scrollbar-w-0 scrollbar-thumb-white scrollbar-track-white bg-white flex py-4 justify-start xl:justify-center items-center -mt-10 md:-mt-14 lg:-mt-18 2xl:-mt-24 ">
          {categories.map((item, index) => (
            <div key={item.id}>
              <button onClick={() => dispatch(favouriteCategory(item.alt))}>
                <p
                  className={`w-32 hover:text-pink-700 ${
                    clickedIndex === index
                      ? "text-pink-700 font-bold"
                      : "text-black"
                  }`}
                  onClick={() => handleClick(index)}
                >
                  {" "}
                  {item.alt}{" "}
                </p>
              </button>
            </div>
          ))}
        </div>
        </div>
      </a>
      
      
      }
    </header>
  );
};

export default Header;
