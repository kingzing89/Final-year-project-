var jwt = require('jsonwebtoken');
jwstSecret = "Fara*z";


const fetchuser = (req,res,next)=>{
    const token=req.header("auth-token")
    if(!token){
        res.status(401).send({err:"please authenticate user"})
    }
    try{
        const data = jwt.verify(token,jwstSecret);
        req.user = data.user;
        console.log(req.user.id);
        next();
    
       
    }
    catch{
        res.status(401).send({error:'please authenticate using a valid token'});

    }
   
}

module.exports=fetchuser;