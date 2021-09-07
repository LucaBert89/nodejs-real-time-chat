import React from 'react';
import IMessage from "../interfaces/messageInterface"



const NewMessage: React.FC<{message: any}> =(props: any) => {
    return (
        props.message.length > 0 ?
        props.message.map((e: IMessage) => {
        return (
            <div className={e.sender.username === localStorage.getItem("username") ? "message-container__author" : "message-container"}>
                <p className="message__user-author" >{e.sender.username}</p>
                <p className="message_user-message">{e.findmessage.message} </p>
            </div>
        )
    }) : ""
    )
    
}

export default NewMessage