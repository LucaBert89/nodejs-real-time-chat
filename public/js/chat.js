

(async function() {
    const form = document.querySelector(".message__text-form");
    const topicName = document.querySelector(".topic-name");
    const messageContainer = document.querySelector(".messages-container");
    const socket = io();
    console.log(`/${window.location.href.split("/")[4].toString()}`)

    const res = await fetch(`/${window.location.href.split("/")[4].toString()}`)
    const data = await res.json();
    
    data.forEach(element => {
        
        messageBuild(element.room, element.iduser, element.mex);
    });
    
    form.addEventListener("submit", async(e) => {
        e.preventDefault();
        try{
            const res = await fetch("/addMessage", {
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
        
            socket.emit("message", data)
        }
        catch(err) {
            console.log(err);
        }
    })
    
    
    function messageBuild(room, user, message) {
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
        messageBuild(data.sender.email, data.findmessage.message)
    })


})()

console.log(window.location.href);



console.log(window.location.href.split("/")[4])
