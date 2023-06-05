import { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../redux-toolkit/store";
import { useDispatch } from "react-redux";
import {
  favouriteProduct,
  decreaseFavouriteProduct,
} from "../redux-toolkit/product/productSlice";
import { AiOutlineShoppingCart } from "react-icons/ai";
const SingleProductDisplay = () => {
  const viewProduct = useSelector(
    (state: RootState) => state.product.viewProduct
  );
  const dispatch = useDispatch();
  const addToCartFunc = () => {
    dispatch(favouriteProduct());
  };

  const addProduct = useSelector(
    (state: RootState) => state.product.numbersOfAddedProduct
  );

  const removeFromCart = () => {
    dispatch(decreaseFavouriteProduct());
    if (addProduct <= 1) {
    }
  };
  return (
    <div className="flex h-1/3 flex-col xl:flex-row xl:mt-32 justify-center items-center mx-11 shadow-lg shadow-gray-500 rounded-lg bg-gradient-to-r from-orange-200 via-pink-300 to-orange-300 gap-2 2xl:gap-1">
      <div className="flex w-full justify-center xl:justify-start mt-4 xl:mt-0">
        <img
          className=" w-96 xl:h-full 2xl:w-full items-center  mb-4 xl:mb-0 px-2 sm:px-0 sm:shadow-lg sm:shadow-black-300"
          src={viewProduct.imageUrl}
          alt=""
        />
      </div>
      <div className="flex justify-center flex-col ">
        <div className="text-headingColor text-xl lg:text-3xl xl:text-4xl  font-semibold mt-4 mb-2 flex max-w-full items-center justify-center px-4">
          <p>{viewProduct.title}</p>
        </div>

        <h5 className="mb-2 text-xl lg:text-3xl xl:text-4xl font-bold tracking-tight text-textColor dark:text-white flex justify-center">
          Price: ₹{" " + viewProduct.price}
        </h5>
        <p className="text-textColor  md:text-left px-2 text-lg lg:text-xl  mt-4 2xl:mt-6 2xl:mr-4">
          So I started to walk into the water. I won't lie to you boys, I was
          terrified. But I pressed on, and as I made my way past the breakers a
          strange calm came over me. I don't know if it was divine intervention
          or the kinship of all living things but I tell you Jerry at that
          moment, I was a marine biologist.
        </p>
        <div className="flex justify-center">
          {!addProduct && (
            <button
              onClick={() => addToCartFunc()}
              className="flex justify-center bg-pink-700 hover:bg-blue-800 rounded-lg px-1 py-2 mt-4 mb-4 w-36  text-lg  text-white font-semibold"
            >
              Add to Cart{" "}
              <AiOutlineShoppingCart className="text-xl ml-2 font-semibold mt-1 " />
            </button>
          )}
          {addProduct > 0 && (
            <div className="mt-8 mb-4">
              <button
                className="bg-pink-700  p-2 px-4 text-2xl "
                onClick={() => removeFromCart()}
              >
                -
              </button>
              <button className="bg-white p-2 w-12 text-2xl ">
                {addProduct}
              </button>
              <button
                className="bg-pink-700 p-2 px-4 text-2xl "
                onClick={() => dispatch(favouriteProduct())}
              >
                +
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SingleProductDisplay;
