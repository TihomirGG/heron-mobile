import './PageLayout.scss';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
function PageLayout(props) {
    return (
        <div className="page-wrapper">
            <Header />
             {props.children}
            <Footer />
        </div>
    );
}

export default PageLayout;
