const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema(
    {
        userId: { type: String, reuired: true },
        products: [
            {
                productId: { type: String },
                quantity: { type: Number, default: 1 }
            }
        ],
        amount: { type: Number, required: true },
        address: { type: Object },
        paymentInfo: {
            id: {
                type: String,
                required: true
            },
            status: {
                type: String,
                required: true
            },
            taxPaid: {
                type: Number,
                required: true
            },
            amountPaid: {
                type: Number,
                required: true
            }
        },
        orderStatus:{
            type:String,
            default:"Processing"
        }
    },
    { timestamps: true },
);

module.exports = mongoose.model("Order", OrderSchema)