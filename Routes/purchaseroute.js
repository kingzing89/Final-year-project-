const express=require('express')

const {neworder,getshoporder,getuserorder,getuserordere}=require('../Controller/purchasecon')
const router = express.Router()
router.post('/neworder',neworder)
router.get('/getorders',getshoporder)
router.get('/getuorders',getuserorder)
router.get('/getuorderse',getuserordere)
module.exports=router