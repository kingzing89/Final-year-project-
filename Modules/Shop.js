const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const validator = require('validator')
const Schema = mongoose.Schema

const shopSchema = new Schema({
    ownername: {
        type: String,
        required: true
    },
    shopname: {
        type: String,
        required: true
    },

    phone: {
        type: Number,
        required: true,
        minlength: 11,
        maxlenth: 11,
        unique: true

    },
  
    shopaddress: {
        type: String,
        required: true
    },

    city: {
        type: String,
        required: true,

    },
    myFile: {
        type: String,
    },
    myPresc:{
        type:String
    },
    createdAt: {
        type: Date,
        default: () => Date.now(),

    },

    shopuser: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'shopuser'
    },
    isApproved: {
        type: Boolean,
        default: false
    }
})
/*
shopSchema.statics.addshop= async function(ownername,shopname,email,password,phone,address1,shopaddress,province,city)
{
    if(!ownername||!shopname ||!email||! password|| !address1||!shopaddress||!province||!city)
    {
        throw Error("Fields are empty")
    }
    const exists= await this.findOne({email, ownername,shopaddress})
    if(exists)
    {
        let check2= await this.findOne({email})
        if(check2){
            throw Error("Shop Already exist")

        }     
    }
   if(!validator.isEmail(email))
   {
     throw Error("Email is not valid") 
   }
   if(!validator.isStrongPassword(password))
   {
      throw Error("Password is not Strong enough")
   }

    const salt = await bcrypt.genSalt(10)
    const hash= await bcrypt.hash(password,salt)
    num=Number.parseInt(phone)
    const shop= await this.create({ ownername,shopname,email,password:hash,phone:num,address1,shopaddress,province,city})
    return shop

}
shopSchema.statics.shopid= async function( ownername,shopname,email){
    if(!email||! ownername||!shopname)
    {
        throw Error("Field is empty")
    }
    const shop= await this.findOne({email,shopname, ownername})
    if (!shop)
    {
        throw Error("Shop not found")
    }

    return shop._id
    

}
shopSchema.statics.login= async function(email,password){
    if(!email||! password)
    {
        throw Error("Field is empty")
    }
    const shopuser=  await this.findOne({email})
    if(!shopuser)
    {
        throw Error("incorrect Email")
    }
    const match =await bcrypt.compare(password,shopuser.password)
    if(!match)
    {
        throw Error("Incorrect Email or password")
    }
    return shopuser
}
shopSchema.statics.allshop= async function()
{
    const shopuser =await this.find({},{shopaddress:1,ownername:1}).exec()
    console.log(shopuser)
    return shopuser
}
*/
const Shops = mongoose.model('Shop', shopSchema);
module.exports = Shops;