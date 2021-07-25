const jwt = require('jsonwebtoken')

exports.verify = function(req, res, next){
    const accessToken = req.cookies.jwt;
    console.log(accessToken);
    //if there is no token stored in cookies, the request is unauthorized
    if (!accessToken){
        return res.redirect("/login");
    }

    try{
        //use the jwt.verify method to verify the access token
        let authToken = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET, (err,decodedToken) => {
            if(err) return res.redirect("/login");
            next();
        });
       
        //throws an error if the token has expired or has an invalid signature
        req.authToken = authToken;
        next();
    }
    catch(e){

        //if an error occured return request unauthorized error
        return res.status(401).send()
    }
}