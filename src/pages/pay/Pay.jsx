import React, { useEffect, useState } from "react";
import "./Pay.scss";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import newRequest from "../../utils/newRequest";
import { useParams } from "react-router-dom";
import CheckoutForm from "../../components/checkoutForm/CheckoutForm";

// Load the Stripe API with your Stripe Publishable Key
const stripePromise = loadStripe(
  "pk_test_51NO5iWJJjpGoI0Su7PNZ0F6VM8697WT8i2FNyeYPWiQtNH5jYFUfmAYijyUJfhNPfoyC9nH64iZMiz3go3vRWpi800jDFOy4LH"
);

const Pay = () => {
  const [clientSecret, setClientSecret] = useState("");
  // Get the order ID from the route parameters
  const { id } = useParams();

  useEffect(() => {
    const makeRequest = async () => {
      try {
        const res = await newRequest.post(
          `/orders/create-payment-intent/${id}`
        );
        setClientSecret(res.data.clientSecret);
      } catch (err) {
        console.log(err);
      }
    };
    makeRequest();
  }, []);

  const appearance = {
    theme: 'stripe',
  };
  const options = {
    clientSecret,
    appearance,
  };

  return <div className="pay">
    {clientSecret && (
        <Elements options={options} stripe={stripePromise}>
          <CheckoutForm />
        </Elements>
      )}
  </div>;
};

export default Pay;
