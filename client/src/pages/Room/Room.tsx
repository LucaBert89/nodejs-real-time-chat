import {useEffect, useState} from 'react'

interface Idata {
    isLoaded: boolean,
    data: [Object]
}

function Room() {
    const [message, setMessage] = useState<any>("")
    const [list, setList] = useState<Idata>({isLoaded: false, data:[{}]})
    const [roomName, setRoomName] = useState("");

    useEffect(() => {
        (async function() {
            //const socket = io();
            console.log(localStorage.getItem("roomId"))
            const roomId: any = localStorage.getItem("roomId")?.toString();
            console.log(roomId);
            const res = await fetch(`http://localhost:5000/chat/${roomId}`, {
                credentials: "include"
            })
            const data = await res.json();
            console.log(data[0].room);
            setList({isLoaded: true, data: data});
            setRoomName(data[0].room)
            /*data.mex === "") ? messageBuild(data.room, "", "") : data.forEach(element => {messageBuild(element.room, element.iduser, element.mex)}); 
            
            
           
        
            
            
            function messageBuild(room, user, message) {
                
                const messageContainer = document.querySelector(".messages-container");
                topicName.innerText = room;
                const userAuthor = document.createElement("span");
                const paragraph = document.createElement("p");
                paragraph.classList.add("message")
                paragraph.innerText = message;
                userAuthor.innerText = user;
                messageContainer.appendChild(userAuthor);
                messageContainer.appendChild(paragraph);
            }
            
            
            socket.on("message", (data) => {
                messageBuild(data.topicName, data.sender.email, data.findmessage.message)
            })
        
        */
        })()
    }, []);
    
    const addMessage =(e: any) => {
        
            e.preventDefault();
            console.log(message);
            /*try{
                const res = await fetch("http://localhost:5000/addMessage", {
                    method: "Post", 
                    body: JSON.stringify({id: window.location.href.split("/")[4], topic: topicName.innerText, messages: [{message: form.message.value, sender: localStorage.getItem("userID").toString()}]}),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                // fetch response take data or error
                const data = await res.json();
                //if inside data there is an errors obj
                //
                console.log(data)
            
                //socket.emit("message", data)
            }
            catch(err) {
                console.log(err);
            }
        }*/
    }

    return (
        <div>
            <h1 className="topic-name">{roomName}</h1>
            <form className="message__text-form" onSubmit={addMessage}>
                <input type="text" className="add__message" name="message" onChange={e => setMessage(e.target.value)}></input>
                <button type="submit" className="add__message-btn">create message</button>
            </form>
            {list.isLoaded ? list.data.map((e: any) => {
                  return(
                    <div className="messages-container" key={e.mex}>
                        <p className="messages__user-author">{e.iduser}</p>
                        <p className="messages_user-message">{e.mex}</p>
                    </div>
                )
                }) : <p className="topic-container__topic-name">Loading</p>}
        </div>
    )
}

export default Room
