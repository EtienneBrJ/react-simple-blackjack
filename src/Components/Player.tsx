import classes from './Player.module.scss'


interface PlayerInterface {
    cards: string[];
    score: number;
}


const Player: React.FC<PlayerInterface> = ({ cards, score }) => {
    return (
        <div className={classes.player}>
            <div className={classes.player__info}>
                <p className={classes.player__info__score}>{score ? score : null}</p>
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