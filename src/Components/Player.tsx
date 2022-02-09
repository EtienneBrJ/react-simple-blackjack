import classes from './Player.module.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCoins } from '@fortawesome/free-solid-svg-icons'


interface PlayerInterface {
    chips: number;
    cards: string[];
    score: number;
    name: string | undefined;
}


const Player: React.FC<PlayerInterface> = ({ chips, cards, score, name }) => {
    return (
        <div className={classes.player}>
            <div className={classes.player__info}>
                <p className={classes.player__info__score}>{name}'s score: {score}</p>
                <p className={classes.player__info__bankroll}>
                    <FontAwesomeIcon icon={faCoins} /> {chips}
                </p>
            </div>
            <div className={classes.player__cards}>
                {cards.map((card) => (
                    card
                        ? <img className={classes.player__cards__card} key={card} src={require(`../Cards/${card}.svg`)} alt={card} />
                        : null
                ))}
            </div>
        </div>
    )
};

export default Player;