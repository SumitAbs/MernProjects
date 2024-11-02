var jwt = require('jsonwebtoken');
const JWT_Key = "SecureKey";

const fetchUser = (req,res,next)=>{
    // get the user from the jwt Token and add id to req Object
    const token = req.header('authToken');
    if(!token){ res.status(401).send({error:"Please authenticate an valid token"}) }


    try{
        const data = jwt.verify(token, JWT_Key)
        req.user = data.user
        next();
    }catch (e) {
        res.status(401).send({error:"Please authenticate an valid token"})
    }
}

module.exports = fetchUser;
