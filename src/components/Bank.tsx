import { useAppSelector } from "../store/hook";
import { CardPoints } from "../utils";
import classes from './Bank.module.scss'

const Bank: React.FC = () => {

    const appState = useAppSelector((state) => state.currentState.value)
    const score = useAppSelector((state) => state.score.value.bank)
    const cards = useAppSelector((state) => state.cards.value.bank)


    return (
        <div className={classes.bank}>
            {appState > 1 ?
                <p className={classes.bank__score}>{cards[1] && appState < 3 ? score - CardPoints[cards[1][0]] : score}</p>
                : null
            }
            <div className={classes.bank__cards}>
                {cards.map((card, index) => (
                    card
                        ? <img className={classes.bank__cards__card} key={card} src={require(`../assets/${index === 1 && appState < 3 ? `hiddenCard` : card}.svg`)} alt={card} />
                        : null
                ))}
            </div>
        </div >
    )
};

export default Bank;