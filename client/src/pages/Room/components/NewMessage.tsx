import React from 'react';

interface IMessage {
    findmessage: {
        message:string,
        sender:string
    }
    sender: {
        _id:string,
        username:string,
        email: string,
        password:string
    }
}


const NewMessage: React.FC<{message: any}> =(props: any) => {
    console.log(props)
    return (
        //<h1>{props.message > 0 ? props.message.map((e: IMessage) => console.log(e)) : "no"}</h1>
        props.message.length > 0 ?
        props.message.map((e: IMessage) => {
        console.log(e)
        return (
            <div className="messages-container">
                <p className="messages__user-author">{e.sender.username}</p>
                <p className="messages_user-message">{e.findmessage.message} </p>
            </div>
        )
    }) : ""
    )
    
}

export default NewMessage