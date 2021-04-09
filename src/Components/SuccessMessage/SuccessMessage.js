import './SuccessMessage.scss';

function SuccessMessage(props) {
    const { message } = props;
    return <div className="success-msg">{message}</div>;
}

export default SuccessMessage;
