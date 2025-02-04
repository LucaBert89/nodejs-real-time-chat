import {useState, useEffect} from 'react';
import {IData} from "../../../interfaces/dataLoading"


const CreateRoom: React.FC = () => {
    const [list, setList] = useState<IData>({isLoaded: false, data:[{}]})

    useEffect(() => {
        //get all the room list
        (async function() {
            localStorage.removeItem("roomId");
            const res = await fetch(`/api/roomlist`, {
                headers: {
                    'Accept': 'application/json'
                },
                credentials: "include",
            })
            const data = await res.json();
            //redirect in case of no token or expired token
            if(data.error) window.location.assign(`/login`)
            if(data) {
                setList({isLoaded: true, data: data});
            }
            
        })();
    }, [])
  

    const handleClick = async (event: React.MouseEvent<HTMLElement>, topic: string) => {
        event.preventDefault();
        localStorage.removeItem("roomId");
        try{
            const res = await fetch("/api/topic", {
                method: "Post",
                body: JSON.stringify({topic: topic, messages: []}),
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: "include"
            });
            // fetch response take data or error
            const data = await res.json();  
            //save item in localstorage to use it in /addMessage fetch
            localStorage.setItem('roomId', data[0]);

            //take the room ID and redirect to the idRoom
            window.location.assign(`/chat/${data[0]}`);
        }
        catch(err) {
            console.log(err);
        }
        
    }
    return (
        <div>
        <div className="topic-container">
            <div className="topic-container">
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
