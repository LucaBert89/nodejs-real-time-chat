import React from "react"
import { render, screen } from '@testing-library/react';
import GetMessages from "./GetMessages";

test("render getMessages", () => {
    const list = {isLoaded: true, data: [{room:"Hello", mex:"hey", idmessage:"613720acb4bb920ffcfe6cc3", user:"LucaB"}]}
    const {getByText} = render(<GetMessages messageList={list}></GetMessages>)
    expect(getByText(list.data[0].mex)).toBeInTheDocument();  
    expect(getByText(list.data[0].user)).toBeInTheDocument(); 
})