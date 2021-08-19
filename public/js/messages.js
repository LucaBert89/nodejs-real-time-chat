const messagesContainer = document.querySelector(".messages-container")
const form = document.querySelector(".message__text-form")

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