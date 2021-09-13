import React from "react"
import { render, screen } from '@testing-library/react';
import GetMessages from "./GetMessages";
import NewMessage from "./NewMessage";
import '@testing-library/jest-dom/extend-expect'

test("render getMessages", () => {
    const list = {isLoaded: true, data: [{room:"Hello", mex:"hey", idmessage:"613720acb4bb920ffcfe6cc3", user:"LucaB"}]}
    const {getByText} = render(<GetMessages messageList={list}></GetMessages>)
    expect(getByText(list.data[0].mex)).toBeInTheDocument();  
    expect(getByText(list.data[0].user)).toBeInTheDocument(); 
})


test("render new message", () => {
    const textMessage = {findmessage: {message: "Ciao", sender: "613a823e572a0329c40a0cc4"},sender: {_id:"613a823e572a0329c40a0cc4", username:"sandro23", email: "luca.bert@gmail.com", password:"asdfasfsdafsaf"},topicName: "non so", error: ""}
    const {getByText} = render(<NewMessage message={textMessage}></NewMessage>)
    //expect(getByText(textMessage.findmessage.message)).toBeInTheDocument();  
    expect(getByText(textMessage.sender.username)).toBeInTheDocument(); 
})

