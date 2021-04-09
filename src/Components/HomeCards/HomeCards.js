import './HomeCards.scss';
import HeadCard from '../HomeCard/HomeCard';

function HomeCards(props) {
    return (
        <div className="card-wrapper">
            <HeadCard
                imgElement={<i className="fas fa-mobile-alt fa-5x"></i>}
                content=" Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod doloribus harum dignissimos rem corrupti, ducimus in! Dolorem sequi non ad quae voluptates doloremque asperiores qui illum veniam! Reiciendis, repudiandae dolores!
        santium a. Repellat, dolor sapiente?"
            />
            <HeadCard
                imgElement={<i className="fas fa-headphones fa-5x"></i>}
                content="Quo illum necessitatibus totam quod aliquam iste, temporibus impedit quasi asperiores et repudiandae vitae cumque, magni error sed mollitia odio? Magnam temporibus eaque quos velit accusantium a. Repellat, dolor sapiente?
        Aita sequi unde ab repellat ea?"
            />
            <HeadCard
                imgElement={<i className="fas fa-shield-alt fa-5x"></i>}
                content="Exercitationem saepe quae laborum ratione doloremque sint animi ut eveniet error eaque possimus, amet neque quam nihil iste minima, iusto accusantium quas, repudiandae nostrum repellendus velit odio optio assumenda? Optio.
        olora assumenda officia delectus ipsum."
            />
        </div>
    );
}

export default HomeCards;
