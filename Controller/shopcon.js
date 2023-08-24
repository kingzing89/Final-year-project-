const Shop= require('../Modules/Shop')
const jwt=require('jsonwebtoken')

const createToken= (_id)=>{
  return jwt.sign({_id},process.env.SECRET,{expiresIn:'60d'})

}
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
     const shopuser= await Shop.find({},{shopname:1,shopaddress:1,phone:1,shopuser:1})
     console.log(shopuser)
     res.status(200).json(shopuser)
  } catch (error) {
    
  }
}
module.exports={addshop,shoplogin,shopinfos}