const express=require('express'); 
const {getproducts,getprocat}= require('../Controller/medcon')
const router = express.Router();
router.get('/getproducts',getproducts)
router.get('/getproductscat',getprocat)


module.exports=router
