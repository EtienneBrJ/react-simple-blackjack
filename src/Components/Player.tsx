import '../Styles/Player.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCoins } from '@fortawesome/free-solid-svg-icons'


interface PlayerInterface {
    chips: number;
    cards: any[];
    score: number;
    startDeal: any;
    stand: any;
    hit: any;
    setBet: any;
    state: number;
    name: string | undefined;
    bet: number;
}

const Player: React.FC<PlayerInterface> = ({ chips, cards, score, startDeal, stand, hit, setBet, state, name, bet }) => {
    return (
        <div className="playerContainer">
            <div className="playerInfo">
                <p className="score">{name}'s score: {score}</p>
                <p className="bankroll">
                    <FontAwesomeIcon icon={faCoins} /> {chips}
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
                        <input type="text" placeholder="  Your bet" onChange={e => setBet(parseInt(e.target.value))} value={bet || undefined} />
                        <button onClick={startDeal}>Start Deal</button>
                    </div>
                    : null}
                {state === 2 ?
                    <div className="action">
                        <button onClick={hit}>Hit</button>
                        <button onClick={stand}>Stand</button>
                    </div>
                    : null}

            </div>
        </div>
    )
};

export default Player;