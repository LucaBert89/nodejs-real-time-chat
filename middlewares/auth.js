const jwt = require('jsonwebtoken')

exports.verify = function(req, res, next){
    const accessToken = req.cookies.jwt;
    console.log(accessToken);
    //if there is no token stored in cookies, the request is unauthorized
    if (!accessToken){
        return res.status(403).send()
    }

    try{

        let authToken = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
        //use the jwt.verify method to verify the access token
        //throws an error if the token has expired or has a invalid signature
        req.authToken = authToken;
        next();
    }
    catch(e){

        //if an error occured return request unauthorized error
        return res.status(401).send()
    }
}