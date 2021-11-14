import{ io } from "socket.io-client"
import {useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { addMessage } from '../redux/MessagesSlice'


function useSocket() {
const dispatch = useDispatch()
const socket = io('https://inordic-messenger-api.herokuapp.com/')

useEffect( () => {
    socket.on('new message', message => {
        dispatch(addMessage(message))
    })
}, [])

const postMessage = (message) => {
    socket.emit('new message', message)
}

return { postMessage }

}

export default useSocket