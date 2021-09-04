const jwt = require('jsonwebtoken')

exports.verify = function(req, res, next){
    console.log(req.cookies.jwt);
    const accessToken = req.cookies.jwt;
    console.log("token", accessToken);
    //if there is no token stored in cookies, the request is unauthorized
    if (!accessToken){
        return res.redirect("/login");
    }

    try{
        //use the jwt.verify method to verify the access token
        jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET, (err,decodedToken) => {
            if(err) {
                console.log(err);
                return res.redirect("/login");
            } else {
                next();
            }
        });
    
    }
    catch(e){

        //if an error occured return request unauthorized error
        return res.status(401).send()
    }
}