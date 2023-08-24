const express = require("express")
const fetchuser = require("../middleware/fetchuser")
const router = express.Router()
const Shop = require("../Modules/Shop")
const { body, validationResult } = require('express-validator');
const { findById, findByIdAndUpdate } = require("../Modules/Shop");
var mongoose = require('mongoose');


// route to fetch a new medicine USING GET
router.get("/fetchallshops", fetchuser, async (req, res) => {

    const shops = await Shop.findOne({  shopuser: req.user.id })
   
    res.json(shops);


})

// Add shops in the database.
router.post("/addshops",fetchuser,[

    body('ownername',"invalid  Name").isLength({ min: 5 }),
    body('shopname',"invalid  shopname").isLength({ min: 4 }),
    body('phone',"invalid phone").isNumeric().isLength({}),
   
    body('shopaddress',"invalid  shopaddress").isLength({ min: 4 }),
   
    body('city',"invalid city").isLength({ min: 4 })

], async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const { ownername, shopname, phone, shopaddress , city , myFile ,myPresc } = req.body;

        console.log(req.user.id);

        const userId = req.user.id;
        console.log( ownername, shopname, phone, shopaddress , city , myFile ,myPresc)
        const shop = Shop.create({ ownername, shopname, phone,shopaddress,city,myFile,myPresc, shopuser:userId})
        //const savedshop = await shop.save();
        res.json(shop)
    } catch {
        
        res.status(500).send("Internal server error");

    }





})

router.put("/updateshops/:id",fetchuser,async (req, res) => {
   
        

    const { ownername , shopname , phone , address , shopaddress , province , city  } = req.body;
    const newShop={};
    if(ownername){
        newShop.ownername=ownername;
    }
    if(shopname){
        newShop.shopname=shopname;
        
    }
    if(phone){
        newShop.phone=phone;

    }
    if(address){
        newShop.address=address;

    }
    if(shopaddress){
        newShop.shopaddress=shopaddress;

    }
    if(province){
        newShop.province=province;

    }
    if(city){
        newShop.city=city;
    }
    if( !mongoose.Types.ObjectId.isValid(req.params.id) ) return false;
    
    let shop = await Shop.findByIdAndUpdate(req.params.id,{$set:newShop}, {new:true});
    
    if (!shop) {
        return res.status(404).json("Shop Not Found");
    }
    console.log(shop.User)

    if (shop.User.toString() !== req.user.id){
        return res.status(400).send("Access Denied")
    } 
    
    res.json({shop});


})



// ROUTE 4: Delete an existing Shop using: DELETE "/api/medicine/deleteShop". Login required
router.delete('/deleteshops/:id', fetchuser, async (req, res) => {
    try {
        // Find the med to be deleted and delete it
        let shop = await Shop.findById(req.params.id);
        if (!shop) { return res.status(404).send("Not Found") }

        // Allow deletion only if user owns this Shop
        if (shop.shopuser.toString() !== req.user.id) {
            return res.status(401).send("Not Allowed");
        }

        shop = await Shop.findByIdAndDelete(req.params.id)
        res.json({ "Success": "Shop has been deleted", Shop: shop });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})




module.exports = router;







/*
const addshop= async (req, res)=>
{
    const { ownername,shopname,email,password,phone,address1,shopaddress,province,city}= req.body
    try {
        const addshop= await Shop.addshop( ownername,shopname,email,password,phone,address1,shopaddress,province,city)
        const token=createToken(addshop._id)
        console.log("Shop created")
        res.status(200).json({id:addshop._id,shopname,email, ownername,token})
    } catch (error) {
        res.status(400).json({error: error.message})
        
    }
}
const shoplogin= async(req,res)=>
{
    const {email,password} =req.body
    try {
        const shopuser= await Shop.login(email,password)
        const token=createToken(shopuser._id)
        console.log("Shop created")
        res.status(200).json({email,token})
    } catch (error) {
        res.status(400).json({error: error.message})
         
    }
}
const shopinfos= async(req,res)=>
{
  try {
     const shopuser= await Shop.find({},{shopname:1,shopaddress:1,phone:1})
     res.status(200).json(shopuser)
  } catch (error) {
    
  }
}
*/