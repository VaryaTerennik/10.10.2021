import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  value: [
    {
        id: 0,
        title: 'Ваня'
    },
    {
        id: 1,
        title: 'Саша'
    },

],
}

export const  ChatList = createSlice({
  name: 'chatlist',
  initialState,
  reducers: {
    addChats: (state, action) => {
      const id = state.value.length;
        const newChats = {
          id,
          title: action.payload
        }
        state.value.push(newChats)
      },  
  },
})

// Action creators are generated for each case reducer function
export const { addChats } = ChatList.actions

export default ChatList.reducer