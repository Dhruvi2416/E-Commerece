import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../redux-toolkit/store";
import { useDispatch } from "react-redux";
import {
  addedToCart,
  removedFromCart,
} from "../../redux-toolkit/product/productSlice";

interface Data {
  category: string;
  id: string;
  imageUrl: string;
  price: number;
  qty: number;
  title: string;
}
type ListOfProductsProps = {
  displayProducts: Data[];
};
// displayProducts comes from its parent component
const ListOfProducts = ({ displayProducts }: ListOfProductsProps) => {
  // loggedIn true or false
  const loggedIn = useSelector(
    (state: RootState) => state.product.userLoggedIn
  );
  // get the email of user when it logs in
  const email = useSelector((state: RootState) => state.product.userEmail);
  const dispatch = useDispatch();
  return (
    <>
      {/* shows cart list */}
      {displayProducts.map((cartList: Data) => (
        <div
          key={cartList.id}
          className=" flex flex-col sm:flex-row mb-4 border-2 p-2 gap-4 justify-center sm:justify-start items-center"
        >
          <img src={cartList.imageUrl} className="h-40 w-40" />
          <div className="lg:w-96 ">
            {/* product nane */}
            <p className="font-semibold text-xl flex justify-center sm:justify-start ">
              {cartList.title}
            </p>
            {/* product quantity and price */}
            <div className="flex text-textColor font-semibold gap-8 p-2 justify-center sm:justify-start">
              <p>Qty: {cartList.qty}</p>
              <p>Price: ₹ {" " + cartList.price}</p>
            </div>
            {/* total price of a particular product */}
            <p className="font-semibold text-gray-500 flex justify-center sm:justify-start">
              Total Product price: ₹{" " + cartList.qty * cartList.price}
            </p>
            <div className="mt-2 mb-4 flex justify-center sm:justify-start">
              {/* to decrease the amount of products quantity */}
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
                      email,
                    })
                  );
                }}
              >
                -
              </button>
              {/* displays quantity of a particular product */}
              <button className="bg-white p-2 w-12 text-2xl border-t-2 border-b-2 ">
                {cartList.qty}
              </button>
              {/* add quantity of product */}
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
                      email,
                    })
                  )
                }
              >
                +
              </button>
            </div>
          </div>
        </div>

        // here in future it will come a delete icon, which will remove the item from cart list
      ))}
    </>
  );
};

export default ListOfProducts;
