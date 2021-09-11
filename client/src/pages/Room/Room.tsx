import {useEffect, useState} from 'react'
import NewMessage from "./components/NewMessage"
import io from "socket.io-client"
import GetMessages from './components/GetMessages';
import {myData} from "../../interfaces/dataLoading"
import IMessage from "./interfaces/messageInterface"
import Header from "../../components/Header"
import Footer from "../../components/Footer"
const socket = io("https://real-chat-app-l.herokuapp.com/");




const Room: React.FC  = () => {
    //state handling the message
    const [message, setMessage] = useState<string>("")
    //state handling the list of messages of the room
    const [list, setList] = useState<{isLoaded: boolean, data:myData[]}>({isLoaded: false, data:[{room: "", mex: "", idmessage: "", user:""}]})
    //state handling the room state displayed
    const [roomName, setRoomName] = useState<string>("");
    const [textMessage, setTextMessage] = useState<{}>({})
    const [typing, setTyping] = useState<{isTyping:boolean}>({isTyping: false});

    useEffect(() => {
        (async function() {
            //fetch to API of the chat with the right ID stored inside localStorage
            const roomId: string | null = localStorage.getItem("roomId");
            const res = await fetch(`/api/chat/${roomId}`, {
                credentials: "include"
            })
            const data = await res.json();
            //redirect to login page
            if(data.error) window.location.assign(`/login`)

            roomList(data);

            socketHandler();
            
        })()
    }, [textMessage]);

    const addMessage = async (e: React.FormEvent<HTMLFormElement>): Promise<void>  => {
            e.preventDefault()
            const roomId: string | null = localStorage.getItem("roomId");
            try{
                const res = await fetch("/api/addMessage", {
                    method: "Post", 
                    body: JSON.stringify({id: roomId, topic: roomName, messages: [{message: message, sender: localStorage.getItem("userId")?.toString()}]}),
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    credentials: "include"
                });
                // fetch response take data or error
                const data: IMessage = await res.json();
    
                if(data.error) window.location.assign(`/login`)
                //if inside data there is an errors obj            
                const newData: IMessage = data;
           
                socket.emit("message", newData);

            }
            catch(err) {
                console.log(err);
            }
        }
        console.log(textMessage)
        
        function handleChange (e: React.ChangeEvent<HTMLTextAreaElement>): void {
            if(e.target.value === "") {
                //if the input is empty
                socket.emit("typing", {isTyping: false});
            } else {
                //if the user type
                socket.emit("typing", {isTyping: true});
            }
            setMessage(e.target.value);
            
        }
       
        const socketHandler = (): void => {
            socket.on("typing", (data: {isTyping: boolean}) => {
                setTyping(data)

            })
    
             socket.on("message", (data: []): void => {
                 console.log(data);
                setTextMessage(data)
            }) 
        }

        const roomList = (data: any): void => {
            //if there are messages inside room:
            if(data.mex !== "") {
                setRoomName(data[0].room)
                setList({isLoaded: true, data: data});

            } else {
                // if there aren't messages
                setRoomName(data.room)
                setList({isLoaded: true, data: [{room: "", mex: "", idmessage: "", user:""}]});
            }
        }
    return (
        <div>
            <Header />
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
