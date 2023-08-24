const User =require('../model/User')
const jwt=require('jsonwebtoken')

const createToken= (_id)=>{
    return jwt.sign({_id},process.env.SECRET,{expiresIn:'60d'})
  
  }


const signup= async (req,res)=>
{
    const{username,email,password,phone,address1,province,city}=req.body
    try {
        const user=await User.creates(username,email,password,phone,address1,province,city)
        const token=createToken(user._id)
        res.status(200).json({username,email,token})
    } catch (error) {
        res.status(400).json({error:error.message,username})
    }
    

}
const login = async(req,res)=>
{
    const {email,password}= req.body
    try {
        const user = await User.logins(email, password)
    
        // create a token
        const token = createToken(user._id)
    
        res.status(200).json({email, token,name:user.username,address:user.address1,phone:user.phone,id:user._id})
      } catch (error) {
        res.status(400).json({error: error.message})
      }
}
module.exports={signup,login}