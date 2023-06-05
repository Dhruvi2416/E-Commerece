import { useEffect, useState } from "react";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { DocumentData } from "firebase/firestore";
// import { getAllItems } from "../data/FirebaseFunctions";
import type { RootState } from "../redux-toolkit/store";
import {
  favouriteProduct,
  favouriteCategory,
  seeProduct,
} from "../redux-toolkit/product/productSlice";
import { useDispatch, useSelector } from "react-redux";
import { categories } from "../data/data";
import { useNavigate } from "react-router-dom";
const Products = () => {
  //   const [product, setProduct] = useState<DocumentData[]>([]);

  //   const fetchData = async () => {
  //     await getAllItems().then((data) => {
  //       console.log(data);
  //       setProduct(data);
  //     });
  //   };
  //   useEffect(() => {
  //     fetchData();
  //   }, []);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const product = useSelector(
    (state: RootState) => state.product.allProductslist
  );
  const categoryChoosen = useSelector(
    (state: RootState) => state.product.categoryChoosen
  );

  const filteredData = product.filter((item) => {
    return item.category.includes(categoryChoosen);
  }); //ama filtered data malse

  return (
    <>
      <div className="py-4 hidden  lg:grid grid-cols-9 justify-center items-center mt-11">
        {categories.map((item) => (
          <div className="px-2" key={item.id}>
            <button onClick={() => dispatch(favouriteCategory(item.alt))}>
              {item.alt}
            </button>
          </div>
        ))}
      </div>

      <div className="lg:hidden">
        <select
          required
          className="py-2 px-2 rounded-lg mt-4 bg-white w-full text-textColor"
          onChange={(e) => dispatch(favouriteCategory(e.target.value))}
        >
          <option value="no" hidden>
            Select Category
          </option>
          {categories &&
            categories.map((item) => (
              <option
                value={item.alt}
                key={item.id}
                className="text-headingColor text-lg p-2"
              >
                {item.alt}
              </option>
            ))}
        </select>
      </div>
      {console.log(categoryChoosen)}

      {categoryChoosen ? (
        filteredData.length > 0 ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5  items-center justify-center gap-2 mt-11 bg-gradient-to-r from-orange-200 via-pink-300 to-orange-300 pb-4">
            {product.map(
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
          <h1 className="flex justify-center mt-2 font-semibold text-2xl max-w-full ">
            Out of Stock
          </h1>
        )
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5  items-center justify-center gap-2 mt-11 bg-gradient-to-r from-orange-200 via-pink-300 to-orange-300 pb-4">
          {product.map((item, i) => (
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
    </>
  );
};

export default Products;
