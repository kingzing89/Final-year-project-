const mongoose =require('mongoose')
const Schema = mongoose.Schema

const MedicinesSchema = new Schema({
    
 medicinename: {
    type: String,
    require: true

 },
 drugname:{
    type:String,
    require:true
 },
 size:{
    type:String,
    require:true
 },
 manufacture:{
    type:String,
    require:true
 },
 category: {
    type: String,
    require: true,
    default: "General"
 },
 price: {
    type: Number,
    required: true,


 },
 quantity: {
    type: Number,
    required: true,
 },
 expirydate:{
    type:Date,
    require:true
 },

 myFile: {
    type: String,
},


 shopuser: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'shopuser'
 }
})
MedicinesSchema.statics.getmed = async function(shops)
{
    const medicine= await this.find({shopuser:`${shops}`})
    return medicine
}
MedicinesSchema.statics.getcat= async function(shop,category)
{ 
    const medicine= await this.find({shopuser:`${shop}`,category:`${category}`})
    console.log(medicine)
    return medicine
}


module.exports= mongoose.model('medicine',MedicinesSchema)