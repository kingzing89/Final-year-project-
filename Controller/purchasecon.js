const Order = require("../Modules/Order")

const neworder= async(req,res)=>
{
    const {users,products,deliveryaddress}=req.body
   
  
    try {
     let orders = await Order.createsorder(users,products,deliveryaddress)

     res.status(200).json({order:orders})
    } catch (error) {
        res.status(404).json({error:error.message})
    }
}
const getshoporder= async(req,res)=>{

    
    try {
      const getpro=await Order.getordershop()
      console.log(getpro)
      res.status(200).json(getpro)
    } catch (error) {
      res.status(400).json({error: error.message})
    }
}
const getuserorder=async(req,res)=>{
  console.log(req.user.id);
  
  try {
    const userorder= await Order.getordersuser(user)
    res.status(200).json(userorder)

  } catch (error) {
    res.status(400).json({error:error.message})
    
  }
}
const getuserordere=async(req,res)=>{
  const {user}=req.query
  console.log(`${user}`)
  try {
    const userorder= await Order.getordersusere(user)
    res.status(200).json(userorder)

  } catch (error) {
    res.status(400).json({error:error.message})
    
  }
}
module.exports={neworder,getshoporder,getuserorder,getuserordere}