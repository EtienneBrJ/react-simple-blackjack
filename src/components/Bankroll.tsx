import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCoins } from '@fortawesome/free-solid-svg-icons'
import classes from './Bankroll.module.scss'
import { useAppSelector } from '../store/hook'


const Bankroll: React.FC = () => {

    const chips = useAppSelector((state) => state.bankroll.value)
    return (
        <div className={classes.bankroll}>
            <p>{chips} <FontAwesomeIcon icon={faCoins} /></p>
        </div>
    )
}

export default Bankroll