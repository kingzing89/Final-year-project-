const express = require("express")
const fetchuser = require("../middleware/fetchuser")
const router = express.Router()
const Order = require("../Modules/Order")
const { body, validationResult } = require('express-validator');
const { findById, findByIdAndUpdate } = require("../Modules/Order");
var mongoose = require('mongoose');


// route to Add a new medicine USING POST
router.get("/getorder", fetchuser, async (req, res) => {

    const order = await Order.find({ shop: req.user.id }).sort({createdAt:-1})
    res.json(order);


})

module.exports=router