import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCoins } from '@fortawesome/free-solid-svg-icons'

import classes from './Bankroll.module.scss'

interface BankrollInterface {
    chips: number;
}

const Bankroll: React.FC<BankrollInterface> = ({ chips }) => {
    return (
        <div className={classes.bankroll}>
            <p>{chips} <FontAwesomeIcon icon={faCoins} /></p>
        </div>
    )
}

export default Bankroll