const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv")
const authRoute = require("./routes/auth")
const userRoute = require("./routes/user")
const productRoute = require("./routes/product")
dotenv.config()

app.use(express.json())

mongoose.connect(process.env.MONGO_URL).then(()=>{
    console.log("DB Connection Successful")
}).catch((err)=>console.log(err))

app.use("/api/auth",authRoute)
app.use("/api/users",userRoute)
app.use("/api/products",productRoute)

app.listen(process.env.PORT || 5000,()=>{
    console.log("Backend Server is running!")
})