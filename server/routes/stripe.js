const Order = require("../models/Order");
const { verifyTokenAndAuthorization } = require("./verifyToken");
const express = require("express")

const router = require("express").Router();
require("dotenv").config()
const stripe = require("stripe")(process.env.STRIPE_KEY)
const bodyParser = require("body-parser")

// router.post('/payment', verifyToken, async (req, res) => {
//   const line_items = req.body.cart.products.map((item) =>
//   ({
//     price_data: {
//       currency: "inr",
//       product_data: {
//         name: item.title,
//         images: [item.img],
//         description: item.desc,
//       },
//       unit_amount: item.price * 100,
//     },
//     quantity: item.quantity,
//   }
//   )
//   )
//   const session = await stripe.checkout.sessions.create({
//     shipping_address_collection: {
//       allowed_countries: ['US', 'IN'],
//     },
//     shipping_options: [
//       {
//         shipping_rate_data: {
//           type: 'fixed_amount',
//           fixed_amount: {
//             amount: 0,
//             currency: 'inr',
//           },
//           display_name: 'Free shipping',
//           delivery_estimate: {
//             minimum: {
//               unit: 'business_day',
//               value: 5,
//             },
//             maximum: {
//               unit: 'business_day',
//               value: 7,
//             },
//           },
//         },
//       },
//       {
//         shipping_rate_data: {
//           type: 'fixed_amount',
//           fixed_amount: {
//             amount: 15000,
//             currency: 'inr',
//           },
//           display_name: 'Next day air',
//           delivery_estimate: {
//             minimum: {
//               unit: 'business_day',
//               value: 1,
//             },
//             maximum: {
//               unit: 'business_day',
//               value: 1,
//             },
//           },
//         },
//       },
//     ],
//     line_items,
//     mode: 'payment',
//     success_url: `http://localhost:3000/success`,
//     cancel_url: `http://localhost:3000`,
//   });
//   if(session.url.substring(session.url.indexOf("0/"+2))==="success"){
//     console.log("Ram")
//   }
//   const newOrder = new Order({

//     "userId": req.user.id,
//     "products": req.body.cart.products.map(item=>({
//       "productId" : item._id,
//       "quantity" : item.quantity
//     })),
//     "amount": req.body.cart.total,
//   }
//   );
//   await newOrder.save();
//   try {
//     res.send({ url: session.url })
//     // res.status(200).json(savedOrder)


//   } catch (err) {
//     res.status(500).json(err)
//   }

//   //   res.redirect(303, session.url);
//   // res.send({ url: session.url })
// });

//Taking payment from user side
router.post(`/payment`, verifyTokenAndAuthorization, async (req, res) => {
  const body = req.body.newCart;
  const userId = req.user.id;
  const shippingInfo = body.shipingAaddress

  const line_items = body?.products?.map((item) => {
    return {
      price_data: {
        currency: 'inr',
        product_data: {
          name: item.title,
          images: [item.img],
          description: item.desc,
          metadata: { productId: item._id }
        },
        unit_amount: item.price * 100,
      },
      tax_rates: ["txr_1NGyzGSELDocXWyyUO72gBw7"],
      quantity: item.quantity
    }
  })

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    success_url: `http://localhost:3000/success`,
    cancel_url: `http://localhost:3000`,
    customer_email: body.currentUser.email,
    client_reference_id: userId,
    mode: 'payment',
    metadata: { 
      street: shippingInfo.street,
      city: shippingInfo.city,
      state: shippingInfo.state,
      phoneNo: shippingInfo.phoneNo,
      zipCode: shippingInfo.zipCode,
      country: shippingInfo.country
     },
    shipping_options: [{
      shipping_rate: "shr_1NGyilSELDocXWyyz0z6ZYN4"
    }],
    line_items
  })

  res.status(200).json({url:session.url})

})


// // creating order using the webhooks
// router.post('/webhook', bodyParser.raw(), (req, res) => {
//   try {
//     const rawBody = req.body
//     const signature = req.headers['stripe-signature']
//     const event = stripe.webhooks.constructEvent(rawBody,signature,"whsec_85afb8dc0f37c86c4b95dc0a0ce7e9087f4a067a4876e084f776b566794161bf");
//     // console.log(event)
//     if(event.type === 'checkout.session.completed'){
//       const session = event.data.object;
//       console.log(session)
//     }
//   } catch (err) {
//     console.log(err)
//   }
// })

// router.post('/webhook', express.raw({type: 'application/json'}), (request, response) => {
//   let event = request.body;
//   // Only verify the event if you have an endpoint secret defined.
//   // Otherwise use the basic event deserialized with JSON.parse
//   if (process.env.WEBHOOK_SEC) {
//     // Get the signature sent by Stripe
//     const signature = request.headers['stripe-signature'];
//     try {
//       event = stripe.webhooks.constructEvent(
//         request.body,
//         signature,
//         process.env.WEBHOOK_SEC
//       );
//     } catch (err) {
//       console.log(`⚠️  Webhook signature verification failed.`, err.message);
//       return response.sendStatus(400);
//     }
//   }

//   // Handle the event
//   switch (event.type) {
//     case 'payment_intent.succeeded':
//       const paymentIntent = event.data.object;
//       console.log(`PaymentIntent for ${paymentIntent.amount} was successful!`);
//       // Then define and call a method to handle the successful payment intent.
//       // handlePaymentIntentSucceeded(paymentIntent);
//       break;
//     case 'payment_method.attached':
//       const paymentMethod = event.data.object;
//       // Then define and call a method to handle the successful attachment of a PaymentMethod.
//       // handlePaymentMethodAttached(paymentMethod);
//       break;
//     default:
//       // Unexpected event type
//       console.log(`Unhandled event type ${event.type}.`);
//   }

//   // Return a 200 response to acknowledge receipt of the event
//   response.send();
// });


module.exports = router
// router.listen(4242, () => console.log('Running on port 4242'));