import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Lottie from "lottie-web";
import { RootState } from "../redux-toolkit/store";
import emptyCart from "./animation/emptyCart.json";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  addedToCart,
  removedFromCart,
  handleLoggedIn,
} from "../redux-toolkit/product/productSlice";
interface Data {
  category: string;
  id: string;
  imageUrl: string;
  price: number;
  qty: number;
  title: string;
}

const Cart = () => {
  const displayCartProducts = useSelector(
    (state: RootState) => state.product.cartList
  );
  const loggedIn = useSelector((state: RootState) => state.product.userData);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const deliveryFee = 70;
  useEffect(() => {
    let total = 0;
    displayCartProducts.map((item) => {
      let price = item.qty * item.price;
      total += price;
    });
    setTotalPrice(total);
  }, [displayCartProducts]);

  // Add this useEffect to load the Lottie animation
  useEffect(() => {
    const container = document.getElementById("lottie-container");
    if (container) {
      Lottie.loadAnimation({
        container: container,
        renderer: "svg",
        loop: true,
        autoplay: true,
        animationData: emptyCart, // Update the animation file path and extension
      });
    }
  }, []);

  const handlePayment = () => {
    if (loggedIn) {
      navigate("/payment");
    } else {
      navigate("/login");
    }
  };

  return (
    <div className="w-full flex flex-col 2xl:mt-48 lg:h-[75vh] items-center px-4  ">
      {displayCartProducts.length === 0 ? (
        <div>
          <div id="lottie-container" className="h-96" />
          <h1 className="flex justify-center font-extrabold text-2xl">
            Your Cart is Empty
          </h1>
        </div>
      ) : (
        <div className=" flex flex-col lg:flex-row gap-24 lg:overflow-y-auto">
          <div className=" scrolls lg:overflow-y-auto">
            <div className="text-textColor text-xl mb-2">
              Cart |{" " + displayCartProducts.length} Item
            </div>
            {displayCartProducts.map((cartList) => (
              <div className=" flex flex-col sm:flex-row mb-4 border-2 p-2 gap-4 justify-center sm:justify-start items-center">
                <img src={cartList.imageUrl} className="h-40 w-40" />
                <div className="lg:w-96 ">
                  <p className="font-semibold text-xl flex justify-center sm:justify-start ">
                    {cartList.title}
                  </p>
                  <div className="flex text-textColor font-semibold gap-8 p-2 justify-center sm:justify-start">
                    <p>Qty: {cartList.qty}</p>
                    <p>Price: ₹ {" " + cartList.price}</p>
                  </div>
                  <p className="font-semibold text-gray-500 flex justify-center sm:justify-start">
                    Total Product price: ₹{" " + cartList.qty * cartList.price}
                  </p>
                  <div className="mt-2 mb-4 flex justify-center sm:justify-start">
                    <button
                      className="bg-pink-700  p-2 px-4 text-2xl "
                      onClick={() => {
                        dispatch(
                          removedFromCart({
                            category: cartList.category,
                            id: cartList.id,
                            imageUrl: cartList.imageUrl,
                            price: cartList.price,
                            qty: 1,
                            title: cartList.title,
                          })
                        );
                      }}
                    >
                      -
                    </button>
                    <button className="bg-white p-2 w-12 text-2xl border-t-2 border-b-2 ">
                      {cartList.qty}
                    </button>
                    <button
                      className="bg-pink-700 p-2 px-4 text-2xl "
                      onClick={() =>
                        dispatch(
                          addedToCart({
                            category: cartList.category,
                            id: cartList.id,
                            imageUrl: cartList.imageUrl,
                            price: cartList.price,
                            qty: 1,
                            title: cartList.title,
                          })
                        )
                      }
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className=" border-2 p-4 flex flex-col justify-center max-h-96 mt-10 ">
            <p className="font-extrabold text-2xl">Price Details</p>
            <div className="grid grid-cols-2 gap-2 p-2 text-lg ">
              <p>Total Product Price</p>
              <p className="flex justify-end font-semibold">₹{totalPrice}</p>
            </div>{" "}
            <div className="grid grid-cols-2 gap-2 p-2 text-lg ">
              <p>Delivery Charges</p>
              <p className="flex justify-end font-semibold">
                + ₹{" " + deliveryFee}
              </p>
            </div>{" "}
            <div className="grid grid-cols-2 gap-2 border-t-2 border-black p-2 text-lg">
              <p>Total Product Price</p>

              <p className="flex justify-end font-semibold">
                ₹{totalPrice + deliveryFee}
              </p>
            </div>
            <div className="flex justify-center">
              <button
                className="flex justify-center  bg-pink-700 hover:bg-blue-800 rounded-lg px-1 py-2 mt-4 mb-4 w-56 mx-2  text-lg  text-white font-semibold"
                onClick={() => handlePayment()}
              >
                Continue to Payment{" "}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default Cart;

// displayCartProducts.map((cartList)=>

// <div className="flex h-1/3 flex-col xl:flex-row xl:mt-32 justify-center items-center mx-11 shadow-lg shadow-gray-500 rounded-lg bg-gradient-to-r from-orange-200 via-pink-300 to-orange-300 gap-2 2xl:gap-1">
// <div className="flex w-full justify-center xl:justify-start mt-4 xl:mt-0">
// <img
//  className=" w-96 xl:h-full 2xl:w-full items-center  mb-4 xl:mb-0 px-2 sm:px-0 sm:shadow-lg sm:shadow-black-300"
//  src={cartList.imageUrl}
//  alt=""
// />
// </div>
// <div className="flex justify-center flex-col ">
// <div className="text-headingColor text-xl lg:text-3xl xl:text-4xl  font-semibold mt-4 mb-2 flex max-w-full items-center justify-center px-4">
//  <p>{cartList.title}</p>
// </div>

// <h5 className="mb-2 text-xl lg:text-3xl xl:text-4xl font-bold tracking-tight text-textColor dark:text-white flex justify-center">
//  Price: ₹{" " + cartList.price}
// </h5>
// <p className="text-textColor  md:text-left px-2 text-lg lg:text-xl  mt-4 2xl:mt-6 2xl:mr-4">
//  So I started to walk into the water. I won't lie to you boys, I was
//  terrified. But I pressed on, and as I made my way past the breakers a
//  strange calm came over me. I don't know if it was divine intervention
//  or the kinship of all living things but I tell you Jerry at that
//  moment, I was a marine biologist.
// </p>
// <div className="flex justify-center">

//              <button
//                className="bg-pink-700  p-2 px-4 text-2xl "

//              >
//                -
//              </button>
//              <button className="bg-white p-2 w-12 text-2xl ">
//                {cartList.qty}
//              </button>
//              <button
//                className="bg-pink-700 p-2 px-4 text-2xl "
//                onClick={() => addToCartFunc()}
//              >
//                +
//              </button>

// </div>
// </div>
// </div>
