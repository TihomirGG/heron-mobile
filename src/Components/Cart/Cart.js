import { useEffect, useContext, useState } from 'react';
import { FirebaseContext } from '../../Firebase';
import './Cart.scss';

function Cart(props) {
    const fireBase = useContext(FirebaseContext);
    const [count, setCount] = useState(null);
    useEffect(() => {
        const sub = fireBase.cartSub().onSnapshot(
            snapShot => {
                if (snapShot.size > 0) {
                    const size = snapShot.size;
                    setCount(size);
                }else if(snapShot.empty) {
                    setCount(null);
                }
                
            },
            err => {
                console.log(err);
            }
        );

        return () => {
            sub();
        };
    }, []);

    return (
        <div className="cart-container">
            {count ? <div className="cart-container__circle">{count}</div> : null}
            <i className="fas fa-shopping-cart"></i>
        </div>
    );
}

export default Cart;
