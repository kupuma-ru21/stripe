import {
  AddressElement,
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

  const handleExpressCheckout = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await checkout.confirm();
    } catch (error) {
      window.alert("Error: " + error);
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleExpressCheckout}>
      <ExpressCheckoutElement onConfirm={handleConfirmExpressCheckout} />
      <AddressElement options={{mode: "billing"}} />
      <PaymentElement />
      <button>Submit</button>
    </form>
  );
}
