const Header = (props: any) => {

    const handleLogOut = async (e: React.MouseEvent<HTMLElement>)=> {
        e.preventDefault();
        const res = await fetch(`/api/logout`, {
            headers: {
                'Accept': 'application/json'
            },
            credentials: "include",
        })
        const data = await res.json();
        localStorage.removeItem("roomId");
        localStorage.removeItem("username");
        if(data.message) window.location.assign(`/login`);

    }

    return (
            <>
                    <header className="chat-header">
                        <div className="chat-header__container">
                            <span onClick={handleLogOut} className="chat-header__logOut-btn">X</span>
                         </div>
                       
                    </header>
                </>
    )
}

export default Header