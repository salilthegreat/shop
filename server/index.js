const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv")
const authRoute = require("./routes/auth")
const userRoute = require("./routes/user")
const productRoute = require("./routes/product")
const cartRoute = require("./routes/cart")
const orderRoute = require("./routes/order")
const stripeRoute = require("./routes/stripe");
const webhookRoute = require("./routes/webhook")
// const paymentRoute = require("./routes/paymentgateway")

const cors = require("cors")
const morgan = require("morgan")

dotenv.config()
app.use("/api/webhook",webhookRoute)

app.use(express.json())

mongoose.connect(process.env.MONGO_URL).then(()=>{
    console.log("DB Connection Successful")
}).catch((err)=>console.log(err))

app.use(cors())
app.use(morgan('common'))
app.use("/api/auth",authRoute)
app.use("/api/users",userRoute)
app.use("/api/products",productRoute)
app.use("/api/carts",cartRoute)
app.use("/api/orders",orderRoute)
app.use("/api/checkout",stripeRoute)
// app.use("/api/gateway",paymentRoute)

app.listen(process.env.PORT || 5000,()=>{
    console.log("Backend Server is running!")
})