import CreateRoom from "./components/CreateRoom"
import RoomList from "./components/RoomList"
import Header from "../../components/Header"
const Home: React.FC  = () => {
    return (
    <div>
    <Header />
    <CreateRoom />
    <RoomList />
    </div>
    )
}

export default Home