import Options from '../../Components/Options/Options';
import PageLayout from '../../Components/PageLayout';
import Products from '../../Components/Products';
import Filter from '../../Components/Filter';
import { useLocation } from 'react-router-dom';
import './Listing.scss';

function Listing(props) {
    return (
        <PageLayout>
            <Options />
            <Products />
        </PageLayout>
    );
}

export default Listing;
