import { useEffect, useState } from 'react'
import { generateDeck, calculateScore } from './utils'
import _ from 'lodash'
import Player from './Components/Player'
import Bank from './Components/Bank'
import './Styles/App.css'


const App: React.FC = () => {

  enum CurrentState {
    bet,
    dealing,
    playerTurn,
    bankTurn,
    checkWinner,
    reset,
  }

  const [currentState, setCurrentState] = useState(CurrentState.bet)
  const [deck, setDeck] = useState<string[]>([]);

  const [bankCards, setBankCards] = useState<string[]>([]);
  const [bankScore, setBankScore] = useState<number>(0);
  const [message, setMessage] = useState('Welcome! Take a seat')

  const [chips, setChips] = useState<number>(100);
  const [playerCards, setPlayerCards] = useState<string[]>([]);
  const [playerScore, setPlayerScore] = useState(0);
  const [bet, setBet] = useState<number>(0);

  useEffect(() => {
    if (playerScore > 21 && currentState > 1 && currentState < 4) {
      setCurrentState(CurrentState.checkWinner)
    }
    if (currentState > CurrentState.dealing) {
      setPlayerScore(calculateScore(playerCards))
      setBankScore(calculateScore(bankCards))
    }

    if (currentState === CurrentState.bankTurn) {
      if (bankScore < 17) {
        const bCards: any = bankCards
        bCards.push(deck.pop())
        setBankCards(bCards)
        setBankScore(calculateScore(bankCards))
      } else {
        setCurrentState(currentState + 1)
      }
    }
    if (currentState === CurrentState.checkWinner) {
      if ((playerScore > 21) || (bankScore > playerScore && bankScore <= 21)) {
        setMessage('You loose the round')
        setCurrentState(CurrentState.reset)
      } else if (bankScore === playerScore) {
        setChips(chips + bet)
        setMessage('Chop-chop')
        setCurrentState(CurrentState.reset)
      } else if (playerScore <= 21 && (bankScore > 21 || playerScore > bankScore)) {
        setChips(chips + bet * 2)
        setMessage('You win and double your bet')
        setCurrentState(CurrentState.reset)
      }
    }
  }, [deck, bet, chips, bankCards, bankScore, playerCards, playerScore, currentState,
    CurrentState.reset, CurrentState.dealing, CurrentState.checkWinner, CurrentState.bankTurn,])

  const startDeal = () => {
    setCurrentState(CurrentState.dealing)
    setMessage('Hit or stay?')
    let _deck = _.shuffle(generateDeck())
    const tmpPlayerCards: string[] = []
    const tmpBankCards: string[] = []
    for (let i = 0; i < 4; i++) {
      if (i % 2 === 0) {
        tmpPlayerCards.push(_deck.pop())
      } else {
        tmpBankCards.push(_deck.pop())
      }
    }
    setPlayerCards(tmpPlayerCards)
    setBankCards(tmpBankCards)
    setDeck(_deck)
    setChips(chips - bet)
    setCurrentState(CurrentState.playerTurn)
  };
  const hit = () => {
    if (currentState === CurrentState.playerTurn) {
      let pCards: any = playerCards
      pCards.push(deck.pop())
      setPlayerCards(pCards)
      setPlayerScore(calculateScore(pCards))
    }

  };
  const stay = () => {
    if (currentState === CurrentState.playerTurn) {
      setCurrentState(CurrentState.bankTurn)
    }
  };

  // To do 
  const double = () => {

  };

  return (
    <div className="App">
      <Bank cards={bankCards} score={bankScore} state={currentState} message={message} />
      <Player chips={chips} bet={bet} cards={playerCards} setBet={setBet} state={currentState}
        startDeal={() => startDeal()} score={playerScore} hit={() => hit()} stay={() => stay()} double={() => double()} />
    </div>
  );
};

export default App;