import { Link } from 'react-router-dom';
import './Product.scss';

function Product(props) {
    const { route, imgUrl, price } = props;

    return (
        <Link className="product-wrapper" to={route}>
            <div className="product-wrapper__img-container">
                <img src={imgUrl} alt="product" />
            </div>
            <p className="product-wrapper__text">{Number(price).toFixed(2)}$</p>
        </Link>
    );
}

export default Product;
