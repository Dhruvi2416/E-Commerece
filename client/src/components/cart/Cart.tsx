import { useEffect } from "react";
import { useSelector } from "react-redux";
import Lottie from "lottie-web";
import { RootState } from "../../redux-toolkit/store";
import emptyCart from "../animation/emptyCart.json";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ListOfCartedProducts from "./ListOfCartedProducts";
import PriceDetailsOfCartedProducts from "./PriceDetailsOfCartedProducts";
import { useNavigate } from "react-router-dom";
const Cart = () => {
  const displayCartProducts = useSelector(
    (state: RootState) => state.product.cartList
  );
  const navigate = useNavigate();
  const loggedIn = useSelector(
    (state: RootState) => state.product.userLoggedIn
  );

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

  useEffect(() => {
    if (!loggedIn) {
      navigate("/home");

      toast.error("Please Login First!", {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 2000,
      });
    }
  }, []);

  return (
    <div className="w-full flex flex-col 2xl:mt-48 lg:h-[75vh] items-center px-4  ">
      <ToastContainer />
      {displayCartProducts.length === 0 ? (
        <div>
          <div id="lottie-container" className="h-96" />
          <h1 className="flex justify-center font-extrabold text-2xl">
            Your Cart is Empty
          </h1>
        </div>
      ) : (
        <>
          <div className=" flex flex-col lg:flex-row gap-24 lg:overflow-y-auto">
            <div className=" scrolls lg:overflow-y-auto">
              <div className="text-textColor text-xl mb-2">
                Cart |{" " + displayCartProducts.length} Item
              </div>
              <ListOfCartedProducts displayProducts={displayCartProducts} />
            </div>
            <PriceDetailsOfCartedProducts />
          </div>
        </>
      )}
    </div>
  );
};
export default Cart;
