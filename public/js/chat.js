const form = document.querySelector(".message__text-form");
const topicName = document.querySelector(".topic-name");

console.log(window.location.href.split("/")[4])
form.addEventListener("submit", async(e) => {
    e.preventDefault();
    console.log(topicName.innerText)
    const newMessage = form.message.value;
    console.log(localStorage.getItem("user_id"))
    try{
        const res = await fetch("/addMessage", {
            method: "Post", 
            body: JSON.stringify({id: window.location.href.split("/")[4], topic: topicName.innerText, messages: [{message: newMessage, sender: localStorage.getItem("user_id").toString()}]}),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        // fetch response take data or error
        const data = await res.json();
        //if inside data there is an errors obj
        //if there is the id, redirect
        console.log(data);
        
    }
    catch(err) {
        console.log(err);
    }
})