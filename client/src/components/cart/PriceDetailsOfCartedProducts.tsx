import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import { RootState } from "../../redux-toolkit/store";

import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { totalPriceOfProductsBought } from "../../redux-toolkit/product/productSlice";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const PriceDetailsOfCartedProducts = () => {
  // displays cart list
  const displayCartProducts = useSelector(
    (state: RootState) => state.product.cartList
  );
  // is user logged in or not returns in true or false
  const loggedIn = useSelector(
    (state: RootState) => state.product.userLoggedIn
  );

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const deliveryFee = 70;
  // it calculates total price of all products
  useEffect(() => {
    let total = 0;
    displayCartProducts.map((item) => {
      let price = item.qty * item.price;
      total += price;
    });
    setTotalPrice(total);
  }, [displayCartProducts]);
  // if logged in than on clicking payment button it will proceed further for payment or
  //  else it will navigate to home saying login first
  const handlePayment = () => {
    if (loggedIn) {
      dispatch(totalPriceOfProductsBought(totalPrice + 70));
      navigate("/payment");
    } else {
      navigate("/home");

      toast.error("Please Login First!", {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 2000,
      });
    }
  };

  return (
    <div className=" border-2 p-4 flex flex-col justify-center max-h-96 mt-10 ">
      <p className="font-extrabold text-2xl">Price Details</p>
      <div className="grid grid-cols-2 gap-2 p-2 text-lg ">
        <p>Total Product Price</p>
        <p className="flex justify-end font-semibold">₹{totalPrice}</p>
      </div>{" "}
      <div className="grid grid-cols-2 gap-2 p-2 text-lg ">
        <p>Delivery Charges</p>
        <p className="flex justify-end font-semibold">+ ₹{" " + deliveryFee}</p>
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
  );
};

export default PriceDetailsOfCartedProducts;
