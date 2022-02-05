import { useEffect, useState } from 'react'
import { generateDeck, calculateScore } from './utils'
import BoardButton from './Components/Leaderboard'
import Player from './Components/Player'
import Bank from './Components/Bank'
import './Styles/App.css'
import _ from 'lodash'


const App: React.FC = () => {

  enum CurrentState {
    bet,
    dealing,
    playerTurn,
    bankTurn,
    checkWinner,
    endRound,
  }

  const newShuffledDeck = _.shuffle(generateDeck())

  const [currentState, setCurrentState] = useState(CurrentState.bet)
  const [message, setMessage] = useState('Welcome! Place a bet')

  const [deck, setDeck] = useState<string[]>(newShuffledDeck);
  const [bankCards, setBankCards] = useState<string[]>([]);
  const [bankScore, setBankScore] = useState(0);

  const [user, setUser] = useState<string>();
  const [playerCards, setPlayerCards] = useState<string[]>([]);
  const [playerScore, setPlayerScore] = useState(0);
  const [bet, setBet] = useState(0);
  const [chips, setChips] = useState(100);


  useEffect(() => {
    if (calculateScore(playerCards) > 21 && currentState > 1 && currentState < 4) {
      setCurrentState(CurrentState.checkWinner)
    }
    if (currentState === CurrentState.bankTurn) {

      if (calculateScore(bankCards) < 17) {
        setBankCards([...bankCards, deck[deck.length - 1]])
        deck.splice(deck.length - 1, 1)
        setBankScore(calculateScore(bankCards))
      } else {
        setCurrentState(CurrentState.checkWinner)
      }
    }
    if (currentState === CurrentState.checkWinner) {
      setCurrentState(CurrentState.endRound)
      if ((playerScore > 21) || (bankScore > playerScore && bankScore <= 21)) {
        setChips(chips - bet)
        setMessage('You loose the round')
      } else if (bankScore === playerScore) {
        setChips(chips + bet)
        setMessage('Chop-chop')
      } else if (playerScore <= 21 && (bankScore > 21 || playerScore > bankScore)) {
        setChips(chips + bet * 2)
        setMessage('You win and double your bet')
      }
    }
  }, [deck, bet, chips, bankCards, bankScore, playerCards, playerScore, currentState,
    CurrentState.endRound, CurrentState.dealing, CurrentState.checkWinner, CurrentState.bankTurn,])

  useEffect(() => {
    setDeck(deck)
    if (deck.length < 6) {
      setDeck(newShuffledDeck.concat(deck))
    }
  }, [deck, newShuffledDeck])

  useEffect(() => {
    if (currentState > 0 && currentState < 5) {
      setPlayerScore(calculateScore(playerCards))
      setBankScore(calculateScore(bankCards))
    }
  }, [bankCards, playerCards, currentState])

  const startDeal = () => {
    setCurrentState(CurrentState.dealing)
    setMessage('Hit or stand?')
    setPlayerCards([deck[deck.length - 1], deck[deck.length - 3]])
    setBankCards([deck[deck.length - 2], deck[deck.length - 4]])
    deck.splice(deck.length - 4, 4)
    setCurrentState(CurrentState.playerTurn)
  };
  const hit = () => {
    if (currentState === CurrentState.playerTurn) {
      setPlayerCards([...playerCards, deck[deck.length - 1]])
      deck.splice(deck.length - 1, 1)
    }

  };
  const stand = () => {
    if (currentState === CurrentState.playerTurn) {
      setCurrentState(CurrentState.bankTurn)
    }
  };

  return (
    <div className="App">
      <Bank cards={bankCards} score={bankScore} state={currentState} message={message} />
      <Player chips={chips} cards={playerCards} bet={bet} setBet={setBet} state={currentState} name={user ? user : 'Player'}
        startDeal={startDeal} score={playerScore} hit={hit} stand={stand} />
      <BoardButton user={user} setUser={setUser} score={chips} />
    </div>
  );
};

export default App;