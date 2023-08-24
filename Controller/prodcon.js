const Product=require('../model/Product')

const addproduct= async(req, res)=>{
  const {name, drugname,category,size,price,image,shop,mfg,exp,quantity} = req.body
  try {
    //const addproduct=await Product.addproduct(name,drugname,categories,size)
    const addproduct=await Product.addproduct(name, drugname,category,size,price,image,shop,mfg,exp,quantity)
    res.status(200).json({id:addproduct._id,name,drugname})
    console.log(addproduct)
  } catch (error) {
    res.status(400).json({error: error.message})
  }
  
}

const getproducts =async(req,res)=>
{ 
    
  const {shop}=req.query
  console.log(`${shop}`)
  try {
    const getpro=await Product.getmed(shop)
    console.log(getpro)
    res.status(200).json(getpro)
  } catch (error) {
    res.status(400).json({error: error.message})
  }
}

const pro=async (req, res) => {
  res.send(req.params.bookId)
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
module.exports={addproduct,getproducts,pro,getprocat}