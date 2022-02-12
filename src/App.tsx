import { useEffect } from 'react'
import { calculateScore } from './utils'
import { State } from './data/models/state.model'

import Bankroll from './components/Bankroll'
import Message from './components/Message'
import BoardButton from './components/Leaderboard'
import Bank from './components/Bank'
import Player from './components/Player'
import Control from './components/Control'

import { useAppDispatch, useAppSelector } from './store/hook'
import { setState } from './store/features/state'
import { setMessage } from './store/features/message'
import { setBankroll } from './store/features/bankroll'
import { setBankScore, setPlayerScore } from './store/features/score'
import { hit, addNewDeck } from './store/features/cards'


const App: React.FC = () => {

  const dispatch = useAppDispatch()
  // moyen d'importer de manière plus propre?
  const appState = useAppSelector((state) => state.currentState.value)
  const chips = useAppSelector((state) => state.bankroll.value)
  const score = useAppSelector((state) => state.score.value)
  const cards = useAppSelector((state) => state.cards.value)
  const bet = useAppSelector((state) => state.bet.value)

  const bankScore = score.bank
  const playerScore = score.player

  const bankCards = cards.bank
  const playerCards = cards.player
  const deck = cards.deck

  // Je dois regarder les services
  useEffect(() => {
    if (appState === State.bankTurn) {
      if (calculateScore(bankCards) < 17) {
        dispatch(hit('bank'))
        dispatch(setBankScore(calculateScore(bankCards)))
      } else {
        dispatch(setState(State.checkWinner))
      }
    }
    if (appState === State.checkWinner) {
      if ((playerScore > 21) || (bankScore > playerScore && bankScore <= 21)) {
        dispatch(setMessage('You loose the round'))
      } else if (bankScore === playerScore) {
        dispatch(setBankroll(chips + bet))
        dispatch(setMessage('Chop-chop'))
      } else if (playerScore <= 21 && (bankScore > 21 || playerScore > bankScore)) {
        dispatch(setBankroll(chips + bet * 2))
        dispatch(setMessage('You win and double your bet'))
      }
      dispatch(setState(State.endRound))
    }
  }, [appState, bankCards, bankScore, bet, chips, playerCards, playerScore, dispatch])


  useEffect(() => {
    if (playerScore > 21 && appState > 1 && appState < 4) {
      dispatch(setState(State.checkWinner))
    }
  }, [appState, playerScore, dispatch])

  useEffect(() => {
    if (deck.length < 6) {
      dispatch(addNewDeck(deck))
    }
  }, [deck, dispatch])

  useEffect(() => {
    if (appState > 0 && appState < 5) {
      dispatch(setPlayerScore(calculateScore(playerCards)))
      dispatch(setBankScore(calculateScore(bankCards)))
    }
  }, [bankCards, playerCards, appState, dispatch])

  return (
    <div className="App">
      <Bankroll />
      <Message />
      <Bank />
      <Player />
      <Control />
      <BoardButton />
    </div>
  );
};

export default App;