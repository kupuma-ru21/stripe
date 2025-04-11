import {
  ExpressCheckoutElement,
  PaymentElement,
  useCheckout,
} from "@stripe/react-stripe-js";
import {StripeExpressCheckoutElementConfirmEvent} from "@stripe/stripe-js";

export function CheckoutForm() {
  const checkout = useCheckout();
  const handleConfirmExpressCheckout = (
    event: StripeExpressCheckoutElementConfirmEvent
  ) => {
    checkout.confirm({expressCheckoutConfirmEvent: event});
  };

  return (
    <form>
      <ExpressCheckoutElement
        onConfirm={handleConfirmExpressCheckout}
        options={{
          shippingRates: [
            {
              id: "shr_XXXXXX",
              amount: 1,
              displayName: "Test Product Shipping",
            },
          ],
        }}
      />
      <PaymentElement />
      <button>Submit</button>
    </form>
  );
}
