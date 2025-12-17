import { loadStripe } from "@stripe/stripe-js";

const publishableKey = process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY;
if (!publishableKey) throw new Error(`Missing Stripe publishable key`);

export const stripePromise = loadStripe(publishableKey);
