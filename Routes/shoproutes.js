const express =require('express')
const {addshop,shoplogin,shopinfos}=require('../Controller/shopcon')
const router=express.Router();


//router.post('/addshop',addshop)
//router.post('/shoplogin',shoplogin)
router.get("/shopinfos",shopinfos)

module.exports=router
