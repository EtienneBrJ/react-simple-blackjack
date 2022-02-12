import { createSlice } from "@reduxjs/toolkit";


interface IMessage {
    value: string;
}

const initialMessage: IMessage = {
    value: 'Welcome, place a bet!'
}

export const messageSlice = createSlice({
    name: "message",
    initialState: initialMessage,
    reducers: {
        setMessage: (state, action) => {
            state.value = action.payload
        }
    }
})

export const { setMessage } = messageSlice.actions
export default messageSlice.reducer;