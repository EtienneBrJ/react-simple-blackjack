import { getScore } from "../utils";
import '../Styles/Bank.css'

interface IBank {
    cards: any[];
    score: number;
    message: string;
    state: number;
}

const Bank: React.FC<IBank> = ({ cards, score, message, state }) => {

    const hiddenCard = 'hiddenCard'

    return (
        <div className='bankContainer'>
            <div className="bankInfo">
                <p className="score">Dealer's score: {cards[1] && state < 3 ? score - getScore[cards[1][0]] : score}</p>
            </div>
            <div className="cardsContainer">
                {cards.map((card, index) => (
                    card
                        ? <img className="card" key={card} src={require(`../Cards/${index === 1 && state < 3 ? hiddenCard : card}.svg`)} alt={card} />
                        : null
                ))}
            </div>
            <span className="message">{message}</span>
        </div >
    )
};

export default Bank;