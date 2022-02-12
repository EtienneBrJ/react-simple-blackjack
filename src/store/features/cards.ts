import { createSlice } from "@reduxjs/toolkit";
import { generateDeck } from "../../utils";
import { shuffle } from "lodash";

const newShuffledDeck = shuffle(generateDeck())

interface ICards {
    value: {
        deck: string[],
        bank: string[],
        player: string[]
    };
}

const initialCards: ICards = {
    value: {
        deck: newShuffledDeck,
        bank: [],
        player: []
    }
}

export const cardsSlice = createSlice({
    name: "cards",
    initialState: initialCards,
    reducers: {
        deal: (state, action) => {
            const deck = state.value.deck
            state.value.player = [deck[deck.length - 1], deck[deck.length - 3]]
            state.value.bank = [deck[deck.length - 2], deck[deck.length - 4]]
            deck.splice(-4)
            state.value.deck = deck
        },
        // Je dois trouver une meilleure façon
        hit: (state, action) => {
            const deck = state.value.deck
            if (action.payload === 'player') {
                state.value.player.push(deck[deck.length - 1])
            } else if (action.payload === 'bank') {
                state.value.bank.push(deck[deck.length - 1])
            }
            state.value.deck.pop()
        },
        // Utiliser dans useEffect pour mettre à jour le deck
        setDeck: (state, action) => {
            state.value.deck = action.payload
        },
        addNewDeck: (state, action) => {
            state.value.deck = newShuffledDeck.concat(action.payload)
        }
    }
})

export const { deal, hit, setDeck, addNewDeck } = cardsSlice.actions
export default cardsSlice.reducer;

