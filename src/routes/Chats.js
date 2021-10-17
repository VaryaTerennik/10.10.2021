import { useState } from 'react'
import { Link, NavLink, useHistory, useParams } from "react-router-dom";
import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { addChats } from '../redux/ChatList'
import { addMessage } from '../redux/MessagesSlice'
import ChatMessages from './ChatMessages'
import { messageChatSelector } from '../redux/MessagesSlice'
import MessageList from './MessagesList';

function Chats() {

const { chatId } = useParams()
const messages = useSelector(messageChatSelector(chatId))
console.log(messages)
const chatlist = useSelector((state) => state.chatlist.value)
const dispatch = useDispatch()
  
// const handleAddMessage = (data) => {
//     dispatch(addMessage({chatId, text: data.text}))
// };

const history = useHistory()

const handleAddChats = () => {
    const title = window.prompt('Введите название чата')
    dispatch(addChats(title))
    // history.push(`/chats/${id}`)

}

return (
    <div className="Chats">
        <h1>Чаты</h1>
        <button onClick={handleAddChats}>Добавить чат</button>
       <ul className="ItemChat">
            {chatlist.map(chat => (
                <li key={chat.id}>
                    <NavLink className = "App-link" activeClassName = "App-link-active" to={`/chats/${chat.id}`}>{chat.title}</NavLink>
                    {/* <ChatMessages onSubmit = {handleAddMessage}></ChatMessages>    */}
                </li>
            ))}
        </ul>
        <div> 
            <MessageList chatId={chatId}></MessageList>
            {/* {messages.map(message => (
                    <div key={message.id}>{message.text}</div>   
                ))} */}
        </div>  
        <div>Активный чат {chatId}</div>
    </div>
    )
}

export default Chats 