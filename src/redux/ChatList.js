import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { io } from 'socket.io-client'


export const fetchChats = createAsyncThunk(
  'users/fetchChats',
  async () => {
    const response = await fetch('https://inordic-messenger-api.herokuapp.com/chats')
    const chats = await response.json()
    return chats
  }
)

export const addChat = createAsyncThunk(
  'users/addChat',
  async ({title}) => {
    const response = await fetch('https://inordic-messenger-api.herokuapp.com/chats', {
      method: "POST", 
      body: JSON.stringify({title}),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    const chat = await response.json()
    return chat
  }
)

const initialState = {
 chats: []
}



export const  ChatList = createSlice({
  name: 'chatlist',
  initialState,
  reducers: {
    // addChat: (state, action) => {
    //   const id = state.chats.length;
    //     const newChats = {
    //       id,
    //       title: action.payload
    //     }
    //     state.chats.push(newChats)
    //   }, 
  },

  extraReducers: (builder) => {
    builder.addCase(fetchChats.fulfilled, (state, action) => {
      state.chats = action.payload
    })

    builder.addCase(addChat.fulfilled, (state, action) => {
      state.chats.push(action.payload)
    })
  },

 
})

// export const { addChat } = ChatList.actions

export default ChatList.reducer