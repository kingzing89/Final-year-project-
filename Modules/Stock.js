const mongoose= require('mongoose');
const Schema= mongoose.Schema
const Product = require('./Product')
const Shop=require('./Shop')

const stockSchema= new Schema({
    item:{
        type:Schema.ObjectId,
        ref:"Product",
        required:true

    },
    stock:{
        type:Number,
        required:true
    },
    price:{
        type:Number,
        requred:true
    },
    image:{
        type:String,

    },
    shop:{
        type:Schema.ObjectId,
        ref:"Product",
        required:true
    }
    
})
stockSchema.statics.addstock= async function(name,drugname,categories,size,stock,price,image,ownername,shopname,email){
    const products= await Product.checkproduct(name,drugname,size)
    if(!quantity||!price)
    {
        throw Error("Field is empty")
    }
    let id=products._id
    const shops=await Shop.shopid(ownername,shopname,email)
    let shopid=shops._id
    const stocks = await this.create({item:id,stock,price,image,shop:shopid})
    return stocks

}

module.exports=mongoose.model("Stock",stockSchema)