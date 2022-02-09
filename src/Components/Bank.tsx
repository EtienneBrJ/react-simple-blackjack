import { getScore } from "../utils";

import classes from './Bank.module.scss'

interface BankInterface {
    cards: string[];
    score: number;
    state: number;
}

const Bank: React.FC<BankInterface> = ({ cards, score, state }) => {

    const hiddenCard = 'hiddenCard'

    return (
        <div className={classes.bank}>
            {state > 1 ?
                <p className={classes.bank__score}>{cards[1] && state < 3 ? score - getScore[cards[1][0]] : score}</p>
                : null
            }
            <div className={classes.bank__cards}>
                {cards.map((card, index) => (
                    card
                        ? <img className={classes.bank__cards__card} key={card} src={require(`../Cards/${index === 1 && state < 3 ? hiddenCard : card}.svg`)} alt={card} />
                        : null
                ))}
            </div>
        </div >
    )
};

export default Bank;