import './HomeCard.scss';

function HomeCard(props) {
    return (
        <div className="card">
            <div className="card__card-logo-wrapper">
                {props.imgElement}
            </div>
            <p className="card__info">
                {props.content}
            </p>
        </div>
    );
}

export default HomeCard;
