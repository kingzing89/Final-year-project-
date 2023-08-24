const mongoose =require('mongoose')
const bcrypt=require('bcrypt')
const validator= require('validator')
const Schema =mongoose.Schema

const adminSchema=new Schema({
    user:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
    },
    role:{
        type:String,
        required:true
    }
})


adminSchema.statics.creates= async function(user,email,password,role)
{
    if(!user||!email||!password||!role)
    {  console.log(user,email,password,role)
        throw Error("Fields are empty")
       
    }
    const exist = await this.findOne({email})
    if(exist)
    {
        throw Error("User already exist")

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
    const admin= await this.create({user,email,password:hash})
}

adminSchema.statics.logins = async function(email,password){
    if(!email||! password)
    {
        throw Error("Field is empty")
    }
    const admin = await this.findOne({email})
    if(checkadmin)
    {
        throw Error("Already Exist")

    }
    const match =await bcrypt.compare(password,admin.password)
    if(!match)
    {    console.log(user)
        throw Error("Incorrect Email or password")
    }
    return admin
}

