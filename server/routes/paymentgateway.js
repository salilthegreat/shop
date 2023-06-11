const Order = require("../models/Order");
const {  verifyTokenAndAuthorization } = require("./verifyToken");
const router = require("express").Router();
require("dotenv").config()
const stripe = require("stripe")(process.env.STRIPE_KEY)


const calculateOrderAmount = (itms) => {
  return 140000;
};

router.post("/create-payment-intent",verifyTokenAndAuthorization, async (req, res) => {
  // const items  = req.body.cart.products;

  try {
  const paymentIntent = await stripe.paymentIntents.create({
    amount: calculateOrderAmount(),
    currency: "inr",
    automatic_payment_methods: {
      enabled: true,
    },
  });
  const newOrder = new Order({
    "userId":req.user.id,
    "products": req.body.cart.products.map((item)=>(
      {
        "productId":item._id,
        "quantity":item.quantity,
      }
      ))
      ,
      "amount":calculateOrderAmount(),
      "address":"paymentIntent.shipping",
      "payment_intent":paymentIntent.client_secret
    })
    await newOrder.save()
    
    res.status(200).send({
      clientSecret: paymentIntent.client_secret,  
    });
  } catch (error) {
    console.log(error)
  }
});


module.exports = router