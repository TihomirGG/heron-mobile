import { useState, useEffect, useContext, memo } from 'react';
import { FirebaseContext } from '../../Firebase';
import './ShoppingCart.scss';

function ShoppingCart(props) {
    const fireBase = useContext(FirebaseContext);
    const [user, setUser] = useState(null);
    const [items, setItems] = useState(null);
    const [adress, setAdress] = useState(null);

    useEffect(async () => {
        if(items === null){
        const items = await fireBase.getItemsForCart();
        setItems(items);
        console.log(items);
        }

        const user = await fireBase.getCurrentUserInfo();
        setUser(user);
        setAdress(user.adress);
    }, []);

    const renderTable = () => {
        const temp = items.map((x, i) => {
            return (
                <tr key={i}>
                    <td scope="row">{i + 1}</td>
                    <td scope="row">{x.title}</td>
                    <td scope="row">{x.itemType}</td>
                    <td scope="row">
                        <i
                            id={x.id}
                            onClick={e => {
                                deleteItem(e);
                            }}
                            className="far fa-times-circle"
                        ></i>
                    </td>
                </tr>
            );
        });
        return temp;
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

    const deleteItem = e => {
        const id = e.target.id;
        fireBase.removeItemFromCart(id).then(x => {
            console.log(x);
            setItems(x);
        });
    };

    return (
        <div className="shopping-container">
            <div className="shopping-container__items">
                <table>
                    <thead>
                        <tr>
                            <th scope="column">Order</th>
                            <th scope="column">Title</th>
                            <th scope="column">Item type</th>
                            <th scope="column">Remove</th>
                        </tr>
                    </thead>
                    <tbody>{items ? renderTable() : null}</tbody>
                </table>
            </div>
            <div className="shopping-container__adress">
                <form action="">
                    <label htmlFor="town">City</label>
                    <input type="text" id="town" onChange={e => onChangeHandler(e)} name="city" required />
                    <label htmlFor="street" required>
                        Street
                    </label>
                    <input type="text" id="street" onChange={e => onChangeHandler(e)} name="street" />
                    <label htmlFor="building">Apartament building</label>
                    <input type="text" id="building" onChange={e => onChangeHandler(e)} name="building" />
                    <label htmlFor="floor">Floor</label>
                    <input type="text" id="floor" onChange={e => onChangeHandler(e)} name="floor" />
                    <label htmlFor="entrance">Entrance</label>
                    <input type="text" id="entrance" onChange={e => onChangeHandler(e)} name="entrance" />
                    <label htmlFor="adress">Remeber Adress:</label>
                    <input type="checkbox" id="adress" name="save" />
                    <button>Buy!</button>
                </form>
            </div>
        </div>
    );
}

export default ShoppingCart;
