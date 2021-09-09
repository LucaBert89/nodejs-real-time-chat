import React, {useState} from 'react';

const CreateRoom: React.FC = () => {

    const [room, setRoom] = useState<string>("")
    const [error, setError] = useState<{topicError: string}>({topicError:""})

        const handleRoom = async (event: React.FormEvent<HTMLFormElement>) => {
            event.preventDefault();
            localStorage.removeItem("roomId");

                try{
                    const res = await fetch(`https://real-chat-app-l.herokuapp.com/api/room`, {
                        method: "Post",
                        body: JSON.stringify({topic: room, messages: []}),
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        credentials: "include"
                    });
                    // fetch response take data or error
                    const data = await res.json();
                    if(data.errors) {
                        setError({topicError: data.errors.topic});
                        return
                    }

                    if(data.error) {window.location.assign(`https://real-chat-app-l.herokuapp.com/login`)}
                    localStorage.setItem('roomId', data._id);
                    if(data._id) {window.location.assign(`http://localhost:3000/chat/${data._id}`);}
                    
                }
                catch(err) {
                    console.log(err);
                }
        }


    return (
        <div>
        <form onSubmit={handleRoom} className="room__text-form">
            <input type="text" placeholder="Create a new topic of discussion..." className="topic__name" name="topic" onChange={e => setRoom(e.target.value)} value={room}></input>
            <div className="room__topic-error error">{error.topicError}</div>
            <button type="submit" className="add__topic">Create Topic</button>
        </form>
        </div>
    )
}


export default CreateRoom