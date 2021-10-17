import { configureStore } from '@reduxjs/toolkit'
import chatlistReducer from './ChatList'
import messagesliceReducer from './MessagesSlice'

export const store = configureStore({
  reducer: {
    chatlist: chatlistReducer,
    messages: messagesliceReducer
  },
})