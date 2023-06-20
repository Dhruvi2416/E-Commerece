import express from "express";
export const app = express();
import router from "./routes/payment.js";
import cors from "cors";
//cors for cross platform issue
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api", router);

app.get("/api/getKey", (req, res) =>
  res.status(200).json({key: "rzp_test_YfGYBozbVBlICQ"})
);
