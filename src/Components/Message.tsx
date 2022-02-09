import classes from './Message.module.scss'

interface MessageInterface {
    message: string;
}


const Message: React.FC<MessageInterface> = ({ message }) => {
    return (<div className={classes.message}>
    <p className={classes.message__value}>{message}</p>
    </div>)
}

export default Message;