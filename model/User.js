const mongoose =require('mongoose')
const bcrypt=require('bcrypt')
const validator= require('validator')
const Schema = mongoose.Schema


const userSchema = new Schema({
    username:{
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
        require:true,
     

    },
    phone:{
        type:Number,
        required:true,
        minlength:11,
        maxlenth:11,
        unique:true
    },
    address1:{
        type:String,
        required:true

    },
    province:{
        type:String,
        required:true

    },
    city:{
        type:String,
        required:true,

    },
    createdAt: {
        type: Date,
        default: () => Date.now(),
        immutable:true
      },
    updateAt:{
        type:Date,
        default:()=>Date.now()
    }
})

userSchema.statics.creates= async function(username,email,password,phone,address1,province,city){
    if(!username||!email||!phone||!password||!address1||!province||!city)
    {  console.log(username,email,password,address1,province,city)
        throw Error("Fields are empty")
       
    }
    const exist = await this.findOne({email,phone})
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
    const user=await this.create({username,email,password:hash,phone,address1,province,city})
    return user
}
userSchema.statics.logins= async function(email,password)
{
    if(!email||! password)
    {
        throw Error("Field is empty")
    }
    const user=  await this.findOne({email})
    console.log(email)
    if(!user)
    {  
        throw Error("incorrect Email or password")
    }
    const match =await bcrypt.compare(password,user.password)
    if(!match)
    {    console.log(user)
        throw Error("Incorrect Email or password")
    }
    return user
}

module.exports=mongoose.model('User',userSchema)