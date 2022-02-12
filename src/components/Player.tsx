import classes from './Player.module.scss'
import { useAppSelector } from '../store/hook'

const Player: React.FC = () => {

    const score = useAppSelector((state) => state.score.value.player)
    const cards = useAppSelector((state) => state.cards.value.player)


    return (
        <div className={classes.player}>
            <div className={classes.player__info}>
                <p className={classes.player__info__score}>{score ? score : null}</p>
            </div>
            <div className={classes.player__cards}>
                {cards.map((card) => (
                    card
                        ? <img className={classes.player__cards__card} key={card} src={require(`../assets/${card}.svg`)} alt={card} />
                        : null
                ))}
            </div>
        </div>
    )
};

export default Player;