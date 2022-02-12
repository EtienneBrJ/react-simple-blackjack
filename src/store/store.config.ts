import { configureStore } from '@reduxjs/toolkit'
import stateReducer from './features/state'
import messageReducer from './features/message'
import bankrollReducer from './features/bankroll'
import scoreReducer from './features/score'
import cardsReducer from './features/cards'
import betReducer from './features/bet'

export const store = configureStore({
    reducer: {
        currentState: stateReducer,
        message: messageReducer,
        bankroll: bankrollReducer,
        score: scoreReducer,
        cards: cardsReducer,
        bet: betReducer,
    },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch