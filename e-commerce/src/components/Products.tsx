import { useEffect, useState } from "react";

import { DocumentData } from "firebase/firestore";
import { getAllItems } from "../firebase.config";

const Products = () => {
  const [product, setProduct] = useState<DocumentData[]>([]);
  const fetchData = async () => {
    await getAllItems().then((data) => {
      console.log(data);
      setProduct(data);
    });
  };
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4  items-center gap-2 mt-11 ">
      {product.map((item) => (
        <div
          className="flex flex-col items-center mt-11 border-2 border-black mx-11 shadow-lg shadow-headingColor rounded-lg"
          key={item.id}
        >
          <img
            className="w-56 h-56 md:w-full md:h-52 mt-0 rounded-t-lg "
            src={item.imageUrl}
            alt=""
          />
          <div>
            <div className="w-48 lg:w-60 text-headingColor text-lg  font-semibold mt-6 border-t border-black   flex justify-center max-w-full">
              <p className="truncate mt-4">{item.title}</p>
            </div>

            <h5 className="mb-2 text-xl font-bold tracking-tight text-textColor dark:text-white flex  justify-center items-center">
              Price: ₹{" " + item.price}
            </h5>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Products;
