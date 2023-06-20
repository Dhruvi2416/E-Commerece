import { useEffect, useState, useRef } from "react";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { DocumentData } from "firebase/firestore";
import { getAllItems } from "../../data/FirebaseFunctions";
import outOfStock from "../animation/out of stock.json";
import Lottie from "lottie-web";
import type { RootState } from "../../redux-toolkit/store";
import {
  favouriteCategory,
  seeProduct,
} from "../../redux-toolkit/product/productSlice";
import { useDispatch, useSelector } from "react-redux";

import { useNavigate } from "react-router-dom";

const Products = () => {
  const [product, setProduct] = useState<DocumentData[]>([]);
  const email = useSelector((state: RootState) => state.product.userEmail);
  const fetchData = async () => {
    await getAllItems().then((data: DocumentData[]) => {
      setProduct(data);
    });
  };
  useEffect(() => {
    fetchData();
  }, []);

  const categoryChoosen = useSelector(
    (state: RootState) => state.product.categoryChoosen
  );
  const containerRef = useRef(null);
  const container = document.getElementById("lottie-container");

  useEffect(() => {
    if (containerRef.current) {
      const container = containerRef.current;
      const animation = Lottie.loadAnimation({
        container: container,
        renderer: "svg",
        loop: false,
        autoplay: true,
        animationData: outOfStock,
      });

      // Cleanup the animation when component unmounts or categoryChoosen changes
      return () => {
        animation.destroy();
      };
    }
  }, [categoryChoosen]);

  useEffect(() => {
    dispatch(favouriteCategory(""));
  }, []);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // const product = useSelector(
  //   (state: RootState) => state.product.allProductsList
  // );

  const filteredData = product.filter((item) => {
    return item.category.includes(categoryChoosen);
  }); //ama filtered data malse

  return (
    <div className="px-4 md:px-16" id="categorySelected">
      <p className="flex justify-center text-xl font-semibold text-pink-700 mt-16">
        Available Products
      </p>

      {categoryChoosen ? (
        filteredData.length > 0 ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5  items-center justify-center gap-2 mt-11 bg-gradient-to-r from-orange-200 via-pink-300 to-orange-300 pb-4">
            {filteredData.map(
              (item, i) =>
                categoryChoosen === item.category && (
                  <div
                    className="flex flex-col items-center  mt-11  mx-11 shadow-lg shadow-gray-500 rounded-lg bg-white w-52"
                    key={item.id}
                  >
                    <img
                      className="h-64 w-full  md:h-52 rounded-t-lg border-b border-black  "
                      src={item.imageUrl}
                      alt=""
                    />
                    <div className="flex justify-center flex-col ">
                      <div className="w-52 lg:w-60  2xl:w-78 pl-6 lg:px-8 xl:ml-4 xl:pl-6 text-headingColor tracking-tight text-lg sm:text-xl font-semibold mt-2 flex max-w-full justify-center">
                        <p className="truncate mt-2">{item.title}</p>
                      </div>

                      <h5 className="mb-2 text-xl font-bold tracking-tight text-textColor dark:text-white flex  justify-center">
                        Price: ₹{" " + item.price}
                      </h5>

                      <button
                        onClick={() => {
                          dispatch(
                            seeProduct({
                              category: item.category,
                              id: item.id,
                              imageUrl: item.imageUrl,
                              price: item.price,
                              qty: item.qty,
                              title: item.title,
                              email: email,
                            })
                          );
                          navigate("/viewProduct");
                        }}
                        className="flex justify-center items-center bg-pink-700 hover:bg-blue-800 rounded-lg px-1 py-2 mb-2 w-36 mx-10 lg:mx-14 text-lg tracking-tight text-white font-semibold"
                      >
                        View Product{" "}
                      </button>
                    </div>
                  </div>
                )
            )}{" "}
          </div>
        ) : (
          <h1 className="flex flex-col justify-center mt-2 font-semibold text-2xl max-w-full ">
            <div ref={containerRef} id="lottie-container" className="h-96" />
            <p className="flex justify-center text-2xl font-semibold text-pink-700 mt-16">
              Out of Stock
            </p>
          </h1>
        )
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5  items-center justify-center gap-2 mt-11 bg-gradient-to-r from-orange-200 via-pink-300 to-orange-300 pb-4">
          {product.map((item) => (
            <div
              className="flex flex-col items-center  mt-11  mx-11 shadow-lg shadow-gray-500 rounded-lg bg-white w-52"
              key={item.id}
            >
              <img
                className="h-64 w-full  md:h-52 rounded-t-lg border-b border-black  "
                src={item.imageUrl}
                alt=""
              />
              <div className="flex justify-center flex-col ">
                <div className="w-52 lg:w-60  2xl:w-78 pl-6 lg:px-8 xl:ml-4 xl:pl-6 text-headingColor tracking-tight text-lg sm:text-xl font-semibold mt-2 flex max-w-full justify-center">
                  <p className="truncate mt-2">{item.title}</p>
                </div>

                <h5 className="mb-2 text-xl font-bold tracking-tight text-textColor dark:text-white flex  justify-center">
                  Price: ₹{" " + item.price}
                </h5>
                <button
                  onClick={() => {
                    dispatch(
                      seeProduct({
                        category: item.category,
                        id: item.id,
                        imageUrl: item.imageUrl,
                        price: item.price,
                        qty: item.qty,
                        title: item.title,
                        email,
                      })
                    );
                    navigate("/viewProduct");
                  }}
                  className="flex justify-center items-center bg-pink-700 hover:bg-blue-800 rounded-lg px-1 py-2 mb-2 w-36 mx-10 lg:mx-14 text-lg tracking-tight text-white font-semibold"
                >
                  View Product{" "}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Products;
