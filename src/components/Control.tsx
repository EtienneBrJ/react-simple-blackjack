import { useRef } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCoins } from '@fortawesome/free-solid-svg-icons'
import { State } from '../data/models/state.model'

import { useAppSelector } from '../store/hook'
import { useAppDispatch } from '../store/hook'
import { setState } from '../store/features/state'
import { setMessage } from '../store/features/message'
import { setBankroll } from '../store/features/bankroll'
import { deal, hit } from '../store/features/cards'
import { setBet } from '../store/features/bet'

import classes from './Control.module.scss'

const Control: React.FC = () => {

  const dispatch = useAppDispatch()

  const appState = useAppSelector((state) => state.currentState.value)
  const chips = useAppSelector((state) => state.bankroll.value)
  const bet = useAppSelector((state) => state.bet.value)

  const betAmount = useRef<HTMLInputElement>(null)

  const checkBet = (_bet: number) => {
    return _bet <= chips && _bet >= 0
  }

  const startDeal = () => {
    if (bet >= 0 && chips > 0) {
      dispatch(setState(State.dealing))
      dispatch(setBankroll(chips - bet))
      dispatch(setMessage('Hit or stand?'))
      dispatch(deal())
      dispatch(setState(State.playerTurn))
    } else {
      dispatch(setMessage('No money, refresh the page'))
    }
  };

  return (
    <div className={classes.control}>
      {appState === 0 || appState === 5 ?
        <div className={classes.control__bet}>
          <div className={classes.control__bet__input}>
            <input ref={betAmount} type="range" min="0" max={chips}
              value={bet} onChange={e => {
                const _bet = parseInt(e.target.value);
                (checkBet(_bet) ? dispatch(setBet(_bet)) : dispatch(setBet(0)))
              }} />
          </div>
          <div>
            <button className={classes.control__deal} onClick={startDeal}>Bet {betAmount.current?.value ? betAmount.current?.value : 0} <FontAwesomeIcon icon={faCoins} /></button>
          </div>
        </div>
        : null}
      {appState === 2 ?
        <div className={classes.control__action}>
          <button onClick={() => dispatch(hit('player'))}>Hit</button>
          <button onClick={() => dispatch(setState(State.bankTurn))}>Stand</button>
        </div>
        : null}
    </div>)
}

export default Control;