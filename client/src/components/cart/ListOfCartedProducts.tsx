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

const ListOfProducts = ({ displayProducts }: ListOfProductsProps) => {
  const loggedIn = useSelector(
    (state: RootState) => state.product.userLoggedIn
  );
  const email = useSelector((state: RootState) => state.product.userEmail);
  const dispatch = useDispatch();
  return (
    <>
      {displayProducts.map((cartList: Data) => (
        <div
          key={cartList.id}
          className=" flex flex-col sm:flex-row mb-4 border-2 p-2 gap-4 justify-center sm:justify-start items-center"
        >
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
                      email,
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
      ))}
    </>
  );
};

export default ListOfProducts;
