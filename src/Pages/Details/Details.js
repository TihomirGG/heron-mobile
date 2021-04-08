import { useParams } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import './Details.scss';
import { FirebaseContext } from '../../Firebase';
import PageLayout from '../../Components/PageLayout';

function Details(porps) {
    const fireBase = useContext(FirebaseContext);
    const { id } = useParams();
    const [itemInfo, setItemInfo] = useState(null);

    useEffect(() => {
        fireBase.getSpecificItem(id).then(x => setItemInfo(x));
    }, []);

    return (
        <PageLayout>
            {itemInfo ? (
                <div>
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
                            <button className="detail-wrapper__btn">Add to cart</button>
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
