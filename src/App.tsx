import { useEffect, useState } from 'react'
import { generateDeck, calculateScore } from './utils'
import Bankroll from './Components/Bankroll'
import Message from './Components/Message'
import BoardButton from './Components/Leaderboard'
import Bank from './Components/Bank'
import Player from './Components/Player'
import Control from './Components/Control'
import shuffle from 'lodash/shuffle' // manque @types/lodash
// import _ from 'lodash' // trop lourd d'importer tout lodash faut mieux importer la function nécessaire comme au dessus


const App: React.FC = () => {

  // perso je mettrai ça dans un fichiers : src/data/models/state.model.ts. Généralement, pour les interfaces, les types, les enums, je met ça dans le dossier models.
  enum CurrentState {
    bet,
    dealing,
    playerTurn,
    bankTurn,
    checkWinner,
    endRound,
  }

  const newShuffledDeck = shuffle(generateDeck())

  /**
   * Il vaudrait mieux créer un store qui sera partagé dans l'application avec Redux.
   * Le store est un objet qui sera partagé dans toute l'application. Chaque composant y aura accès, du coup moins de transmission de datas via des props, ca sera plus simple
   * Exemple de store : 
   * {
   *    currentState: 0,
   *    message: 'test',
   *    deck: [AH,...],
   *    ...
   * }
   * 
   * Et chaque composant pourras y accèder avec : useSelector<RootState, number>((rootState) => rootState.currentState);
   * Et pour mettre à jour tu as une méthode qui s'appelle dispatch
   * 
   * Voici le lien vers la doc : https://react-redux.js.org/introduction/getting-started
   * 
   */
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

    // je déplacerai tout ça dans un service par exemple dans : /src/data/services/state.service.ts

    /**
     * Ici je ferai juste un truc du genre:
     * const newState = stateService.getState(xxx); // passe les paramètres dont tu as besoin
     * const newMessage = messageService.getMessage(xxx);
     * setCurrentState(newState); 
     * setCurrentMessaget(message);
     */
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

  // si tu utilises un store, tu pourras déplacer cette fonction dans le components approprié, soit <Control />
  // Le ControlComponents sera en mesure de mettre à jour le store lui meme
  const startDeal = () => {
    if (bet >= 0 && chips > 0) {
      setCurrentState(CurrentState.dealing)
      setChips(chips - bet)
      setMessage('Hit or stand?')
      setPlayerCards([deck[deck.length - 1], deck[deck.length - 3]])
      setBankCards([deck[deck.length - 2], deck[deck.length - 4]])
      deck.splice(deck.length - 4, 4)
      setCurrentState(CurrentState.playerTurn)
    } else {
      setMessage('No money, refresh the page')
    }
  };

  // Idem que le startDeal
  const hit = () => {
    if (currentState === CurrentState.playerTurn) {
      setPlayerCards([...playerCards, deck[deck.length - 1]])
      deck.splice(deck.length - 1, 1)
    }

  };

  // Idem que le startDeal
  const stand = () => {
    if (currentState === CurrentState.playerTurn) {
      setCurrentState(CurrentState.bankTurn)
    }
  };

  return (
    <div className="App">
      <Bankroll chips={chips} />
      <Message message={message} />
      <Bank cards={bankCards} score={bankScore} state={currentState} />
      <Player cards={playerCards} score={playerScore} />
      <Control startDeal={startDeal} hit={hit} stand={stand} state={currentState} chips={chips} bet={bet} setBet={setBet} />
      <BoardButton user={user} setUser={setUser} score={chips} />
    </div>
  );
};

export default App;