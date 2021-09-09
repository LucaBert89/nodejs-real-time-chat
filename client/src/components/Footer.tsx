const Footer = (props: any) => {
    return (
            <>
                    <footer className="chat-footer">
                        <div className="chat-footer__container">
                            <div className="chat-footer__row">
                            <div className="chat-footer__col">
                                <h6>About</h6>
                                <p className="text-justify">
                                    This is a Real-time-chat-app Project. Let's have fun chatting with your friends! Open a topic of discussion an meet interesting persons!</p>
                            </div>

                            <div className="chat-footer__col">
                                <h6>Technologies</h6>
                                <ul className="footer-links">
                                <li>React</li>
                                <li>Typescript</li>
                                <li>Node.js</li>
                                <li>MongoDB</li>
                                <li>JWT Authentication</li>
                                <li>Socket.io</li>
                                </ul>
                            </div>
                            </div>
                            <hr></hr>
                        </div>
                        <div className="container">
                            <div className="chat-footer__row">
                            <div className="chat-footer__col">
                                <p className="copyright-text">Copyright &copy; 2021 All Rights Reserved
                                </p>
                            </div>
                            </div>
                        </div>
                        <br/>
                        <br/>
                        <br/>
                       
                    </footer>
                </>
    )
}

export default Footer