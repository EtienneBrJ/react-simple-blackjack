import classes from './Message.module.scss'
import { useAppSelector } from '../store/hook'

const Message: React.FC = () => {

    const _message = useAppSelector((state) => state.message.value)

    return (<div className={classes.message}>
        <p className={classes.message__value}>{_message}</p>
    </div>)
}

export default Message;