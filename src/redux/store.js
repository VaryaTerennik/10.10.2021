import { configureStore } from '@reduxjs/toolkit'
import chatlistReducer from './ChatList'
import messagesliceReducer from './MessagesSlice'
// import socketsMiddleware from './socketsMiddleware'

export const store = configureStore({
  reducer: {
    chatlist: chatlistReducer,
    messageslist: messagesliceReducer
  },

  // middleware: getDefaultMiddleware => getDefaultMiddleware().concat(socketsMiddleware),
  
})