import express from "express";
import cors from "cors";
import Stripe from "stripe";

const app = express();
const PORT = 8080;

app.use(cors({origin: "https://a219-192-80-173-215.ngrok-free.app"}));

const stripe = new Stripe("sk_test_XXXXX");

app.post("/create-checkout-session", async (_req, res) => {
  const session = await stripe.checkout.sessions.create({
    line_items: [{price: "price_1RCYqkJlab83P8XliNx5GK7W", quantity: 10}],
    mode: "payment",
    ui_mode: "custom",
    return_url: "https://a219-192-80-173-215.ngrok-free.app",
    shipping_address_collection: {
      allowed_countries: ["JP"],
    },
    payment_method_configuration: "pmc_1RBTBhJlab83P8XlE3fNopmc",
    shipping_options: [{shipping_rate: "shr_1RCZIJJlab83P8XlzYAy82PA"}],
  });

  res
    .status(200)
    .json({checkoutSessionClientSecret: session.client_secret ?? ""});
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
