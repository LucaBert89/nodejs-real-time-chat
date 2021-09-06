import React, {useState} from 'react';

const CreateRoom: React.FC = () => {

    const [room, setRoom] = useState<string>("")

        const handleRoom = async (event: React.FormEvent<HTMLFormElement>) => {
            event.preventDefault();
            localStorage.removeItem("roomId");
            console.log(room);
            const roomChat = room;
    
                try{
                    const res = await fetch(`http://localhost:5000/room`, {
                        method: "Post",
                        body: JSON.stringify({topic: roomChat, messages: []}),
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        credentials: "include"
                    });
                    // fetch response take data or error
                    const data = await res.json();
                    //if inside data there is an errors obj
                    //if there is the id, redirect
                    if(data.error) {window.location.assign(`http://localhost:3000/login`)}
                    localStorage.setItem('roomId', data._id);
                    if(data._id) {window.location.assign(`http://localhost:3000/home/chat/${data._id}`);}
                    
                }
                catch(err) {
                    console.log(err);
                }
        }


    return (
        <div>
        <form onSubmit={handleRoom} className="room__text-form">
            <input type="text" className="topic__name" name="topic" onChange={e => setRoom(e.target.value)}></input>
            <button type="submit" className="add__topic">create Topic</button>
        </form>
        </div>
    )
}


export default CreateRoom