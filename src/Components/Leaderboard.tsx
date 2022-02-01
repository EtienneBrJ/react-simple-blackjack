import '../Styles/Leaderboard.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrophy, faTimes } from '@fortawesome/free-solid-svg-icons'
import { useEffect, useState } from 'react'
import { doc, setDoc, collection, getDocs, getDoc } from "firebase/firestore";
import { db } from '../firebase-config'


interface Board {
    user: string;
    score: number;
    setUser: any;
}

const BoardButton: React.FC<Board> = ({ user, setUser, score }) => {


    const [isClicked, setIsClicked] = useState(false)

    const toggleBoard = () => {
        setIsClicked(!isClicked)
    }

    return <div className='leaderboardContainer'>
        <button className='leaderboardBtn' onClick={toggleBoard} >
            {isClicked ? <FontAwesomeIcon className='cross' icon={faTimes} /> : <FontAwesomeIcon className='trophy' icon={faTrophy} />}
        </button>
        {isClicked ? <Leaderboard user={user} setUser={setUser} score={score} /> : null}
    </div>

}


const Leaderboard: React.FC<Board> = ({ user, setUser, score }) => {


    const [leaderboard, setLeaderboard] = useState<{ user: string; score: number; }[]>([])
    const blackjackCollection = collection(db, "blackjack");


    useEffect(() => {
        const getLeaderboard = async () => {
            const data = await getDocs(blackjackCollection);
            setLeaderboard(data.docs.map((doc) => ({ user: doc.data().user, score: doc.data().score })))
        }
        getLeaderboard();

        const updateScore = async () => {
            const docRef = doc(blackjackCollection, user + '\'s score')
            const data = await getDoc(docRef)
            if (data.exists()) {
                if (data.data().score < score) {
                    // Ecrase l'ancien document pour update le score
                    setDoc(doc(db, "blackjack", user + '\'s score'), {
                        user: user,
                        score: score,
                        // date: 
                    });
                }
            }
        }
        updateScore();
    }, [blackjackCollection, leaderboard, user, score])





    const addUserDocument = async () => {
        if (user !== 'Player') {
            await setDoc(doc(db, "blackjack", user + '\'s score'), {
                user: user,
                score: score,
            });
        }
    }


    return <div className='leaderboardContent'>
        <div className='leaderboardDisplay'>
            <h1>Leaderboard</h1>
            <div className='leaderboard'>
                <div className='userColumn'>
                    <p className='title'>Username</p>
                    {leaderboard.map((line) => <p key={line.user}>{line.user}</p>)}
                </div>
                <div className='scoreColumn'>
                    <p className='title'>Bankroll</p>
                    {leaderboard.sort((a, b) => b.score - a.score).map((line) => <p key={line.user}>{line.score}</p>)}
                </div>
            </div>
            <div className='leaderboardRegister'>
                <p>Add your name on the board:</p>
                <input type="text" onChange={e => setUser(e.target.value)} />
                <button onClick={addUserDocument}>Register</button>
            </div>
        </div>
    </div>
}

export default BoardButton;
