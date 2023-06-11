const express = require("express");
const router  = express.Router();
const bodyParser = require("body-parser")
require("dotenv").config()
const stripe = require("stripe")(process.env.STRIPE_KEY)
const endpointSecret = 'whsec_85afb8dc0f37c86c4b95dc0a0ce7e9087f4a067a4876e084f776b566794161bf';

// creating order using the webhooks
router.post('/', express.raw({type: 'application/json'}),async (req, res) => {
    // try {
    //   const rawBody =  req.body
    //   const signature =  req.headers['stripe-signature']
    //   const event =  stripe.webhooks.constructEvent(rawBody,signature,"whsec_85afb8dc0f37c86c4b95dc0a0ce7e9087f4a067a4876e084f776b566794161bf");

    //   if(event.type === 'checkout.session.completed'){
    //     const session = event.data.object;
    //     const line_items = await stripe.checkout.sessions.listLineItems(event.data.object.id);
    //     console.log(line_items)
    // }
    // } catch (err) {
    //   console.log(err)
    // }

    let raw =  await req.body;
    let event;
  if (endpointSecret) {
    const signature =  req.headers['stripe-signature'];
    try {
      event = await stripe.webhooks.constructEvent(
        raw,
        signature,
        'whsec_85afb8dc0f37c86c4b95dc0a0ce7e9087f4a067a4876e084f776b566794161bf'
      );
      console.log("Webhook verified")
    } catch (err) {
      console.log(`⚠️  Webhook signature verification failed.`, err);
      return res.sendStatus(400);
    }
  }


  switch (event.type) {
    case 'payment_intent.succeeded':
      const paymentIntent = event.data.object;
      console.log(`PaymentIntent for ${paymentIntent.amount} was successful!`);
      // Then define and call a method to handle the successful payment intent.
      // handlePaymentIntentSucceeded(paymentIntent);
      break;
    case 'payment_method.attached':
      const paymentMethod = event.data.object;
      // Then define and call a method to handle the successful attachment of a PaymentMethod.
      // handlePaymentMethodAttached(paymentMethod);
      break;
    default:
      // Unexpected event type
      console.log(`Unhandled event type ${event.type}.`);
  }

  // Return a 200 response to acknowledge receipt of the event
  res.send().end();

  })

  

module.exports = router