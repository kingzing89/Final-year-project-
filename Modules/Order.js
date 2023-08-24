const mongoose=require('mongoose')
const Medicine=require('./Medicines')
const User=require('../model/User')
const Shop=require('./Shop')
const Shopsuser=require('./shopuser')
const Schema=mongoose.Schema

const norderSchema =new Schema({
    medicineid:{
        type:Schema.Types.ObjectId,
        ref:"medicine",
        required:true
    },
    medicinename:{
        type:String
    },
    user:{
        type:Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    useremail:{
        type:String
    },
    phone:{
        type:Number
    },
    size:{
            type:String
    },

    quantity:{
        type:Number,
        require:true
    },
    price:{
        type:Number,
        require:true
    },
    shop:{
        type:Schema.Types.ObjectId,
        ref:"shopuser",
        required:true
    },
    shopname:{
      type:String
    },
    status:{
        type:String
    },
    deliveryaddress:{
        type:String
    },
    createdAt: {
        type: Date,
        default: () => Date.now(),
        immutable:true
      },
})

norderSchema.statics.createsorder= async function(users,medicines)
{   (users,medicines)    
    const status='InProcess' 
    let list=[]
    let quant=0
    let quant1=0
    const object=new Object
    for (let index = 0; index < medicines.length; index++) {
        const element = medicines[index];
        let shopu= await Shopsuser.findById({_id:element.shopuser})
        let shops= await Shop.findOne({shopuser:shopu._id})
        console.log(shops.shopname)
        object.medicineid=element._id
        object.medicinename=element.medicinename   
        object.user=users.id
        object.useremail=users.email
        object.phone=users.phone
        object.size=element.size
        object.size=element.size
        object.shop=element.shopuser
        object.shopname=shops.shopname
        object.status=status
        object.deliveryaddress=users.address
        object.quantity=element.quantity
        object.price=element.price*element.quantity
        let orders= await this.create(object)
        
    }
  
    return list

}

norderSchema.statics.getordershop= async function(shopsuser)
{   const shopusers= await Shopsuser.findById({_id:shopsuser})
   // const checkshop=await Shop.findOne({shopuser:shopusers._id})
 const findshop= await this.find({shop:shopusers._id})
    return findshop
}
norderSchema.statics.getordersuser= async function(users)
{
    const checkuser= await User.findById({_id:users})
    console.log(checkuser)
    if(!checkuser)
    {
        throw Error("User Don't Exist")
    }
    let userorder=await this.find({user:users}).sort({createdAt:-1})
    
    return userorder
}
norderSchema.statics.getordersusere= async function(users)
{
    const checkuser= await User.find({email:users})
    console.log(checkuser)
    if(!checkuser)
    {
        throw Error("User Don't Exist")
    }
    let userorder=await this.find({useremail:users}).sort({createdAt:-1})
    
    return userorder
}
module.exports=mongoose.model('Order',norderSchema)