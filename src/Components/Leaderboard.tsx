import '../Styles/Leaderboard.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrophy, faTimes } from '@fortawesome/free-solid-svg-icons'
import { useEffect, useState, useRef } from 'react'
import { doc, setDoc, collection, getDoc, getDocs } from "firebase/firestore";
import { db } from '../firebase-config'


const blackjackCollection = collection(db, "blackjack");

interface Board {
    user: string | undefined;
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
    const inputValue = useRef<HTMLInputElement>(null)

    useEffect(() => {
        const checkUser = async () => {
            const docRef = doc(db, 'blackjack', user + '\'s score')
            const docData = await getDoc(docRef)
            if ((docData.data()?.user !== user) || (docData.data()?.user === user && docData.data()?.score < score)) {
                setDoc(docRef, { user, score })
            }
        }
        checkUser()
    }, [score, user])

    useEffect(() => {
        const getLeaderboard = async () => {
            const data = await getDocs(blackjackCollection);
            setLeaderboard(data.docs.map((doc) => ({ user: doc.data().user, score: doc.data().score })))
        }
        getLeaderboard()
    }, [score, user])

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
                <input ref={inputValue} type="text" />
                <button onClick={() => setUser(inputValue.current?.value)}>Register</button>
            </div>
        </div>
    </div>
}

export default BoardButton;