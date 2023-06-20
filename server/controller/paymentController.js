import { instance } from "../server.js";

export const checkout = async (req, res) => {
  try {
    const options = {
      amount: req.body.amount, // amount in smallest currency unit
      currency: "INR",
    };

    const order = await instance.orders.create(options);
  

    res.status(200).json({ success: true, order });
  } catch (error) {
    res.status(500).send(error);
  }
};

export const paymentVerification = async (req, res) => {
  console.log(req.body);
};
