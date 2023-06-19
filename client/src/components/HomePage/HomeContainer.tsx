import { TbTruckDelivery, TbBrandCashapp } from "react-icons/tb";
import { AiOutlinePayCircle } from "react-icons/ai";
import { categories } from "../../data/data";
import Products from "./DisplayAllProducts";
import React, { useState, useEffect } from "react";

import { useDispatch } from "react-redux";
import { favouriteCategory } from "../../redux-toolkit/product/productSlice";
const HomeContainer = () => {
  const dispatch = useDispatch();
  const [clickedIndex, setClickedIndex] = useState<number | null>(null);
  const handleClick = (index: number) => {
    setClickedIndex(index);
  };

  return (
    <div className="w-full flex flex-col 2xl:mt-52">
      <a href="#dhruvi">
        <div className="fixed z-30 w-full overflow-auto scrollbar-thin scrollbar-w-0 scrollbar-thumb-white scrollbar-track-white bg-primary border-2 flex py-4 justify-start xl:justify-center items-center -mt-6 md:-mt-14 lg:-mt-18 2xl:-mt-24 ">
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
      </a>
      <div className="grid grid-cols-1 xl:grid-cols-2  gap-2 w-full h-[calc(100%-88px)] px-4 md:px-16 mt-8">
        <section className="py-2 flex-1 flex flex-col items-start md:items-center">
          <p className="text-[2.5rem] md:text-[4.5rem] font-bold tracking-normal text-headingColor drop-shadow-md">
            Fastest Delivery, Cheap Cost, High Quality{" "}
            <span className="text-pink-600 text-[3rem] md:text-[5rem]">
              shopping
            </span>
          </p>

          <div className="flex flex-wrap gap-2 py-8">
            <div className="flex  items-center justify-center p-2 md:p-4 rounded-full gap-2 bg-pink-100 text-pink-500 text-base font-semibold">
              <TbTruckDelivery className="w-10 text-2xl bg-white rounded-full cursor-pointer hover:text-headingColor drop-shadow-md " />
              <p> Free Delivery</p>
            </div>
            <div className="flex  items-center justify-center p-2 md:p-4 rounded-full gap-2 bg-pink-100 text-pink-500 text-base font-semibold">
              <TbBrandCashapp className="w-10 text-2xl bg-white rounded-full cursor-pointer hover:text-headingColor drop-shadow-md " />
              <p>Cash on Delivery</p>
            </div>
            <div className="flex  items-center justify-center p-2 md:p-4 rounded-full gap-2 bg-pink-100 text-pink-500 text-base font-semibold">
              <AiOutlinePayCircle className="w-10 text-2xl bg-white rounded-full cursor-pointer hover:text-headingColor drop-shadow-md " />
              <p> Online Payment</p>
            </div>
          </div>
          <p className="text-textColor  md:text-left">
            E-commerce, also known as electronic commerce, has transformed the
            way people shop and conduct business. It enables individuals to buy
            and sell products and services online, revolutionizing the
            traditional retail landscape. With the advent of e-commerce
            platforms, businesses can establish an online presence, showcase
            their offerings, and reach a global customer base. Customers enjoy
            the convenience of browsing through virtual catalogs, comparing
            prices, and making secure transactions using various payment
            methods. Shipping and logistics ensure that products are delivered
            to customers' doorsteps efficiently. Online marketplaces have
            emerged as popular platforms, connecting sellers and buyers from
            around the world. E-commerce extends beyond retail, encompassing
            sectors like travel, entertainment, and digital services. Mobile
            commerce has gained significant traction with the rise of
            smartphones and dedicated shopping apps. Personalization and
            targeted marketing are integral to the e-commerce experience,
            leveraging customer data to offer tailored recommendations. While
            e-commerce offers numerous benefits, it also presents challenges
            such as cybersecurity risks, privacy concerns, and ensuring a
            seamless user experience. Nevertheless, e-commerce continues to
            thrive, empowering businesses of all sizes and shaping the future of
            commerce worldwide.
          </p>
        </section>
        <div className="hidden md:grid  md:grid-cols-3 items-center bg-gradient-to-r from-orange-200 via-pink-300 to-orange-300 rounded-lg">
          {categories.map((category) => {
            return (
              <div
                className="flex flex-col items-center mt-11 "
                key={category.id}
              >
                <img
                  className="w-56 md:w-40   shadow-lg shadow-black rounded-lg"
                  src={category.src}
                  alt={category.alt}
                />
                <p className="text-black text-lg font-semibold mt-2">
                  {category.alt}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      <Products />
    </div>
  );
};

export default HomeContainer;
