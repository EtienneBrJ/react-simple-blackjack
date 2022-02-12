import { createSlice } from "@reduxjs/toolkit";


interface IScore {
    value: {
        bank: number,
        player: number
    };
}

const initialScore: IScore = {
    value: {
        bank: 0,
        player: 0
    }
}

export const scoreSlice = createSlice({
    name: "score",
    initialState: initialScore,
    reducers: {
        setBankScore: (state, action) => {
            state.value.bank = action.payload
        },
        setPlayerScore: (state, action) => {
            state.value.player = action.payload
        }
    }
})

export const { setBankScore, setPlayerScore } = scoreSlice.actions
export default scoreSlice.reducer;