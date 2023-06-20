

import { app } from "./app.js";
import Razorpay from "razorpay";
//instance created by razorpay for payment
export const instance = new Razorpay({
  key_id: "rzp_test_YfGYBozbVBlICQ",
  key_secret: "TgAoooqifiFOtmWuxzqH8ZTL",
});

const port = 4000;
app.listen(port, () => console.log(`You are on ${port}`));
