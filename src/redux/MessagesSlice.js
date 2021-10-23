import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

const initialState = {
 chats: {}
}

export const fetchMessages = createAsyncThunk(
  'users/fetchMessages',
  async (chatId) => {
    const response = await fetch(`https://inordic-messenger-api.herokuapp.com/chats/${chatId}/messages`)
    const messages = await response.json()
    console.log(messages)
    // console.log(chatId)
    // const messagesSelectChat = messages.filter(el => el.chatId === chatId)
    // console.log(messagesSelectChat)
    return {
      chatId,
      messages: messages
     }
  }
)

// export const addMessage = createAsyncThunk(
//   'users/addMessage',
//   // async ({chatId, text}) => {
//   async (state, action) => {

//     const {chatId, text} = action.payload
//     const response = await fetch(`https://inordic-messenger-api.herokuapp.com/chats/${chatId}/messages`, {
//       method: "POST", 
//       body: JSON.stringify({chatId, text}),
//       headers: {
//         'Content-Type': 'application/json'
//       }
//     })

//     const messages = state.chats[chatId]?.messages || []
//     const newMessage = await response.json()
//     console.log(newMessage);
//     if(!state.chats[chatId]) {
//               state.chats[chatId] = {
//                   messages: [newMessage]
//               }
//           } else {
//           state.chats[chatId].messages = [...messages, newMessage]
//           }
//   }
// )


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

      }
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

    // builder.addCase(addMessage.fulfilled, (state, action) => {
    //   state.messages.push(action.payload)
    // })
  },

})

export const { addMessage, postMessage } = MessagesSlice.actions

// export const messageChatSelector = chatId => state => (state.messageslist.messages.filter(el => el.chatId === chatId) || [])
export const messageChatSelector = chatId => state => (state.messageslist.chats[chatId]?.messages || [])
console.log(messageChatSelector)

export default MessagesSlice.reducer