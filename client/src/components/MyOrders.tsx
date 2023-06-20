import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../redux-toolkit/store";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import productSlice, {
  seeProduct,
} from "../redux-toolkit/product/productSlice";
import { myOrders } from "../data/FirebaseFunctions";
import { DocumentData } from "firebase/firestore";
import Lottie from "lottie-web";
import emptyCart from "./animation/emptyCart.json";
import { Root } from "react-dom/client";
import { toast } from "react-toastify";
interface Data {
  category: string;
  id: string;
  imageUrl: string;
  price: number;
  qty: number;
  title: string;
  email: string;
}
const MyOrders = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [viewMyOrders, setViewMyOrders] = useState<DocumentData[]>([]);
const loggedIn = useSelector((state:RootState)=>state.product.userLoggedIn)
  const fetchData = async () => {
    await myOrders().then((data: DocumentData[]) => {
     
      setViewMyOrders(data);
    });
  };


  useEffect(() => {
    fetchData();
  }, []);
  useEffect(() => {
    if (viewMyOrders.length < 1) {
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
    }
  }, []);

  useEffect(() => {
    if (!loggedIn) {
      navigate("/home");

      toast.error("Please Login First!", {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 2000,
      });
    }},[]);
  const email = useSelector((state: RootState) => state.product.userEmail);

  const filteredData = viewMyOrders.filter((order) =>
    order.email.includes(email)
  );

 
  const view = (
    category: string,
    id: string,
    imageUrl: string,
    price: number,
    qty: number,
    title: string
  ) => {
    dispatch(
      seeProduct({
        category,
        id,
        imageUrl,
        price,
        qty,
        title,
        email,
      })
    );
    navigate("/viewProduct");
  };

  return (
    <div className="w-full flex justify-center mt-8 2xl:mt-44  items-center px-4  ">
      <div className="grid text-black  items-center rounded-lg gap-2">
        {filteredData.map((order) =>
          order.cartList?.map((product: Data) => (
            <div
              key={product.id}
              className=" flex flex-col sm:flex-row mb-4 border-2 p-2 gap-4 justify-center sm:justify-start items-center"
            >
              <img src={product.imageUrl} className="h-40 w-40" />
              <div className="lg:w-96 ">
                <p className="font-semibold text-xl flex justify-center items-center p-8 sm:p-0 sm:justify-start  ">
                  {product.title}
                </p>
                <div className="flex text-textColor font-semibold gap-8 p-2 justify-center sm:justify-start">
                  <p>Qty: {product.qty}</p>
                  <p>Price: ₹ {" " + product.price}</p>
                </div>
                <p className="font-semibold text-gray-500 flex justify-center sm:justify-start">
                  Total Product price: ₹{" " + product.qty * product.price}
                </p>
                <div className="mt-2 mb-4 flex justify-center sm:justify-start">
                  <button
                    onClick={() =>
                      view(
                        product.category,
                        product.id,
                        product.imageUrl,
                        product.price,
                        product.qty,
                        product.title
                      )
                    }
                    className="flex justify-center bg-pink-700 hover:bg-blue-800 rounded-lg px-1 py-2 mt-4 mb-4 w-36  text-lg  text-white font-semibold"
                  >
                    View Product
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default MyOrders;


