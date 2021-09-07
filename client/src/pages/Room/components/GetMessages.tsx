import {IData, myData} from "../../../interfaces/dataLoading"



const GetMessages: React.FC<{messageList:IData}> = (props: any) => {
    console.log(props)
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