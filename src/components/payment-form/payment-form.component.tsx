// React and hooks
import { useState } from "react";

// Type-only imports
import type { FormEvent } from "react";
import type { StripeCardElement } from "@stripe/stripe-js";

// Third-party libraries
import { useSelector } from "react-redux";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";

// Store selectors
import { selectCartTotal } from "../../store/cart/cart.selector";
import { selectCurrentUser } from "../../store/user/user.selector";

// Components
import Button, { BUTTON_TYPE_CLASSES } from "../button/button.component";

// Styles
import { PaymentFormContainer, FormContainer } from "./payment-form.styles";
import { LoadingText, Dots } from "../button/button.styles";

const ifValidCardElement = (
  card: StripeCardElement | null
): card is StripeCardElement => card !== null;

export default function PaymentForm() {
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);

  const stripe = useStripe();
  const elements = useElements();

  const cartTotal = useSelector(selectCartTotal);
  const currentUser = useSelector(selectCurrentUser);

  const paymentHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!stripe || !elements) return;

    if (cartTotal <= 0) {
      alert("Your cart is empty");
      return;
    }

    setIsProcessingPayment(true);

    const response = await fetch("/api/create-payment-intent", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ amount: cartTotal * 100 }),
    });

    const {
      paymentIntent: { client_secret },
    } = await response.json();

    const cardDetails = elements.getElement(CardElement);

    if (!ifValidCardElement(cardDetails)) return;

    const paymentResult = await stripe.confirmCardPayment(client_secret, {
      payment_method: {
        card: cardDetails,
        billing_details: {
          name: currentUser ? currentUser.displayName : "guest",
        },
      },
    });

    // Simulate processing time to show UI feedback
    await new Promise((resolve) => setTimeout(resolve, 2000));

    setIsProcessingPayment(false);

    if (paymentResult.error) {
      alert(paymentResult.error.message);
    } else {
      if (paymentResult.paymentIntent.status === "succeeded") {
        alert("Payment Successful");
      }
    }
  };

  return (
    <PaymentFormContainer>
      <FormContainer onSubmit={paymentHandler}>
        <h2>Credit Card Payment: </h2>
        <CardElement />
        <Button
          disabled={isProcessingPayment}
          buttonType={BUTTON_TYPE_CLASSES.inverted}
        >
          {isProcessingPayment ? (
            <LoadingText>
              Processing payment <Dots />
            </LoadingText>
          ) : (
            "Pay Now"
          )}
        </Button>
      </FormContainer>
    </PaymentFormContainer>
  );
}
