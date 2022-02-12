import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrophy, faTimes } from '@fortawesome/free-solid-svg-icons'
import { useEffect, useState, useRef } from 'react'
import { doc, setDoc, collection, getDoc, getDocs } from "firebase/firestore";
import { db } from '../firebase-config'
import { useAppDispatch, useAppSelector } from '../store/hook';
import { setLeaderboard } from '../store/features/leaderboard';
import classes from './Leaderboard.module.scss'

const blackjackCollection = collection(db, "blackjack");

const BoardButton: React.FC = () => {

    const dispatch = useAppDispatch()
    const [user, setUser] = useState<string>();
    const [isClicked, setIsClicked] = useState(false)
    const score = useAppSelector((state) => state.bankroll.value)

    useEffect(() => {
        const checkAndUpdateUser = async () => {
            const docRef = doc(db, 'blackjack', user + '\'s score')
            const docData = await getDoc(docRef)
            if ((docData.data()?.user !== user) || (docData.data()?.user === user && docData.data()?.score < score)) {
                setDoc(docRef, { user, score })
            }
        }
        checkAndUpdateUser()
    }, [score, user])

    useEffect(() => {
        const getLeaderboard = async () => {
            const data = await getDocs(blackjackCollection);
            dispatch(setLeaderboard(data.docs.map((doc) => ({ user: doc.data().user, score: doc.data().score }))))
        }
        getLeaderboard()
    }, [score, user, setUser, dispatch])

    return <div className={classes.leaderboard}>
        <button className={classes.leaderboard__btn} onClick={() => setIsClicked(!isClicked)} >
            {isClicked ? <FontAwesomeIcon className={classes.leaderboard__btn__cross} icon={faTimes} /> : <FontAwesomeIcon className='trophy' icon={faTrophy} />}
        </button>
        {isClicked ? <Leaderboard setUser={setUser} /> : null}
    </div>
}

const Leaderboard: React.FC<any> = ({ setUser }) => {

    const leaderboard = useAppSelector((state) => state.leaderboard.value)
    const inputValue = useRef<HTMLInputElement>(null)

    return (
        <div className={classes.leaderboard__display}>
            <h1 className={classes.leaderboard__display__title}>Leaderboard</h1>
            <div className={classes.leaderboard__display__info}>
                <div>
                    <h4>Rank</h4>
                    {leaderboard
                        ? leaderboard.map((line, idx) => <p key={line.user}>{idx + 1}</p>)
                        : null}
                </div>
                <div>
                    <h4>Name</h4>
                    {leaderboard
                        ? leaderboard.map((line) => <p key={line.user}>{line.user}</p>)
                        : null}
                </div>
                <div>
                    <h4>Score</h4>
                    {leaderboard
                        ? leaderboard.map((line) => <p key={line.user}>{line.score}</p>)
                        : null}
                </div>
            </div>
            <div className={classes.leaderboard__display__register}>
                <p className={classes.leaderboard__display__register__title}>Add your name on the board:</p>
                <div className={classes.leaderboard__display__register__form}>
                    <input ref={inputValue} type="text" />
                    <button onClick={() => inputValue.current?.value.trim() ? setUser(inputValue.current?.value) : null}>Register</button>
                </div>
            </div>
        </div>
    )
}

export default BoardButton;