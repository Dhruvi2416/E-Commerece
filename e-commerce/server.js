const express = require("express");
const cors = require("cors");
const app = express();
const port = 5000;

// Middlewares
app.use(cors());

// Routes
const paymentRouter = require("./routes/payment");
app.use("/paymentSuccess", paymentRouter);
app.get("/", (req, res) => {
  res.send("Hello, Server is running!");
});
app.get("/paymentSuccess/orders", (req, res) => {
  // Handle the GET request and send the response
  res.send("GET request to /paymentSuccess/orders");
});
// Start the server
app.listen(port, () => console.log(`Server started on port ${port}`));
