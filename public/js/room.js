const form = document.querySelector(".room__text-form");
const topicBtn = document.querySelectorAll(".topic-container__single-topic");

form.addEventListener("submit", async(e) => {
    e.preventDefault();
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
        if(data._id) {location.assign(`/chat/${data._id}`);}
        
    }
    catch(err) {
        console.log(err);
    }
})

topicBtn.forEach(singleTopic=> singleTopic.addEventListener("click", handleTopicClick));

async function handleTopicClick() {
    console.log(this.querySelector(".topic-container__topic-name").innerText)
    try{
        const res = await fetch("/topic", {
            method: "Post",
            body: JSON.stringify({topic: this.querySelector(".topic-container__topic-name").innerText, messages: []}),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        // fetch response take data or error
        const data = await res.json();
        console.log(data);
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