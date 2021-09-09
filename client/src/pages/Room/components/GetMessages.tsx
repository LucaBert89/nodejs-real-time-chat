import {IData, myData} from "../../../interfaces/dataLoading"



const GetMessages: React.FC<{messageList:{isLoaded: boolean, data:myData[]}}> = (props: any) => {
    return (
        props.messageList.isLoaded ?  props.messageList.data.map((e: myData) => {
            return(
            
                <div className={e.user === localStorage.getItem("username") ? "message-data__author" : "message-data"}  key={e.idmessage}>
                    <p className="message__user-author">{e.user} </p>
                    <div className={e.user === localStorage.getItem("username") ? "message-container__author" : "message-container"}>
                        
                        <p className="message_user-message">{e.mex}</p>
                    </div>
                </div>
               
            )
            }) : <p className="topic-container__topic-name">Loading</p>
    )
}

export default GetMessages