import {useEffect, useState} from 'react'
import NewMessage from "./components/NewMessage"
import io from "socket.io-client"
import GetMessages from './components/GetMessages';
const socket = io("http://localhost:5000");

interface Idata {
    isLoaded: boolean,
    data: [Object]
}



const Room = () => {
    const [message, setMessage] = useState<any>("")
    const [list, setList] = useState<Idata>({isLoaded: false, data:[{}]})
    const [roomName, setRoomName] = useState("");
    const [textMessage, setTextMessage] = useState([])
    useEffect(() => {
        (async function() {
            //const socket = io();
            const roomId: any = localStorage.getItem("roomId")?.toString();
            console.log(roomId);
            const res = await fetch(`http://localhost:5000/chat/${roomId}`, {
                credentials: "include"
            })
            const data = await res.json();
            
            if(data.mex !== "") {
                setRoomName(data[0].room)
                setList({isLoaded: true, data: data});

            } else {
                setRoomName(data.room)
                setList({isLoaded: true, data: [{mex: "", iduser: ""}]});
            }
         
             socket.on("message", (data: any) => {
                setTextMessage(data)
            }) 
        })()
    }, [textMessage]);
    
    const addMessage = async (e: any) => {
        
            e.preventDefault();
            console.log(message);
            console.log(window.location.href.split("/")[5], )
            try{
                const res = await fetch("http://localhost:5000/addMessage", {
                    method: "Post", 
                    body: JSON.stringify({id: window.location.href.split("/")[5], topic: roomName, messages: [{message: message, sender: localStorage.getItem("userId")?.toString()}]}),
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    credentials: "include"
                });
                // fetch response take data or error
                const data: any = await res.json();
                //if inside data there is an errors obj
                //
       
                const newData: any = [textMessage, data];
                socket.emit("message", newData);
            }
            catch(err) {
                console.log(err);
            }
        }
    

    return (
        <div>
            <h1 className="topic-name">{roomName}</h1>
            <form className="message__text-form" onSubmit={addMessage}>
                <input type="text" className="add__message" name="message" onChange={e => setMessage(e.target.value)}></input>
                <button type="submit" className="add__message-btn">create message</button>
            </form>
                <GetMessages messageList={list} />
                {textMessage.length > 0 ?
                <NewMessage message={textMessage} />
                    : ""} 
        </div>
    )
}

export default Room
