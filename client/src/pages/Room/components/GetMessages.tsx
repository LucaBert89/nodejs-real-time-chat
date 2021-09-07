import {IData, myData} from "../../../interfaces/dataLoading"



const GetMessages: React.FC<{messageList:{isLoaded: boolean, data:myData[]}}> = (props: any) => {
    console.log(props)
    return (
        props.messageList.isLoaded ?  props.messageList.data.map((e: myData) => {
            return(
                <div className="message-container" key={e.idmessage}>
                    <p className="message__user-author">{e.user} </p>
                    <p className="message_user-message">{e.mex}</p>
                </div>
            )
            }) : <p className="topic-container__topic-name">Loading</p>
    )
}

export default GetMessages