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
                {cards.length > 0 ?
                    <div>
                        {/* Moyen de map avec des conditions ?*/}
                        <img className="card" src={require(`../Cards/${cards[0]}.svg`)} alt={cards[0]} />
                        <img className="card" src={cards[1] && state > 2 ? require(`../Cards/${cards[1]}.svg`) : require(`../Cards/${hiddenCard}.svg`)} alt={state > 2 ? cards[1] : 'hidden'} />
                        <img className="card" src={cards[2] ? require(`../Cards/${cards[2]}.svg`) : undefined} alt={cards[2]} />
                        <img className="card" src={cards[3] ? require(`../Cards/${cards[3]}.svg`) : undefined} alt={cards[3]} />
                        <img className="card" src={cards[4] ? require(`../Cards/${cards[4]}.svg`) : undefined} alt={cards[4]} />
                    </div>
                    : null}
            </div>
            <span className="message">{message}</span>
        </div >
    )
};

export default Bank;