import {useState, useEffect, useRef} from 'react';
import {IData} from "../../../interfaces/dataLoading"


interface IRooms {
    _id: string,
    topic: string,
    messages:[IMessage]
}

interface IMessage {
    _id: string,
    message: string,
    sender:string,
    updatedAt:string,
    createdAt:string
}

const CreateRoom: React.FC = () => {
    const [list, setList] = useState<IData>({isLoaded: false, data:[{}]})

    useEffect(() => {
        
        (async function() {
            localStorage.removeItem("roomId");
            const res = await fetch(`http://localhost:5000/roomlist`, {
                credentials: "include"
            })
            const data = await res.json();
            if(data.error) window.location.assign(`http://localhost:3000/login`)
            console.log(data);
            if(data) {
                setList({isLoaded: true, data: data});
            }
            
        })();

   
    }, [])
  

    const handleClick = async (event: React.MouseEvent<HTMLElement>, topic: string) => {
        event.preventDefault();
        console.log(topic);
        /*const topicName: string | null = divElement && divElement.split(": ")[1];
        console.log(topicName);*/
        localStorage.removeItem("roomId");

        try{
            const res = await fetch("/topic", {
                method: "Post",
                body: JSON.stringify({topic: topic, messages: []}),
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            // fetch response take data or error
            const data = await res.json();
            console.log(data[0]);
            localStorage.setItem('roomId', data[0]);
            //if inside data there is an errors obj
            //if there is the id, redirect
            window.location.assign(`/home/chat/${data[0]}`);
        }
        catch(err) {
            console.log(err);
        }
        
    }
    return (
        <div>
        <div className="topic-container">
            <div className="topic-container__single-topic">
                {list.isLoaded ? list.data.map((e: any) => {
                    console.log(e);
                    return (
                    <div className="topic-container__single-topic" key={e._id} onClick={(event: React.MouseEvent<HTMLElement>) => handleClick(event, e.topic)}>
                        <p className="topic-container__topic-name">Topic: {e.topic}</p>
                        <p className="topic-container__topic-messages">Messages: {e.messages.length}</p>
                    </div>
                    )
                }) : <p className="topic-container__topic-name">Loading</p>}
            </div>
        </div>
    </div>
    )
}

export default CreateRoom