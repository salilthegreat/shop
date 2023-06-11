import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { userRequest } from "../requestMethods";
// import { useSelector } from "react-redux";
import CheckoutForm from "../components/CheckoutForm";
import { cart } from "../demoData";

const stripePromise = loadStripe("pk_test_51NEBEuSELDocXWyyOm8ORt39LcYE2wew6WKCcZgGPOZuKQ7krDSpf0WqYIMf9jZWSCwmfyG8Avb8NWvBME57w81p00AK2oyoEz");

const Pay = () => {
    // const cart = useSelector(state => state.cart)
    const [clientSecret, setClientSecret] = useState("");
    useEffect(() => {
        const makeRequest = async () => {
            try {
                const res = await userRequest.post(`/gateway/create-payment-intent`, {cart});
                setClientSecret(res.data.clientSecret)
            } catch (err) {
                console.log(err)
            }
        }
        makeRequest()
    }, []);

    const appearance = {
        theme: 'stripe',
    };
    const options = {
        clientSecret,
        appearance,
    };

    return (
        <div>
            {clientSecret && (
                <Elements options={options} stripe={stripePromise}>
                    <CheckoutForm />
                </Elements>
            )}
        </div>
    )
}

export default Pay