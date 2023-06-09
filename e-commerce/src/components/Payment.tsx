import React, { useEffect } from "react";
import Lottie from "lottie-web";
import { useSelector } from "react-redux";
import noPayment from "./animation/noPayment.json";
import { RootState } from "../redux-toolkit/store";
import { useNavigate } from "react-router-dom";
const Payment = () => {
  
  const loggedIn = useSelector((state:RootState)=>state.product.isLoggedIn)
const navigate = useNavigate();
useEffect(()=>{

!loggedIn && navigate("/home")

},[])
    const displayCartProducts = useSelector(
        (state: RootState) => state.product.cartList
      );
    
  useEffect(() => {
    if(displayCartProducts.length<1){
    navigate("/cart")
    }
  }, []);

  return (
    <div className="w-full flex flex-col 2xl:mt-48 lg:h-[75vh] items-center   ">
    
    </div>
  );
};

export default Payment;
