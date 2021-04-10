import { useState, useEffect, useContext, useRef } from 'react';
import { useHistory } from 'react-router';
import { FirebaseContext } from '../../Firebase';
import './ShoppingCart.scss';

function ShoppingCart(props) {
    const fireBase = useContext(FirebaseContext);
    const [user, setUser] = useState(null);
    const [items, setItems] = useState(undefined);
    const [adress, setAdress] = useState(null);
    const history = useHistory();
    const ref = useRef(null);

    useEffect(async () => {
        const items = await fireBase.getItemsForCart();
        setItems(items);
        console.log(items);

        const user = await fireBase.getCurrentUserInfo();
        setUser(user);
        setAdress(user.adress);
    }, []);

    const renderTable = () => {
        const arr = items;
        if (items.length || items.length !== 1) {
            const temp = arr.map((x, i) => {
                return (
                    <tr key={i}>
                        <td className="number" scope="row">
                            {i + 1}
                        </td>
                        <td className="img-td">
                            <div className="td-wrapper">
                                <img src={x.url} alt="" />
                            </div>
                        </td>
                        <td className="name" scope="row">
                            {x.title}
                        </td>
                        <td className="item-type" scope="row">
                            {x.itemType}
                        </td>
                        <td scope="row">{Number(x.price).toFixed(2)}$</td>
                        <td scope="row">
                            <div className="cross">
                                <i
                                    id={x.id}
                                    onClick={e => {
                                        deleteItem(e);
                                    }}
                                    className="far fa-times-circle"
                                ></i>
                            </div>
                        </td>
                    </tr>
                );
            });
            return temp;
        }
    };

    const onChangeHandler = e => {
        if (adress === '') {
            console.log(e.target.name);
            console.log(e.target.value);
            const obj = { [e.target.name]: e.target.value };
            setAdress(obj);
            return;
        }

        const obj = { ...adress, [e.target.name]: e.target.value };
        console.log(obj);
        setAdress(obj);
    };

    const deleteItem = async e => {
        const id = e.target.id;
        const temp = await fireBase.removeItemFromCart(id);
        console.log(temp);
        setItems([...temp]);
    };

    const validateForm = () => {
        if (!adress) {
            console.log('false');
            return false;
        }
        console.log(!!(adress.street && adress.phone && adress.city));
        return adress.street && adress.phone && adress.city && items;
    };

    const totalPrice = () => {
        const arr = items;
        if (items || items.length) {
            const price = items.reduce((acc, curr) => {
                return acc + Number(curr.price);
            }, 0);

            return price.toFixed(2);
        }
    };

    const onClick = e => {
        e.preventDefault();
        if (ref.current.checked) {
            fireBase.updateUserAdress(adress);
        }

        fireBase.buy();
        history.push('/order');
    };

    return (
        <div className="shopping-container">
            <div className="final-wrapper">
                <table className="final-wrapper-table">
                    <thead>
                        <tr>
                            <th scope="column">Order</th>
                            <th scope="column">Image</th>
                            <th scope="column">Title</th>
                            <th scope="column">Item type</th>
                            <th scope="column">Price</th>
                            <th scope="column">Remove</th>
                        </tr>
                    </thead>
                    <tbody>{items ? renderTable() : null}</tbody>
                    <tfoot>
                        <tr>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td className="right-side">Total:</td>
                            <td className="left-side">{items ? totalPrice() : '0.00'}$</td>
                        </tr>
                    </tfoot>
                </table>
                <div className="final-wrapper__adress">
                    <form className="final-wrapper__form" action="">
                        <h2 className="final-wrapper__header">Adress</h2>
                        <label className="final-wrapper__label" htmlFor="town">
                            City
                        </label>
                        <input
                            className="final-wrapper__input"
                            type="text"
                            id="town"
                            onChange={e => onChangeHandler(e)}
                            name="city"
                            required
                            value={adress ? adress.city : ''}
                        />
                        <label className="final-wrapper__label" htmlFor="street" required>
                            Street
                        </label>
                        <input
                            className="final-wrapper__input"
                            type="text"
                            id="street"
                            onChange={e => onChangeHandler(e)}
                            name="street"
                            value={adress ? adress.street : ''}
                        />
                        <label className="final-wrapper__label" htmlFor="building">
                            Apartament building
                        </label>
                        <input
                            className="final-wrapper__input"
                            type="text"
                            id="building"
                            onChange={e => onChangeHandler(e)}
                            name="building"
                            value={adress ? adress.building : ''}
                        />
                        <label className="final-wrapper__label" htmlFor="floor">
                            Floor
                        </label>
                        <input
                            className="final-wrapper__input"
                            type="text"
                            id="floor"
                            onChange={e => onChangeHandler(e)}
                            name="floor"
                            value={adress ? adress.floor : ''}
                        />
                        <label className="final-wrapper__label" htmlFor="entrance">
                            Entrance
                        </label>
                        <input
                            className="final-wrapper__input"
                            type="text"
                            id="entrance"
                            onChange={e => onChangeHandler(e)}
                            name="entrance"
                            value={adress ? adress.entrance : ''}
                        />
                        <label className="final-wrapper__label" htmlFor="phone">
                            Phone
                        </label>
                        <input
                            className="final-wrapper__input"
                            type="text"
                            id="phone"
                            onChange={e => onChangeHandler(e)}
                            name="phone"
                            value={adress ? adress.phone : ''}
                        />
                        <div className="adress-div">
                            <label className="adress-label" htmlFor="adress">
                                Remeber Adress
                            </label>
                            <input ref={ref} className="adress-input" type="checkbox" id="adress" name="save" />
                        </div>
                        <button onClick={e => onClick(e)} disabled={validateForm() ? false : true} className="buy-btn">
                            Buy!
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default ShoppingCart;
