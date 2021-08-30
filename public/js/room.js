(async function() {
    localStorage.removeItem("roomId");
    const form = document.querySelector(".room__text-form");
    
    const res = await fetch(`/roomlist`)
    const data = await res.json();

    console.log(data);
    if(data) {
        
        data.forEach(e => {
            
            roomList(e.topic, e.messages);
        })
    }

    form.addEventListener("submit", async(e) => {
        e.preventDefault();
        localStorage.removeItem("roomId");
        console.log(form.topic.value)
        const roomChat = form.topic.value;
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
            if(data._id) {location.assign(`/chat/${data._id}`);}
            
        }
        catch(err) {
            console.log(err);
        }
    })

    

    function roomList(topic, messages) {
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
            location.assign(`/chat/${data}`);
            
            
        }
        catch(err) {
            console.log(err);
        }
    }

    /*
    form.addEventListener("submit", async(e) => {
        e.preventDefault();
        const chatMessage = form.message.value;
        try{
            const res = await fetch("/message", {
                method: "Post",
                body: JSON.stringify({message: chatMessage, sender: localStorage.getItem("userID")}),
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            // fetch response take data or error
            const data = await res.json();
            //if inside data there is an errors obj
            //if there is the id, redirect
        getUserMessage(data);
        }
        catch(err) {
            console.log(err);
        }

    })

    async function getUserMessage(id) {
        try{
            const res = await fetch("/message");
            // fetch response take data or error
            const dataUser = await res.json();
            //if inside data there is an errors obj
            //if there is the id, redirect
        console.log(data);
        }
        catch(err) {
            console.log(err);
        }
    }
    */

})();
