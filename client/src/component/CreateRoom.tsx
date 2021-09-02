import React, {useState} from 'react';

function CreateRoom() {

    const [room, setRoom] = useState({room: ""})

        const handleRoom = async (event: React.FormEvent<HTMLFormElement>) => {
            event.preventDefault();
            localStorage.removeItem("roomId");
            console.log(room);
            const roomChat = room;
    
                try{
                    const res = await fetch("/room", {
                        method: "Post",
                        body: JSON.stringify({topic: roomChat, messages: []}),
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    });
                    // fetch response take data or error
                    const data = await res.json();
                    //if inside data there is an errors obj
                    //if there is the id, redirect
                    console.log(data);
                    localStorage.setItem('roomId', data._id);
                    console.log(data._id);
                    if(data._id) {window.location.assign(`/chat/${data._id}`);}
                    
                }
                catch(err) {
                    console.log(err);
                }
        }


    return (
        <div>
        <form onSubmit={handleRoom} className="room__text-form">
            <input type="text" className="topic__name" name="topic" onChange={e => setRoom({room: e.target.value})}></input>
            <button type="submit" className="add__topic">create Topic</button>
        </form>
        </div>
    )
}


export default CreateRoom