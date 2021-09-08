import {useEffect, useState} from 'react'
import NewMessage from "./components/NewMessage"
import io from "socket.io-client"
import GetMessages from './components/GetMessages';
import {myData} from "../../interfaces/dataLoading"
import IMessage from "./interfaces/messageInterface"
import Footer from "../../components/Footer"
const socket = io("https://chat-realtime-app-l.herokuapp.com/");




const Room: React.FC  = () => {
    const [message, setMessage] = useState<string>("")
    const [list, setList] = useState<{isLoaded: boolean, data:myData[]}>({isLoaded: false, data:[{room: "", mex: "", idmessage: "", user:""}]})
    const [roomName, setRoomName] = useState<string>("");
    const [textMessage, setTextMessage] = useState<[]>([])
    const [typing, setTyping] = useState<{isTyping:boolean}>({isTyping: false});

    useEffect(() => {
        (async function() {

            const roomId: string | null = localStorage.getItem("roomId");
            const res = await fetch(`https://chat-realtime-app-l.herokuapp.com//chat/${roomId}`, {
                credentials: "include"
            })
            const data = await res.json();
            
            if(data.error) window.location.assign(`https://chat-realtime-app-l.herokuapp.com//login`)

            roomList(data);

            socketHandler();
            
        })()
    }, [textMessage]);

    const addMessage = async (e: React.FormEvent<HTMLFormElement>): Promise<void>  => {
            e.preventDefault()
            try{
                const res = await fetch("https://chat-realtime-app-l.herokuapp.com/addMessage", {
                    method: "Post", 
                    body: JSON.stringify({id: window.location.href.split("/")[5], topic: roomName, messages: [{message: message, sender: localStorage.getItem("userId")?.toString()}]}),
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    credentials: "include"
                });
                // fetch response take data or error
                const data: IMessage = await res.json();
                console.log(data);
                if(data.error) window.location.assign(`https://chat-realtime-app-l.herokuapp.com//login`)
                //if inside data there is an errors obj            
                const newData: [[], IMessage] = [textMessage, data];
                socket.emit("message", newData);

            }
            catch(err) {
                console.log(err);
            }
        }
        
        function handleChange (e: React.ChangeEvent<HTMLTextAreaElement>): void {
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
    
             socket.on("message", (data: []): void => {
                setTextMessage(data)
            }) 
        }

        const roomList = (data: any): void => {
            if(data.mex !== "") {
                setRoomName(data[0].room)
                setList({isLoaded: true, data: data});

            } else {
                setRoomName(data.room)
                setList({isLoaded: true, data: [{room: "", mex: "", idmessage: "", user:""}]});
            }
        }
    return (
        <div>
            <h1 className="topic-name">Topic Title: {roomName}</h1>
          
                <div className="messages-container" key={list.data[0].room}>
                    <GetMessages messageList={list} />
                </div>
                <NewMessage message={textMessage} />
                <p className="messages_user-typing">{typing.isTyping ? "Someone is Typing..." : ""} </p>
                <form className="message__text-form" onSubmit={addMessage}>
                    <textarea placeholder="type your message..." className="add__message" name="message" onChange={e => handleChange(e)}></textarea>
                    <button type="submit" className="add__message-btn">Send</button>
                </form>
                <Footer />
        </div>
    )
}

export default Room
