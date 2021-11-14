import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'


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

export const deleteChat = createAsyncThunk(
  'users/deleteChat',
  async ({chatId}) => {
    const response = await fetch(`https://inordic-messenger-api.herokuapp.com/chats/${chatId}`, {
      method: "DELETE", 
      body: JSON.stringify({chatId}),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    // const chats = await response.json()
    // console.log(chatId)
    return chatId
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

    builder.addCase(deleteChat.fulfilled, (state, action) => {
      state.chats.splice((state.chats.findIndex(el => el._id === action.payload)), 1)
    })
  },

 
})

// export const { addChat } = ChatList.actions

export default ChatList.reducer