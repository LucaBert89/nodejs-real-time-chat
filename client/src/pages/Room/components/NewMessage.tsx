import React from 'react';
import IMessage from "../interfaces/messageInterface"

console.log("qui")

const NewMessage: React.FC<{message: any}> =(props: any) => {
    console.log(props)
        
        return (
            props.message.username ?
            <div className={props.message.sender.username === localStorage.getItem("username") ? "message-container__author" : "message-container"}>
                <p className="message__user-author" >{props.message.sender.username}</p>
                <p className="message_user-message">{props.message.findmessage.message} </p>
            </div>
          : null  
        ) 
     
    
    
}

export default NewMessage