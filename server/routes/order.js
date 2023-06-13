const router = require("express").Router();
const Order = require("../models/Order");
const { route } = require("./cart");
const { verifyToken, verifyTokenAndAdmin, verifyTokenAndAuthorization } = require("./verifyToken");

//CREATE  ORDER
router.post("/",verifyToken,async(req,res)=>{
    const newOrder = new Order(req.body);
    try {
       const savedOrder =  await newOrder.save();
        res.status(200).json(savedOrder)
    } catch (err) {
        res.status(500).json(err)
    }
})

//UPDATE ORDER
router.put("/:id",verifyTokenAndAdmin,async(req,res)=>{
    try {
        const updatedOrder = await Order.findByIdAndUpdate(req.params.id,{$set:req.body},{new:true});
        res.status(200).json(updatedOrder)
    } catch (err) {
        res.status(500).json(err)
    }
})

// router.put("/",verifyTokenAndAuthorization,async(req,res)=>{
//     try {
//         const updatedOrder = await Order.findOneAndUpdate({payment_intent:req.body.payment_intent_client_secret},{$set:{status:"paid"}},{new:true});
//         res.status(200).json(updatedOrder)
//     } catch (err) {
//         res.status(500).json(err)
//     }
// })

//DELETE ORDER
router.delete("/:id",verifyTokenAndAdmin,async(req,res)=>{
    try {
        await Order.findByIdAndDelete(req.params.id);
        res.status(200).json("Order delted successfully")
    } catch (err) {
        res.status(500).json(err)
    }
})

//GET USER ORDER
router.get("/find/:id",verifyTokenAndAuthorization,async(req,res)=>{
    try {
        const orders = await Order.find({userId:req.params.id})
        res.status(200).json(orders)
    } catch (err) {
        res.status(500).json(err)
    }
})

//GET ALL ORDERS
router.get("/",verifyTokenAndAdmin, async(req,res)=>{
    try {
        const orders = await Order.find();
        res.status(200).json(orders)
    } catch (err) {
        res.status(500).json(err)
    }
})

//GET INCOME STATS
router.get("/income",verifyTokenAndAdmin, async(req,res)=>{
    const productId = req.query.pid;
    const date = new Date();
    const lastMonth = new Date(date.setMonth(date.getMonth()- 1))
    const date2 = new Date();
    const monthBeforeLast = new Date(date2.setMonth(lastMonth.getMonth() - 1))
    try {
    const income = await Order.aggregate([
        {$match:{createdAt:{$gte:monthBeforeLast},...(productId && {
           products:{$elemMatch:{productId}} 
        })}},
        {$project:{
            month:{ $month:"$createdAt" },
            sales:"$amount"
        }},
        {$group:{
            _id:"$month",
            total:{$sum:"$sales"}
        }}
    ]).sort({_id:1})
    res.status(200).json(income)           
} catch (err) {
       res.status(500).json(err) 
}
})

module.exports= router;