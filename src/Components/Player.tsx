import { calculateScore } from "../utils";
import '../Styles/Player.css'

interface IPlayer {
    chips: number;
    cards: any[];
    score: number;
    bet: number;
    startDeal: any;
    stand: any;
    hit: any;
    setBet: any;
    state: number;
}

const Player: React.FC<IPlayer> = ({ chips, cards, score, bet, startDeal, stand, hit, setBet, state }) => {
    return (
        <div className="playerContainer">
            <div className="playerInfo">
                <p className="score">Player's score: {calculateScore(cards)}</p>
                <p className="bankroll">${chips}</p>
            </div>
            <div className="cardsContainer">
                {cards.map((card) => (
                    card.length > 0
                        ? <img className="card" key={card} src={require(`../Cards/${card}.svg`)} alt={card} />
                        : null
                ))}
            </div>
            <div className="controlContainer">
                <div className="bet">
                    <input type="text" placeholder="  Your bet" onChange={e => setBet(parseInt(e.target.value))} />
                    <button onClick={() => startDeal()}>Start Deal</button>
                </div>
                <div className="action">

                    <button onClick={() => hit()}>Hit</button>
                    <button onClick={() => stand()}>Stand</button>
                </div>

            </div>
        </div>
    )
};

export default Player;