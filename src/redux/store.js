import { configureStore } from '@reduxjs/toolkit'
import chatlistReducer from './ChatList'

export const store = configureStore({
  reducer: {
    chatlist: chatlistReducer,
  },
})