import { createSlice } from "@reduxjs/toolkit";


interface IBankroll {
    value: number;
}

const initialBankroll: IBankroll = {
    value: 1000
}

export const bankrollSlice = createSlice({
    name: "bankroll",
    initialState: initialBankroll,
    reducers: {
        setBankroll: (state, action) => {
            state.value = action.payload
        }
    }
})

export const { setBankroll } = bankrollSlice.actions
export default bankrollSlice.reducer;