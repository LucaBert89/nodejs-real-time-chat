const chatRoom = require("../models/chat")
const { sendMessage } = require('../utils/socket-io');
const User = require("../models/users")
exports.getChatPage = (req, res) => {
    
        return res.render("home")
    
};

exports.getRoomList = async (req, res) => {
    const roomList = await chatRoom.find({})
        
    return res.status(201).json(roomList);
};

exports.postRoom = async (req, res) => {
    
    const {topic ,messages} = req.body;
    console.log(topic, messages);
    const createRoom = await chatRoom.create({topic, messages})
    
    return res.status(201).json(createRoom);
}

exports.getRoom = (req, res) => {
    return res.render("room");
}

exports.getTopic = async (req, res) => {
    const {topic ,messages} = req.body;
    console.log(topic)
    chatRoom.find({topic}).then(function (rooms) {
        const topicId = rooms.map(e => {return e._id})
        return res.status(201).json(topicId);
    })
}

exports.getMessage = async (req, res) => { 
    console.log("id", req.params.id)
    const findRoom = await chatRoom.findById(req.params.id)
    let newArray = display(findRoom);
    const topic = topicName(findRoom);
    console.log(newArray)
    if(findRoom.messages.length !==0 ) {
        const result = await Promise.all(newArray);
        return res.status(201).json(result);
    } else {
        console.log("ok");
        return res.status(201).json(topic);
    }
}

function topicName(findRoom) {
    return {
        room: findRoom.topic,
        mex: "",
        iduser: "",
    }
}

function display(findRoom) {
        return findRoom.messages.map(async(e)=> {
            return {
                room: findRoom.topic,
                mex: e.message,
                iduser: await User.findById(e.sender).then(user => user.email)
            }
        })
}

exports.postMessage = async (req, res) => { 
    const {id, topic ,messages} = req.body;
    console.log(topic);
    const newMessage = messages[0];
    const findUser = await User.findById(newMessage.sender).exec();
    const updateChat = await chatRoom.findByIdAndUpdate(id, {$push: {"messages": newMessage}})
    const generateMessage = {
        topicName: topic,
        sender: findUser,
        findmessage: newMessage
    }   
    sendMessage(generateMessage)
    return res.status(201).json(generateMessage);
};
    //let doc = await chatRoom.findOneAndUpdate({topic: topic}, { $push: {"messages": newMessage}});
    //console.log(doc);
    /*try {
        const messageUpdate = await chatRoom.find({topic});
        console.log(messageUpdate)
        const addMessage = await messageUpdate[0].messages.push(newMessage);
        return res.status(201).json(addMessage);
    }
    catch (err) {
       console.log(err);
    }
    
    /*
    const newMessage = {message: message};
    const addMessage = await chatRoom.messages.push(newMessage)
    return res.status(201).json(addMessage);
    */



/*exports.postChatMessage = async (req, res) => {
    console.log(req.body)
    const {message, sender} = req.body;
    const chatMessage = await Chat.create({message, sender});
    return res.status(201).json(chatMessage);
}*/

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
    console.log(accessToken);
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