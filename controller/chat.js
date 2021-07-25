const path = require('path');

exports.getChatPage = (req, res) => {
    const filePath = __dirname;
    res.render(path.join(filePath, '../', 'views','chat.ejs'))
};

exports.postChatPage = (req, res) => {
    
    const accessToken = req.cookies.jwt

    if (!accessToken){
        return res.status(403).send()
    }

    let payload
    try{
        payload = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET)
    }
    catch(e){
        return res.status(401).send()
    }

     //retrieve the refresh token from the users array
     const refreshToken = user.refreshToken

     //verify the refresh token
     try{
         jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET)
     }
     catch(e){
         return res.status(401).send()
     }
 
     let newToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, 
     {
         algorithm: "HS256",
         expiresIn: process.env.ACCESS_TOKEN_LIFE
     })
 
     res.cookie("jwt", newToken, {secure: true, httpOnly: true})
     res.send()
}