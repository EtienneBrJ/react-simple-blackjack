import '../Styles/Player.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCoins } from '@fortawesome/free-solid-svg-icons'


interface IPlayer {
    chips: number;
    cards: any[];
    score: number;
    startDeal: any;
    stand: any;
    hit: any;
    setBet: any;
    state: number;
}

const Player: React.FC<IPlayer> = ({ chips, cards, score, startDeal, stand, hit, setBet, state }) => {
    return (
        <div className="playerContainer">
            <div className="playerInfo">
                <p className="score">Player's score: {score}</p>
                <p className="bankroll">
                    {chips} <FontAwesomeIcon icon={faCoins} />
                </p>
            </div>
            <div className="cardsContainer">
                {cards.map((card) => (
                    card
                        ? <img className="card" key={card} src={require(`../Cards/${card}.svg`)} alt={card} />
                        : null
                ))}
            </div>
            <div className="controlContainer">
                {state === 0 || state === 5 ?
                    <div className="bet">
                        <input type="text" placeholder="  Your bet" onChange={e => setBet(parseInt(e.target.value))} />
                        <button onClick={() => startDeal()}>Start Deal</button>
                    </div>
                    : null}
                {state === 2 ?
                    <div className="action">
                        <button onClick={() => hit()}>Hit</button>
                        <button onClick={() => stand()}>Stand</button>
                    </div>
                    : null}

            </div>
        </div>
    )
};

export default Player;