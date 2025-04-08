import express from "express";
import cors from "cors";
import Stripe from "stripe";

const app = express();
const PORT = 8080;

app.use(cors({origin: "http://localhost:5173"}));

const stripe = new Stripe(
  "TOOD"
);

app.get("/", (_req, res) => {
  res.status(200).json({message: "Hello from the backend!"});
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
