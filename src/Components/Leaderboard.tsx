import '../Styles/Leaderboard.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrophy, faTimes } from '@fortawesome/free-solid-svg-icons'
import { useState } from 'react'


const BoardButton: React.FC = () => {

    const [isClicked, setIsClicked] = useState(false)

    const toggleBoard = () => {
        setIsClicked(!isClicked)
    }

    return <div className='leaderboardContainer'>
        <button className='leaderboardBtn' onClick={toggleBoard} >
            {isClicked ? <FontAwesomeIcon className='cross' icon={faTimes} /> : <FontAwesomeIcon className='trophy' icon={faTrophy} />}
        </button>
        {isClicked ? <Leaderboard /> : null}
    </div>

}

const Leaderboard: React.FC = () => {

    return <div className='leaderboardContent'>
        <div className='leaderboardDisplay'>
            <p>Leaderboard</p>
            <table>to do Firebase?</table>
        </div>
    </div>
}


export default BoardButton;
