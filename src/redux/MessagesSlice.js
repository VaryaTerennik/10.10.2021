import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

const initialState = {
 chats: {}
}

export const fetchMessages = createAsyncThunk(
  'users/fetchMessages',
  async (chatId) => {
    const response = await fetch(`https://inordic-messenger-api.herokuapp.com/chats/${chatId}/messages`)
    const messages = await response.json()
    return {
      chatId,
      messages: messages
     }
  }
)

export const deleteMessage = createAsyncThunk(
  'users/deleteMessage',
  async (data) => {
    const chatId = data.chatId
    const messageId = data.messageId
    const response = await fetch(`https://inordic-messenger-api.herokuapp.com/chats/${chatId}/messages/${messageId}`, {
      method: "DELETE", 
      body: JSON.stringify({data}),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    const messages = await response.json()
    return {
      chatId,
      messageId
     }
  }
)


export const  MessagesSlice = createSlice({
  name: 'messageslist',
  initialState,
  reducers: {
    addMessage: (state, action) => {
        const {chatId} = action.payload
        const messages = state.chats[chatId]?.messages || []
        const newMessage = action.payload
        if(!state.chats[chatId]) {
            state.chats[chatId] = {
                messages: [newMessage]
            }
        } else {
        state.chats[chatId].messages = [...messages, newMessage]
        }
      },  
      postMessage: () => {

      },

      // deleteMessage: (state, action) => {
      //   const {chatId} = action.payload
      //   const messages = state.chats[chatId]?.messages || []
      //   const delMessage = action.payload
      //   if(!state.chats[chatId]) {
      //       state.chats[chatId] = {
      //           messages: [newMessage]
      //       }
      //   } else {
      //   state.chats[chatId].messages = [...messages, newMessage]
      //   }
      // },  
  },

  extraReducers: (builder) => {
    builder.addCase(fetchMessages.fulfilled, (state, action) => {
      const {chatId, messages} = action.payload
      if(!state.chats[chatId]) {
        state.chats[chatId] = {
            messages
        }
    } else {
    state.chats[chatId].messages = messages
    }
    })

    builder.addCase(deleteMessage.fulfilled, (state, action) => {
      const {chatId, messageId} = action.payload
      state.chats[chatId].messages.splice((state.chats[chatId].messages.findIndex(el => el._id === messageId)), 1)
    })
  },

})

export const { addMessage, postMessage } = MessagesSlice.actions

export const messageChatSelector = chatId => state => (state.messageslist.chats[chatId]?.messages || [])

export default MessagesSlice.reducer