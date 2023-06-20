import { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import {
  collectUserInformation,
  emptyCartList,
} from "../redux-toolkit/product/productSlice";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { shoppedItem } from "../data/FirebaseFunctions";
import { useNavigate } from "react-router-dom";
const Payment = () => {
  const navigate = useNavigate();
  const loggedIn = useSelector((state) => state.product.userLoggedIn);
  const cartList = useSelector((state) => state.product.cartList);
  const email = useSelector((state) => state.product.userEmail);
  useEffect(() => {
    if (!loggedIn) {
      navigate("/home");

      toast.error("Please Login First!", {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 2000,
      });
    }

    if (cartList.length < 1) {
      navigate("/cart");
    }
  }, []);

  const totalPrice = useSelector((state) => state.product.totalCostOfProducts);

  const dispatch = useDispatch();
  const [name, setName] = useState("");

  const [mobile, setMobile] = useState("");
  const [address, setAddress] = useState("");
  const [error, setError] = useState("");
// firebase adding payment details
  const addList = (order_id) => {

    try {
      if (order_id) {
        const newItem = {
          id: order_id,
          name,
          email,
          mobile,
          cartList,
          price: totalPrice,
        };
        shoppedItem(newItem);
        toast.success("Done!", {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 2000,
        });
      } else {
        // Handle the case when the order_id is undefined or not valid
        toast.error("Invalid order ID", {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 2000,
        });
      }
    } catch (error) {
      // payment fail
      toast.error("Payment invalid", {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 2000,
      });
    }
  };
   
  async function displayRazorpay() {
    if (!error && name && address && email && mobile) {
      dispatch(
        collectUserInformation({
          name: name,
          address: address,
          email: email,
          mobile: mobile,
        })
      );
      // creating a new order
      const result = await axios.post(
        // backend is hosted on render
        "https://shopsify-backend.onrender.com/api/checkout",
        {
          amount: totalPrice * 100,
        }
      ); //firebase store ==> order Id
   
     
      const { amount, currency } = result.data;
      
      const apiKey = await axios.get(
        "https://shopsify-backend.onrender.com/api/getKey"
      );
      
      const { key } = apiKey.data;
      // options given to razorpay
      const options = {
        key: key, // Enter the Key ID generated from the Dashboard
        amount: amount,
        currency: currency,
        name: "Shopsify",
        description: "Test Transaction",
        callback_url:
          "https://shopsify-backend.onrender.com/api/paymentVerification",
        order_id: result.data.order.id,
        handler: async function (response) {
          const data = {
            orderCreationId: result.data.order.id,
            razorpayPaymentId: response.razorpay_payment_id,
            razorpayOrderId: response.razorpay_order_id,
            razorpaySignature: response.razorpay_signature,
          };

          toast.success("Payment completed successfully", {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 2000,
          });
          // firebase func passing order id
          addList(result.data.order.id);
          // emapty cart List
          dispatch(emptyCartList());
          // set all details to null
          setAddress("");
          setName("");
          setMobile("");
        },
        prefill: {
          name: name,
          email: email,
          contact: mobile,
        },
        notes: {
          address: address,
        },
        theme: {
          color: "#f03c94",
        },
      };
      //order status firebase success
      const paymentObject = new window.Razorpay(options);
      paymentObject.open();
    } else {
      toast.error("Please Add All Details!", {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 2000,
      });
    }
  }

  return (
    <div className="mt-20 xl:mt-40">
      <ToastContainer />

      <h1 className="text-pink-700 font-semibold text-xl mb-4 flex justify-center">
        Payment
      </h1>
      <form className="max-w-md mx-auto p-8 bg-pink-700 rounded-lg text-white">
        <div className="mb-4">
          <label className="block mb-2 font-bold" htmlFor="name">
            Name
          </label>
          <input
            className="border text-black border-gray-300 px-3 py-2 rounded-md w-full"
            type="text"
            id="name"
            value={name}
            placeholder="Enter Name"
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className="mb-4">
          <label className="block mb-2 font-bold" htmlFor="mobile">
            Mobile
          </label>
          <input
            className="border text-black border-gray-300 px-3 py-2 rounded-md w-full"
            type="text"
            id="mobile"
            value={mobile}
            placeholder="Enter phone number"
            onChange={(e) => {
              setMobile(e.target.value);
              const inputMobile = e.target.value;
              const regex = /^(\+91[\-\s]?)?[0]?(91)?[789]\d{9}$/;
              if (regex.test(inputMobile)) {
                setMobile(inputMobile);
                setError("");
              } else
                setError("Only Indian numbers are allowed! Ex. +91XXXXXXXXXX");
            }}
          />
        </div>
        <div className="mb-4 ">
          <label className="block mb-2 font-bold" htmlFor="address">
            Address
          </label>
          <textarea
            className="border text-black border-gray-300 px-3 py-2 rounded-md w-full"
            id="address"
            value={address}
            placeholder="Enter address"
            onChange={(e) => {
              setAddress(e.target.value);
           
            }}
          ></textarea>
        </div>
        <div className="flex justify-center">
          <button
            type="submit"
            className="bg-white text-black  py-2 px-4 rounded-md"
            onClick={(e) => {
              e.preventDefault();
              displayRazorpay();
            }}
          >
            Pay {totalPrice}
          </button>
        </div>
      </form>

      {error && <p className="text-red-600 font-semibold w-72">{error}</p>}
    </div>
  );
};

export default Payment;
