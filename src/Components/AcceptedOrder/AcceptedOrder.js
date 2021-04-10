import PageLayout from '../PageLayout/PageLayout';
import { Link } from 'react-router-dom';
import './AcceptedOrder.scss';

function AcceptedOrder(props) {



    return (
        <PageLayout>
            <p class="success-p">Order made Successfuly!!</p>
            <Link to='/shop' className="success-l">Shop</Link>
        </PageLayout>
    );
}

export default AcceptedOrder;
