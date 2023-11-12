const jwt = require('jsonwebtoken')
require('dotenv').config()

const auth = (req, res, next)=>{

    const token = req.headers.authorization;
    if(token){

        jwt.verify(token, process.env.secretKey, (err, decoded)=> {
            if(err){
                res.status(200).send({"msg": "Please login Again"})
            }

            req.body.userName = decoded.userName,
            req.body.userId = decoded.userId,
            next()

          });
          
    }
    else{
        res.status(400).send({"msg": "Please Login"})
    }

   
}

module.exports = {
    auth
}