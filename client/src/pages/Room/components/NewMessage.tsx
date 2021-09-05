

function NewMessage(props: any) {
    console.log(props)
    return (
       
        props.message.map((e: any) => {
        console.log(e)
        return (
            <div className="messages-container">
                <p className="messages__user-author">{e.sender.email}</p>
                <p className="messages_user-message">{e.findmessage.message}</p>
            </div>
        )
    })
    )
    
}

export default NewMessage