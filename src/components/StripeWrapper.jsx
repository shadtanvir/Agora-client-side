import {
  CardElement,
  Elements,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Provider/AuthProvider";
import UseAxiosSecure from "../hooks/UseAxiosSecure";
import Swal from "sweetalert2";
import { useNavigate } from "react-router";

// Load Stripe with your public key
const stripePromise = loadStripe(
  "pk_test_51SDRfg2MFGEO89SevuUKaGRP8bOaYtYvcvA70BtZgXFCfxUS39iXqqQPXnRNmYHElOgYdGQthgQtd8zgMUshT6rd00QFkHD7Su"
);

const CheckoutForm = ({ amount }) => {
  const { user } = useContext(AuthContext);
  const stripe = useStripe();
  const elements = useElements();
  const [clientSecret, setClientSecret] = useState("");
  const axiosSecure = UseAxiosSecure();
  const navigate = useNavigate();

  useEffect(() => {
    if (amount > 0) {
      axiosSecure
        .post("/create-payment-intent", {
          amount,
          user: { name: user.displayName, email: user.email },
        })
        .then(({ data }) => {
          console.log("Client secret:", data.clientSecret);
          setClientSecret(data.clientSecret);
        });
    }
  }, [amount, axiosSecure, user]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) return;

    const card = elements.getElement(CardElement);
    if (!card) return;

    const { error, paymentIntent } = await stripe.confirmCardPayment(
      clientSecret,
      {
        payment_method: { card },
      }
    );

    if (error) {
      console.error(error.message);
      alert(error.message);
    } else if (paymentIntent.status === "succeeded") {
      // upgrade badge

      await axiosSecure.patch(`/users/upgrade/${user.email}`);
      Swal.fire({
        title: "Payment Successful",
        text: "You are now a Gold Member!",
        icon: "success",
        confirmButtonText: "Go to Home",
      }).then(() => {
        navigate("/"); // redirect to home
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <CardElement className="border p-2 rounded" />
      <button
        className="p-2 bg-green-600 text-white mt-2 rounded-xl"
        type="submit"
        disabled={!stripe || !clientSecret}
      >
        Pay {amount} USD
      </button>
    </form>
  );
};

// Wrapper that provides Stripe context
const StripeWrapper = ({ amount }) => (
  <Elements stripe={stripePromise}>
    <CheckoutForm amount={amount} />
  </Elements>
);

export default StripeWrapper;
