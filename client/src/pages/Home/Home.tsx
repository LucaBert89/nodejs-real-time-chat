import CreateRoom from "./components/CreateRoom"
import RoomList from "./components/RoomList"

const Home: React.FC  = () => {
    return (
    <div>
    <CreateRoom />
    <RoomList />
    </div>
    )
}

export default Home