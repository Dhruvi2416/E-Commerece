const router = require("express").Router();
const cors = require("cors"); //acts like a communication bridge between backend and front end
const { v4: uuid } = require("uuid");
const stripe = require("stripe")(
  "sk_test_51NIYnZSBLWM1IpRJLGzixR2Y5KpJhu5Zr82UcZmsutLDyyxLtL8yVTg91uIjpKJDAq9lS1bBLJ4anAMgbpHY1gE6005XK9DMIc"
);

app.use(cors());

app.use(express.json());
app.get("/", (req, res) => {
  res.send("Thanks for buying");
});

router.post("/create-checkout-session", async (req, res) => {
  const session = await stripe.checkout.sessions.create({
    line_items: [
      {
        price_data: {
          currency: "usd",
          product_data: {
            name: "T-shirt",
          },
          unit_amount: 2000,
        },
        quantity: 1,
      },
    ],
    mode: "payment",
    success_url: "/paymentpipe",
    cancel_url: "http://localhost:4242/cancel",
  });

  res.send({ url: session.url });
});
