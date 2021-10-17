import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  chats: 
    {
        0: { messages: []}
    }
  
}

export const  MessagesSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {
    addMessage: (state, action) => {
        const {chatId, text} = action.payload
        const messages = state.chats[chatId]?.messages || []
        const newMessage = {
          id: messages.length, 
          text: text
        }
        if(!state.chats[chatId]) {
            state.chats[chatId] = {
                messages: [newMessage]
            }
        } else {
        state.chats[chatId].messages = [...messages, newMessage]
        }
      },  
  },
})

// Action creators are generated for each case reducer function
export const { addMessage } = MessagesSlice.actions

export const messageChatSelector = chatId => state => (state.messages.chats[chatId]?.messages || [])

export default MessagesSlice.reducer