const Medicines=require('../Modules/Medicines')
const getproducts =async(req,res)=>
{ 
    
  const {shop}=req.query
  console.log(`${shop}`)
  try {
    const getpro=await Medicines.getmed(shop)
    console.log(getpro)
    res.status(200).json(getpro)
  } catch (error) {
    res.status(400).json({error: error.message})
  }
}
const getprocat =async(req,res)=>{
    const {shop,category}=req.query
    try {
      const prod= await Product.getcat(shop,category)
      res.status(200).json(prod)
    } 
    catch (error) {
      res.status(400).json({error: error.message})
    }
  }

module.exports={getproducts,getprocat}