const chatRoom = require("../models/chat")
const { sendMessage } = require('../utils/socket-io');
const User = require("../models/users")


const handleErrors = (err) => {
    let errors = {topic: ""};
    if(err.message === "topic already opened") errors.topic = "topic already opened!"
    return errors;
}

exports.getRoomList = async (req, res) => {
    const roomList = await chatRoom.find({})
        
    return res.status(201).json(roomList);
};

exports.postRoom = async (req, res) => {
    
    try {
        const {topic ,messages} = req.body;
        const checkDuplicate = await chatRoom.find({topic});
        if(checkDuplicate.length > 0) throw Error("topic already opened")
        const createRoom = await chatRoom.create({topic, messages})
        
        return res.status(201).json(createRoom);
    }
    catch (err) {
        const errors = handleErrors(err);
        res.status(400).json({errors});
        
    }
}


exports.getTopic = async (req, res) => {
    const {topic ,messages} = req.body;
    console.log(topic)
    try {
        const rooms = await chatRoom.find({topic})
        const topicId = rooms.map(e => e._id)
        return res.status(201).json(topicId);
    }
   catch(err) {
       console.log(err)
   }
}

exports.getMessage = async (req, res) => { 
    console.log("id", req.params.id)
    const findRoom = await chatRoom.findById(req.params.id)
    let newArray = display(findRoom);
    const topic = topicName(findRoom);
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
                idmessage: e._id,
                user: await User.findById(e.sender).then(user => user.username)
            }
        })
}

exports.postMessage = async (req, res) => { 
    const {id, topic ,messages} = req.body;

    const newMessage = messages[0];
    const findUser = await User.findById(newMessage.sender).exec();
    const update = await chatRoom.findByIdAndUpdate(id, {$push: {"messages": newMessage}})
    const generateMessage = {
        topicName: topic,
        sender: findUser,
        findmessage: newMessage
    }   
    sendMessage(generateMessage)
    return res.status(201).json(generateMessage);
};
    
/*

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
*/