import { useState, useEffect } from 'react'
import { Link, NavLink, useHistory, useParams } from "react-router-dom";
import{ io } from "socket.io-client"
import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { addChat } from '../redux/ChatList'
import { addMessage, postMessage } from '../redux/MessagesSlice'
import { fetchMessages } from '../redux/MessagesSlice'
import { fetchChats } from '../redux/ChatList'
import ChatMessages from './ChatMessages'
import { messageChatSelector } from '../redux/MessagesSlice'
import MessageList from './MessagesList';

function Chats() {

const { chatId } = useParams()
// const messages = useSelector(messageChatSelector(chatId))
// console.log(messages)
const chatlist = useSelector((state) => state.chatlist.chats)
const dispatch = useDispatch()

  
// const handleAddMessage = (data) => {
//     dispatch(addMessage({chatId, text: data.text}))
// };

const history = useHistory()

const handleaddChat = () => {
    const title = window.prompt('Введите название чата')
    dispatch(addChat({title}))
    // history.push(`/chats/${id}`)

}

useEffect(()=> {
    dispatch(fetchChats())
}, []);

const handleMessageSubmit = (message) => {
   dispatch(postMessage(message))
}

return (
    <div className="Chats">
        <h1>Чаты</h1>
        <button onClick={handleaddChat}>Добавить чат</button>
       <ul className="ItemChat">
            {chatlist.map(chat => (
                <li key={chat._id}>
                    <NavLink className = "App-link" activeClassName = "App-link-active" to={`/chats/${chat._id}`}>{chat.title}</NavLink>
                    {/* <ChatMessages onSubmit = {handleAddMessage}></ChatMessages>    */}
                </li>
            ))}
        </ul>
        <div> 
            <MessageList chatId={chatId} onSubmit={handleMessageSubmit}></MessageList>
            {/* {messages.map(message => (
                    <div key={message.id}>{message.text}</div>   
                ))} */}
        </div>  
        <div>Активный чат {chatId}</div>
    </div>
    )
}

export default Chats 