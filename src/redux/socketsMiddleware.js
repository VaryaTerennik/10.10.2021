import{ io } from "socket.io-client"
import { addMessage, postMessage } from './MessagesSlice'

const socket = io('https://inordic-messenger-api.herokuapp.com/')

const socketsMiddleware = store => {
    socket.on('new message', message => {
        store.dispatch(addMessage(message))
    })

    return next => action => {
        if(action.type === postMessage.type) {
            socket.emit('new message', action.payload)
        }
        return next(action)
    }
}

export default socketsMiddleware