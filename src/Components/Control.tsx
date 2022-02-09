import { useRef } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCoins } from '@fortawesome/free-solid-svg-icons'
import classes from './Control.module.scss'


interface ControlInterface {
    startDeal: any;
    hit: any;
    stand: any;
    state: number;
    chips: number;
    bet: number;
    setBet: any;

}

const Control: React.FC<ControlInterface> = ({ startDeal, hit, stand, state, chips, bet, setBet }) => {

    const betAmount = useRef<HTMLInputElement>(null)

    const checkBet = (e: React.ChangeEvent<HTMLInputElement>) => {
        const _bet = parseInt(e.target.value)
        return _bet <= chips && _bet >= 0 ? true : false
    }

    return (
        <div className={classes.control}>
            {state === 0 || state === 5 ?
                <div className={classes.control__bet}>
                    <div className={classes.control__bet__input}>
                        <input ref={betAmount} type="range" min="0" max={chips} value={bet} placeholder="  Your bet" onChange={e => (checkBet(e) ? setBet(parseInt(e.target.value)) : setBet(0))} />
                    </div>
                    <div>
                        <button className={classes.control__deal} onClick={startDeal}>Bet {betAmount.current?.value ? betAmount.current?.value : 0} <FontAwesomeIcon icon={faCoins} /></button>
                    </div>
                </div>
                : null}
            {state === 2 ?
                <div className={classes.control__action}>
                    <button onClick={hit}>Hit</button>
                    <button onClick={stand}>Stand</button>
                </div>
                : null}
        </div>)
}

export default Control;