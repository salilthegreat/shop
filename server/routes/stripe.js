const router = require("express").Router();
require("dotenv").config()
const stripe = require("stripe")(process.env.STRIPE_KEY)

router.post('/payment', async (req, res) => {
    const line_items = req.body.cartItems.map((item)=>
        ({
                price_data: {
                    currency: "inr",
                    product_data: {
                        name: item.name,
                        images: [item.image],
                        description: item.desc,
                    },
                    unit_amount: item.price*100,
                },
                quantity: item.quantity,
            }
            )
    )
    const session = await stripe.checkout.sessions.create({
        shipping_address_collection: {
            allowed_countries: ['US', 'IN'],
          },
          shipping_options: [
            {
              shipping_rate_data: {
                type: 'fixed_amount',
                fixed_amount: {
                  amount: 0,
                  currency: 'inr',
                },
                display_name: 'Free shipping',
                delivery_estimate: {
                  minimum: {
                    unit: 'business_day',
                    value: 5,
                  },
                  maximum: {
                    unit: 'business_day',
                    value: 7,
                  },
                },
              },
            },
            {
              shipping_rate_data: {
                type: 'fixed_amount',
                fixed_amount: {
                  amount: 15000,
                  currency: 'inr',
                },
                display_name: 'Next day air',
                delivery_estimate: {
                  minimum: {
                    unit: 'business_day',
                    value: 1,
                  },
                  maximum: {
                    unit: 'business_day',
                    value: 1,
                  },
                },
              },
            },
          ],
        line_items,
        mode: 'payment',
        success_url: `http://localhost:3000/success`,
        cancel_url: `http://localhost:3000`,
    });

    //   res.redirect(303, session.url);
    res.send({ url: session.url })
});

module.exports = router
// router.listen(4242, () => console.log('Running on port 4242'));