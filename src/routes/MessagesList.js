import { useEffect } from 'react'
import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import ChatMessages from './ChatMessages'
import { messageChatSelector } from '../redux/MessagesSlice'
import { fetchMessages } from '../redux/MessagesSlice'

function MessageList({chatId, onSubmit}) {


    const messages = useSelector(messageChatSelector(chatId))
    console.log(messages)
    const dispatch = useDispatch()
    
    const handleAddMessage = (data) => {
        const newMessage = {chatId, text: data.text}
        onSubmit(newMessage);
    };

    useEffect(()=> {
        dispatch(fetchMessages(chatId))
    }, [chatId]);
  
    
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