import './Home.scss';
import Slideshow from '../../Components/Slideshow/Slideshow';
import PageLayout from '../../Components/PageLayout/PageLayout';
import HeadCards from '../../Components/HomeCards/HomeCards';

function Home(props) {
    return (
        
            <PageLayout>
                <Slideshow />
                <HeadCards />
            </PageLayout>
        
    );
}

export default Home;
