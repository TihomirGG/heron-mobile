import { useParams } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import { FirebaseContext } from '../../Firebase';
import PageLayout from '../../Components/PageLayout';
import SuccessMessage from '../../Components/SuccessMessage';
import './Details.scss';

function Details(porps) {
    const fireBase = useContext(FirebaseContext);
    const { id } = useParams();
    const [itemInfo, setItemInfo] = useState(null);
    const [successMessage, setSuccessMessage] = useState(null);

    useEffect(() => {
        fireBase.getSpecificItem(id).then(x => setItemInfo(x));
    }, []);

    const onClickHandler = e => {
        if (e.target.disabled) return;
        const userId = fireBase.auth.currentUser.uid;
        const itemId = id;
        fireBase.addOrderItems(userId, itemId).then(x => {
            setSuccessMessage(x);
            setTimeout(() => {
                setSuccessMessage(null);
            }, 2000);
        });
    };

    return (
        <PageLayout>
            {itemInfo ? (
                <div>
                    {successMessage ? <SuccessMessage message={successMessage} /> : null}
                    <div className="detail-wrapper">
                        {console.log(itemInfo)}
                        <div className="detail-wrapper__img-container">
                            <img src={itemInfo.url} alt="" />
                        </div>
                        <div className="detail-wrapper__info-rows">
                            <h2 className="detail-wrapper__header">{itemInfo.title}</h2>
                            <p className="detail-wrapper__paragraph">Eligible: {itemInfo.model}</p>
                            <p className="detail-wrapper__paragraph">Color: {itemInfo.color}</p>
                            <p className="detail-wrapper__paragraph">
                                {Number(itemInfo.quantity) > 0 ? 'In Stock' : 'Еxhausted'}
                            </p>
                            <p className="detail-wrapper__paragraph">Material: {itemInfo.type}</p>
                            <p className="detail-wrapper__paragraph">Price: {Number(itemInfo.price).toFixed(2)}$</p>
                            <button
                                onClick={e => onClickHandler(e)}
                                className="detail-wrapper__btn"
                                disabled={Number(itemInfo.quantity) > 0 ? false : true}
                            >
                                Add to cart
                            </button>
                        </div>
                    </div>
                    <div className="description-wrapper">
                        <h2 className="description-wrapper__desc-title">Description</h2>
                        <p className="description-wrapper__description">{itemInfo.description}</p>
                    </div>
                </div>
            ) : (
                'loading'
            )}
        </PageLayout>
    );
}

export default Details;
