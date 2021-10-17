import { useState } from "react"
import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { addMessage } from '../redux/MessagesSlice'
import ChatMessages from './ChatMessages'
import { messageChatSelector } from '../redux/MessagesSlice'

function MessageList({chatId}) {

    const messages = useSelector(messageChatSelector(chatId))
    console.log(messages)
    const dispatch = useDispatch()
    
    const handleAddMessage = (data) => {
        dispatch(addMessage({chatId, text: data.text}))
    };
    
    return (
        <div className="MessagesContent">
        
        <div className="MessagesList">
        <div className="TitleChat">Чат</div>
        {messages.map(message => (
                    <div key={message.id}>{message.text}</div>   
                ))}
        <ChatMessages onSubmit = {handleAddMessage}></ChatMessages>   
            </div>
        </div>

    )
}

export default MessageList