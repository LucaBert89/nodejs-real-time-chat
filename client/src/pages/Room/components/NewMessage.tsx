import React from 'react';
import IMessage from "../interfaces/messageInterface"



const NewMessage: React.FC<{message: any}> =(props: any) => {
    return (
        //<h1>{props.message > 0 ? props.message.map((e: IMessage) => console.log(e)) : "no"}</h1>
        props.message.length > 0 ?
        props.message.map((e: IMessage) => {
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