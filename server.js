const express =require('express')
const mongoose= require('mongoose')
const proroutes = require('./Routes/proroutes')
const shoproutes= require('./Routes/shoproutes')
const userroutes=require('./Routes/userroutes')
const purchaseroutes=require('./Routes/purchaseroute')
const app=express()

require("dotenv").config()
const port=process.env.PORT
const multer = require("multer");
const cors = require("cors");
app.use(cors());

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './Frontend/chakra/public/');
    cb(null, './Frontend/Shops/public/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
})

var upload = multer({ storage: storage }).fields([{name: "Image"}, {name: "Image2"}]);


app.post('/upload', (req, res) => {

  upload(req, res, function (err) {
    if (err instanceof multer.MulterError) {
      return res.status(500).json(err)
    } else if (err) {
      console.log(err);
      return res.status(500).json(err)
     
    }
   
    var path = req.files;
    res.send(path);

  })


})

app.use(express.json())
app.use((req, res,next)=>
{
    console.log(req.path,req.method)
    next()
})
app.use("/api/auth",require("./Routes/auth"));
app.use("/api/medicine",require("./Routes/medicine"));
app.use("/api/shopcon",require("./Routes/shopcon"));
app.use("/api/nextorder",require("./Routes/Nextorder"));


app.use('/api/user',userroutes)
app.use('/api/product',proroutes)
app.use('/api/shop',shoproutes)
app.use('/api/order',purchaseroutes)




mongoose.connect("mongodb://127.0.0.1:27017/Medicart?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+1.6.0")
.then(()=>{
    app.listen(port,()=>
    {
        console.log(`Access granted at port ${port}`)
    })
})

.catch((err)=>{
    console.log(err.message)
})