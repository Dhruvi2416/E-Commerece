// const express = require("express");
// const router = express.Router();
// const Razorpay = require("razorpay");

// router.post("/orders", async (req, res) => {
//   console.log("dhruvi")
//   try {
//     const instance = new Razorpay({
//       key_id: "rzp_test_YfGYBozbVBlICQ",
//       key_secret: "TgAoooqifiFOtmWuxzqH8ZTL",
//     });

//     const options = {
//       amount: 50000, // amount in smallest currency unit
//       currency: "INR",
//       receipt: "receipt_order_74394",
//     };

//     const order = await instance.orders.create(options);
//     console.log("order"); // Corrected line

//     if (!order) return res.status(500).send("Some error occurred");

//     res.json(order);
//   } catch (error) {
//     res.status(500).send(error);

//   }
// });

// module.exports = router;

import express from "express";

import { checkout, paymentVerification } from "../controller/paymentController.js";
const router = express.Router();
router.route("/checkout").post(checkout);
router.route("/paymentVerification").post(paymentVerification)
export default router;
