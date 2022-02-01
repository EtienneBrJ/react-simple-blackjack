import '../Styles/Leaderboard.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrophy, faTimes } from '@fortawesome/free-solid-svg-icons'
import { useEffect, useState } from 'react'
import { doc, setDoc, collection, getDocs, getDoc } from "firebase/firestore";
import { db } from '../firebase-config'


const blackjackCollection = collection(db, "blackjack");

interface Board {
    user: string;
    score: number;
    setUser: any;
    leaderboard?: { user: string; score: number; }[];
    setLeaderboard?: any;
}

const BoardButton: React.FC<Board> = ({ user, setUser, score }) => {


    const [isClicked, setIsClicked] = useState(false)
    const [leaderboard, setLeaderboard] = useState<{ user: string; score: number; }[]>([{ user: "False Data", score: 100 }, { user: "2 much req", score: 212 }, { user: "on the db", score: 121 }])

    const toggleBoard = () => {
        setIsClicked(!isClicked)
    }

    useEffect(() => {

        if (isClicked) {
            console.log('Entrée useEffect isClicked est true -')
            const getLeaderboard = async () => {
                const data = await getDocs(blackjackCollection);
                setLeaderboard(data.docs.map((doc) => ({ user: doc.data().user, score: doc.data().score })))
                console.log(leaderboard)
            }
        }

        /* tester le score avant de faire la requete avec le leaderboard qu'on a deja, c la condition d'update
        
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
        updateScore();*/

    }, [isClicked, leaderboard])

    return <div className='leaderboardContainer'>
        <button className='leaderboardBtn' onClick={toggleBoard} >
            {isClicked ? <FontAwesomeIcon className='cross' icon={faTimes} /> : <FontAwesomeIcon className='trophy' icon={faTrophy} />}
        </button>
        {isClicked ? <Leaderboard user={user} setUser={setUser} score={score}
            setLeaderboard={setLeaderboard} leaderboard={leaderboard} /> : null}
    </div>

}


const Leaderboard: React.FC<Board> = ({ user, setUser, score, leaderboard }) => {

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
                <div className='rankColumn'>
                    <p className='title'>Rank</p>
                    {leaderboard
                        ? leaderboard.sort((a, b) => b.score - a.score).map((line, idx) => <p key={line.user}>{idx + 1}</p>)
                        : null}

                </div>
                <div className='userColumn'>
                    <p className='title'>Name</p>
                    {leaderboard
                        ? leaderboard.sort((a, b) => b.score - a.score).map((line) => <p key={line.user}>{line.user}</p>)
                        : null}
                </div>
                <div className='scoreColumn'>
                    <p className='title'>Score</p>
                    {leaderboard
                        ? leaderboard.sort((a, b) => b.score - a.score).map((line) => <p key={line.user}>{line.score}</p>)
                        : null}
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
