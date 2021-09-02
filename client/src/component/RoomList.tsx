import React, {useState, useEffect} from 'react';

interface Idata {
    isLoaded: boolean,
    data: [Object]
}

interface Irooms {
    id: string,
    topic: string,
    messages:[Object]
}

function CreateRoom() {

    const [list, setList] = useState<Idata>({isLoaded: false, data:[{}]})

    useEffect(() => {
        (async function() {
            localStorage.removeItem("roomId");
            const res = await fetch(`http://localhost:8000/roomlist`)
            const data = await res.json();
        
            console.log(data);
            if(data) {
                setList({isLoaded: true, data: data});
                /*data.forEach(e => {
                    
                    roomList(e.topic, e.messages);
                })*/
            }
    
        
            
        
            /*function roomList(topic, messages) {
                const container = document.querySelector(".topic-container");
                const singleContainer = document.createElement("div");
                const topicName = document.createElement("p");
                const messagesNumber = document.createElement("p");
                singleContainer.classList.add("topic-container__single-topic")
                topicName.classList.add("topic-container__topic-name");
                messagesNumber.classList.add("topic-container__topic-messages");
                
                singleContainer.appendChild(topicName);
                singleContainer.appendChild(messagesNumber);
                container.appendChild(singleContainer);
                topicName.innerText = `Topic:${topic}`;
                messagesNumber.innerText = `Messages: ${messages.length}`
                
                const topicBtn = document.querySelectorAll(".topic-container__single-topic");
                
                topicBtn.forEach(singleTopic=> singleTopic.addEventListener("click", handleTopicClick));
        
                
            }
        
            async function handleTopicClick(event) {
                console.log(event)
                localStorage.removeItem("roomId");
                event.preventDefault();
                console.log(this.querySelector(".topic-container__topic-name").innerText.split(":")[1])
                try{
                    const res = await fetch("/topic", {
                        method: "Post",
                        body: JSON.stringify({topic: this.querySelector(".topic-container__topic-name").innerText.split(":")[1].toString(), messages: []}),
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    });
                    // fetch response take data or error
                    const data = await res.json();
                    console.log(data);
                    localStorage.setItem('roomId', data);
                    //if inside data there is an errors obj
                    //if there is the id, redirect
                    window.location.assign(`/chat/${data}`);
                    
                    
                }
                catch(err) {
                    console.log(err);
                }
            }
        */
        })();
    })
    return (
        <div>
        <div className="topic-container">
            <div className="topic-container__single-topic">
                {list.isLoaded ? list.data.map((e: any)=> {
                    <div className="topic-container__single-topic">
                        <p className="topic-container__topic-name">{e.topic}</p>
                        <p className="topic-container__topic-messages">{e.messages}</p>
                    </div>
                }) : <p className="topic-container__topic-name">Loading</p>}
            </div>
        </div>
    </div>
    )
}

export default CreateRoom