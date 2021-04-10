import { useContext, useEffect, useState } from 'react';
import { FirebaseContext } from '../../Firebase';
import './Orders.scss';

function Orders(props) {
    const fireBase = useContext(FirebaseContext);
    const [ordersCount, setOrdersCount] = useState(null);

    useEffect(() => {
        fireBase.getCurrentUserInfo().then(x => {
            setOrdersCount(x.orders);
        });
    }, []);
    return (
        <div className="order-wrapper">
            <p>Orders Count: {ordersCount}</p>
        </div>
    );
}

export default Orders;
