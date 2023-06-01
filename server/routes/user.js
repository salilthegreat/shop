const User = require("../models/User");
const { verifyTokenAndAuthorization, verifyTokenAndAdmin } = require("./verifyToken");
const CryptoJs = require("crypto-js")

const router = require("express").Router();

//UPDATE USER
router.put("/:id", verifyTokenAndAuthorization, async (req, res) => {
    if (req.body.password) {
        req.body.password = CryptoJs.AES.encrypt(req.body.password, process.env.PASS_SEC).toString()
    }
    try {
        const updatedUser = await User.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true });
        res.status(200).json(updatedUser)
    } catch (err) {
        res.status(500).json(err)
    }
})

//DELETE USER
router.delete("/:id", verifyTokenAndAuthorization, async (req, res) => {
    try {
        await User.findByIdAndDelete(req.params.id)
        res.status(200).json("User has been deleted")
    } catch (err) {
        res.status(500).json(err)
    }
})

//GET USER
router.get("/find/:id", verifyTokenAndAdmin, async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        const { password, ...others } = user;
        res.status(200).json(others._doc)
    } catch (err) {
        res.status(500).json(err)
    }
})

//GET ALL USERS
router.get("/", verifyTokenAndAdmin, async (req, res) => {
    try {
        const query = req.query.new
        const users = query ? await User.find().sort({ _id: -1 }).limit(5) : await User.find(); //limit for no of user,and -1 for sorting so the latest one comes first
        res.status(200).json(users)
    } catch (err) {
        res.status(500).json(err)
    }
})

//GET USER STATS
router.get("/stats", verifyTokenAndAdmin, async (req, res) => {
    try {
        const date = new Date();
        const lastYear = new Date(date.setFullYear(date.getFullYear() - 1));
        const data = await User.aggregate([
            { $match:{createdAt:{$gt:lastYear}}},
            {$project:{
                month:{$month:"$createdAt"}
            }},
            {$group:{
                _id:"$month",
                total:{$sum:1}
            }
        }])
        res.status(200).json(data)
    } catch (err) {
        console.log(err)
    }
})

module.exports = router;