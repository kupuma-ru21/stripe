import express from "express";
import cors from "cors";
import Stripe from "stripe";

const app = express();
const PORT = 8080;

app.use(cors({origin: "https://ac09-192-80-173-215.ngrok-free.app"}));

const stripe = new Stripe("sk_test_XXXXX");

app.post("/create-checkout-session", async (_req, res) => {
  const session = await stripe.checkout.sessions.create({
    line_items: [{price: "price_1RBofeR3nXIDVJBQUJRrQw6C", quantity: 100}],
    mode: "payment",
    ui_mode: "custom",
    return_url: "http://localhost:5173",
  });
  res
    .status(200)
    .json({checkoutSessionClientSecret: session.client_secret ?? ""});
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
