// REF: https://docs.stripe.com/sdks/stripejs-react
// REF: https://docs.stripe.com/checkout/quickstart?lang=node&platform=web
// REF: https://dashboard.ngrok.com/get-started/setup/macos
import {json, type MetaFunction} from "@remix-run/node";
import {CheckoutProvider} from "@stripe/react-stripe-js";
import {loadStripe} from "@stripe/stripe-js";
import {CheckoutForm} from "~/components/checkoutForm";

const stripePromise = loadStripe("pk_test_XXXXXX");

export default function Index() {
  const fetchClientSecret = async () => {
    return fetch(
      "https://1baa-192-80-173-215.ngrok-free.app/create-checkout-session",
      {method: "POST"}
    )
      .then((response) => response.json())
      .then((json) => json.checkoutSessionClientSecret);
  };
  return (
    <CheckoutProvider stripe={stripePromise} options={{fetchClientSecret}}>
      <CheckoutForm />
    </CheckoutProvider>
  );
}

export const meta: MetaFunction = () => {
  return [
    {title: "New Remix App"},
    {name: "description", content: "Welcome to Remix!"},
  ];
};
