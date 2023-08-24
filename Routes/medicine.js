const express = require("express")
const fetchuser = require("../middleware/fetchuser")
const router = express.Router()
const Medicines = require("../Modules/Medicines")
const { body, validationResult } = require('express-validator');
const { findById, findByIdAndUpdate } = require("../Modules/Medicines");
var mongoose = require('mongoose');


// route to Add a new medicine USING POST
router.get("/fetchallmedicines", fetchuser, async (req, res) => {

    const meds = await Medicines.find({ shopuser: req.user.id })
    res.json(meds);


})

router.post("/addmedicines",fetchuser,[
    body('medicinename', "invalid  name").isLength({ min: 5 }),
    body('drugname', "invalid  name").isLength({ min: 4 }),
    body('size', "invalid  size").isLength({ min: 2 }),
    body('manufacture', "invalid  name").isLength({ min: 3 }),
    body('category', "invalid  category").isLength({ min: 4 }),
    body('price', "invalid  price").isNumeric(),
    body('quantity', "invalid  quantity").isInt({ min: 1, max: 100 }),
    

], async (req, res) => {
    try {
        const errors = validationResult(req);

       

        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const { medicinename,drugname,size,manufacture,category, price, quantity, expirydate, myFile } = req.body;

        console.log(req.user.id);

        const userId = req.user.id;
        const medicine = new Medicines({

           medicinename,drugname,size,manufacture,category, price, quantity, expirydate, myFile , shopuser: userId
          

        })
        const savedmedicine = await medicine.save()


        res.json(savedmedicine)
    } catch {
        console.error(error.message)
        res.status(500).send("Internal server error");

    }





})


// Update an existing medicine using Post and Login is Required.
router.put("/updatemedicines/:id",fetchuser,async (req, res) => {
   
        

        const { medicinename,drugname,size,manufacture,category, price, quantity, expirydate, myFile  } = req.body;
        const newMedicine={};
        if(medicinename){
            newMedicine.medicinename = medicinename;
        }
        if(category){
            newMedicine.category = category;
            
        }
        if(price){
            newMedicine.price = price;

        }
        if(quantity){
            newMedicine.quantity = quantity;

        }
        if(drugname){
            newMedicine.drugname = drugname;

        }
        if(size){
            newMedicine.size = size;

        }
        if(manufacture){
            newMedicine.manufacture = manufacture;

        }
        if(expirydate){
            newMedicine.expirydate = expirydate;

        }
        if(myFile){
            newMedicine.myFile = myFile;

        }
        if( !mongoose.Types.ObjectId.isValid(req.params.id) ) return false;
        
        let med = await Medicines.findByIdAndUpdate(req.params.id,{$set:newMedicine}, {new:true});
        
        if (!med) {
            return res.status(404).json("Medicine Not Found");
        }
        console.log(med.shopuser)

        if (med.shopuser.toString() !== req.user.id){
            return res.status(400).send("Access Denied")
        }
        
        
        res.json({med});

        


       



})
// ROUTE 4: Delete an existing medicine using: DELETE "/api/medicine/deletenote". Login required
router.delete('/deletemed/:id', fetchuser, async (req, res) => {
    try {
        // Find the med to be deleted and delete it
        let med = await Medicines.findById(req.params.id);
        if (!med) { return res.status(404).send("Not Found") }

        // Allow deletion only if user owns this Note
        if (med.shopuser.toString() !== req.user.id) {
            return res.status(401).send("Not Allowed");
        }

        med = await Medicines.findByIdAndDelete(req.params.id)
        res.json({ "Success": "Note has been deleted", medicine: med });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})
module.exports = router;
