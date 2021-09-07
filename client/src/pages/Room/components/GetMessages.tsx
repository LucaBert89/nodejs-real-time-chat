interface Idata {
    isLoaded: boolean,
    data: [Object]
}

interface myData {
    idmessage: string,
    room:string,
    mex:string,
    user:string
}

const GetMessages: React.FC<{messageList:Idata}> = (props: any) => {
    return (
        props.messageList.isLoaded ?  props.messageList.data.map((e: myData) => {
            return(
                <div className="messages-container" key={e.idmessage}>
                    <p className="messages__user-author">{e.user} </p>
                    <p className="messages_user-message">{e.mex}</p>
                </div>
            )
            }) : <p className="topic-container__topic-name">Loading</p>
    )
}

export default GetMessages