import { useState } from 'react'
import { Link, NavLink, useHistory, useParams } from "react-router-dom";
import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { addChats } from '../redux/ChatList'

function Chats() {

const chatlist = useSelector((state) => state.chatlist.value)
const dispatch = useDispatch()

const { chatsId } = useParams()
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
            </li>
            ))}
        </ul>
        <div>Активный чат {chatsId}</div>
    </div>
    )
}

export default Chats 