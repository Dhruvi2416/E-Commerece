import React, { useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { RootState } from "../redux-toolkit/store";
import { useDispatch } from "react-redux";
import { collectUserInformation } from "../redux-toolkit/product/productSlice";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { shoppedItem } from "../data/FirebaseFunctions";
const Payment = () => {
  const totalPrice = useSelector((state) => state.product.totalCostOfProducts);
  const cartList = useSelector((state) => state.product.cartList);
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [address, setAddress] = useState("");
  const [error, setError] = useState("");

  const addList = (order_id) => {
    console.log("order",order_id)
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
          position: toast.POSITION.TOP,
          autoClose: 2000,
        });
      } else {
        // Handle the case when the order_id is undefined or not valid
        toast.error("Invalid order ID", {
          position: toast.POSITION.TOP,
          autoClose: 2000,
        });
      }
    } catch (error) {
      toast.error("Payment completed successfully", {
        position: toast.POSITION.TOP,
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
      const result = await axios.post("http://localhost:4000/api/checkout",{amount:totalPrice*100}); //firebase store ==> order Id
      console.log(result);
      // if (!result) {
      //   alert("Server error. Are you online?");
      //   return;
      // }

      // Getting the order details back
      const {amount,currency } = result.data;
      console.log("orderof Dhruvi",result.data.order.id);
      const apiKey = await axios.get("http://localhost:4000/api/getKey");
      console.log("KEY", apiKey.data.key);
      const { key } = apiKey.data;
      console.log(totalPrice)
      const options = {
        key: key, // Enter the Key ID generated from the Dashboard
        amount: amount,
        currency: currency,
        name: "Shopsify",
        description: "Test Transaction",
        callback_url: "http://localhost:4000/api/paymentVerification",
        order_id: result.data.order.id,
        handler: async function (response) {
          const data = {
            orderCreationId: result.data.order.id,
            razorpayPaymentId: response.razorpay_payment_id,
            razorpayOrderId: response.razorpay_order_id,
            razorpaySignature: response.razorpay_signature,
          };

          toast.success("Payment completed successfully", {
            position: toast.POSITION.TOP,
            autoClose: 2000,
          });
          addList(result.data.order.id);
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
  console.log(name);
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
          <label className="block mb-2 font-bold" htmlFor="email">
            Email
          </label>
          <input
            className="border text-black border-gray-300 px-3 py-2 rounded-md w-full"
            type="email"
            id="email"
            value={email}
            placeholder="Enter Email"
            onChange={(e) => setEmail(e.target.value)}
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
              // const inputAddress = e.target.value;
              // const regex = /(^(?=.*\bIndia\b).*$)|(^.*\bIN\b.*$)/i;
              // if (
              //   inputAddress.length >= 20 &&
              //   (regex.test(inputAddress) || inputAddress === "")
              // ) {
              //   setAddress(inputAddress);
              //   setError("");
              // } else if (inputAddress.length < 20) {
              //   setError("Address must be at least 20 characters long!");
              // } else {
              //   setError("Only Indian addresses are allowed!");
              // }
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

      {error && <p className="text-red-600 font-semibold">{error}</p>}
    </div>
  );
};

export default Payment;
