interface IMessage {
    findmessage: {
        message:string,
        sender:string
    },
    sender: {
        _id:string,
        username:string,
        email: string,
        password:string
    },
    topicName: string,
    error: string
}

export default IMessage