import { createSlice } from "@reduxjs/toolkit";
import { State } from '../../data/models/state.model'


interface IState {
    value: number
}

const initialState: IState = {
    value: State.bet,
}

export const stateSlice = createSlice({
    name: "state",
    initialState,
    reducers: {
        setState: (state, action) => {
            state.value = action.payload
        },
    },
})

export const { setState } = stateSlice.actions
export default stateSlice.reducer;