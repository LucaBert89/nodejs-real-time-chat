const GetMessages = (props: any) => {
    return (
        props.messageList.isLoaded ?  props.messageList.data.map((e: any) => {
            return(
                <div className="messages-container">
                    <p className="messages__user-author">{e.iduser}</p>
                    <p className="messages_user-message">{e.mex}</p>
                </div>
            )
            }) : <p className="topic-container__topic-name">Loading</p>
    )
}

export default GetMessages