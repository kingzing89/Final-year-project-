const express = require("express")

const router = express.Router()

const User = require("../Modules/shopuser")
var jwt = require('jsonwebtoken');


const { body, validationResult } = require('express-validator');
const bycrypt = require("bcryptjs");
const fetchuser = require("../middleware/fetchuser");


// create a user using: Post "/api/auth/". Doesn't require Auth




router.post('/createuser', [body('email', "invalid email").isEmail(),
body('password', "invalid  password").isLength({ min: 5 }),
body('name', "invalid  user").isLength({ min: 3 }),
], async (req, res) => {
    let success=false;
    const errors = validationResult(req);


    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const salt = await bycrypt.genSalt(10)

    secPass = await bycrypt.hash(req.body.password, salt)
    try {
        let user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: secPass
            
        })
        
        data ={
            user:{
                id:user.id


            }
          
        }
        
        jwstSecret = "Fara*z";
        
        var authtoken = jwt.sign(data, jwstSecret);
        success=true;
        res.status(200).json({success,authtoken});
        
    } catch (error) {
        success=false;
        console.log(error.message);
        res.status(500).send("Some Error occured");
    }











})
router.post("/login", [body('email', "invalid email").isEmail(),
body('password', "invalid  password").exists()], async (req, res) => {
    let success=false;
    const errors = validationResult(req);


    if (!errors.isEmpty()) {
        success=false;
        return res.status(400).json({success,errors: "Invalid credentials entered" });
    }

    const { email, password } = req.body;

    try {
       

        const user = await User.findOne({ email });
        if (!user) {
            success=false;
            return res.status(400).json({ success,errors: "Invalid credentials entered" });
        }
        const Authenticated = await bycrypt.compare(password, user.password);
        if (!Authenticated) {
            success=false;
            return res.status(400).json({ success,errors: "Invalid credentials entered" });
        }


        data = {
            user: {
                id: user.id
            }
        }
        jwstSecret = "Fara*z";
        success=true;
        console.log(data.user)
        var authtoken = jwt.sign(data, jwstSecret);
        res.status(200).json({success,authtoken})



    } catch (error) {
        console.error(error.message)
        res.send("Internal server error");





    }






})

// Route 3 Get User details 
router.post("/getuser",fetchuser,async (req, res) => {



    try {
        const userId = req.user.id;
        const user = await User.findById(userId).select("-password")
       
       
        res.send(user)

        



    } catch (error) {
        console.error(error.message)
        res.send("Internal server error");





    }






})


module.exports = router

