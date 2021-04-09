import './PageLayout.scss';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
function PageLayout(props) {
    return (
        <div className="page-wrapper">
            <Header />
            <div className="page-wrapper__content">{props.children}</div>
            <Footer />
        </div>
    );
}

export default PageLayout;
