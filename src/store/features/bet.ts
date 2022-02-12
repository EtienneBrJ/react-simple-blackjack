import { createSlice } from "@reduxjs/toolkit";


interface IBet {
    value: number;
}

const initialBet: IBet = {
    value: 0
}

export const betSlice = createSlice({
    name: "bet",
    initialState: initialBet,
    reducers: {
        setBet: (state, action) => {
            state.value = action.payload
        }
    }
})

export const { setBet } = betSlice.actions
export default betSlice.reducer;