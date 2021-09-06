import {useEffect, useState} from 'react'
import NewMessage from "./components/NewMessage"
import io from "socket.io-client"
import GetMessages from './components/GetMessages';
import IData from "../../interfaces/dataLoading"
const socket = io("http://localhost:5000");




const Room: React.FC  = () => {
    const [message, setMessage] = useState<any>("")
    const [list, setList] = useState<IData>({isLoaded: false, data:[{}]})
    const [roomName, setRoomName] = useState<string>("");
    const [textMessage, setTextMessage] = useState<[]>([])
    const [typing, setTyping] = useState<{isTyping:boolean}>({isTyping: false});

    useEffect(() => {
        (async function() {

            const roomId: string | null = localStorage.getItem("roomId");
            const res = await fetch(`http://localhost:5000/chat/${roomId}`, {
                credentials: "include"
            })
            const data = await res.json();
            
            if(data.error) window.location.assign(`http://localhost:3000/login`)

            roomList(data);

            socketHandler();
            
        })()
    }, [textMessage]);

    const addMessage = async (e: React.FormEvent<HTMLFormElement>): Promise<void>  => {
            e.preventDefault()
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
                if(data.error) window.location.assign(`http://localhost:3000/login`)
                //if inside data there is an errors obj            
                const newData: any = [textMessage, data];
                socket.emit("message", newData);
            }
            catch(err) {
                console.log(err);
            }
        }
        
        function handleChange (e: React.ChangeEvent<HTMLInputElement>): void {
            if(e.target.value === "") {

                socket.emit("typing", {isTyping: false});
            } else {

                socket.emit("typing", {isTyping: true});
            }
            setMessage(e.target.value);
            
        }
       
        const socketHandler = (): void => {
            socket.on("typing", (data: {isTyping: boolean}) => {
                setTyping(data)

            })
    
             socket.on("message", (data: any): void => {
                setTextMessage(data)
            }) 
        }

        const roomList = (data: any): void => {
            console.log(data);
            if(data.mex !== "") {
                setRoomName(data[0].room)
                setList({isLoaded: true, data: data});

            } else {
                setRoomName(data.room)
                setList({isLoaded: true, data: [{mex: "", iduser: ""}]});
            }
        }

    return (
        <div>
            <h1 className="topic-name">{roomName}</h1>
            <form className="message__text-form" onSubmit={addMessage}>
                <input type="text" className="add__message" name="message" onChange={e => handleChange(e)}></input>
                <button type="submit" className="add__message-btn">create message</button>
            </form>
                <GetMessages messageList={list} />
                
                <NewMessage message={textMessage} />
                <p className="messages_user-typing">{typing.isTyping ? "Someone is Typing" : ""} </p>
        </div>
    )
}

export default Room
