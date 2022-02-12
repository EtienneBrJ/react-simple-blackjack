import { createSlice } from "@reduxjs/toolkit";


interface ILeaderboard {
    value:
    {
        user: string;
        score: number;
    }[];
}

const initialLeaderboard: ILeaderboard = {
    value: [
        {
            user: '',
            score: 0
        }
    ]
}

export const leaderboardSlice = createSlice({
    name: 'leaderboard',
    initialState: initialLeaderboard,
    reducers: {
        setLeaderboard: (state, action) => {
            state.value = action.payload
            state.value.sort((a, b) => b.score - a.score)
        }
    }
})

export const { setLeaderboard } = leaderboardSlice.actions;

export default leaderboardSlice.reducer;