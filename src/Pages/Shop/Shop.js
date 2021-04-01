import { Component } from 'react';
import PageLayout from '../../Components/PageLayout';
import { Link } from 'react-router-dom';
import Routes from '../../Constants/Routes';
import './Shop.scss';

class Shop extends Component {
    render() {
        return (
            <PageLayout>
                <div className="shop-wrapper">
                    <h1 className="shop-wrapper__header">What do you want?</h1>
                    <div className="shop-wrapper__shop-cards-wrapper">
                        <Link className="shop-wrapper__card-link" to={Routes.CASES} style={{ textDecoration: 'none' }}>
                            <div className="shop-wrapper__shop-card">
                                <div className="shop-wrapper__shop-img-container">
                                    <img src={`${process.env.PUBLIC_URL}/shop-images/caseCardPhoto.jpg`} alt="" />
                                </div>
                                <div className="shop-wrapper__shop-content">
                                    <h2 className="shop-wrapper__subheader">Cases</h2>
                                    <p className="shop-wrapper__text">
                                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam, impedit quia.
                                        Id, error architecto reprehenderit tenetur rem explicabo recusandae odit alias
                                        at odio mollitia ab animi molestiae est. Debitis, officiis! Sit minus, nostrum
                                        qui nesciunt doloremque numquam architecto? Tempora reprehenderit optio impedit
                                        asperiores debitis fugiat accusamus, quam vel nobis, autem saepe delectus ullam
                                        officiis sequi at aliquid aperiam tenetur eius? Officiis, vitae suscipit odit
                                        laudantium consequatur quae. Fuga quis dolorum magni dolor veritatis iure animi,
                                        nisi quisquam explicabo dolorem maxime unde odit eveniet officiis corrupti, nam
                                        nesciunt ullam iste laudantium. Similique quasi enim sint assumenda fugiat
                                        inventore cum laudantium saepe placeat explicabo, quaerat dolorum quae pariatur
                                        eum hic. Nemo eligendi sint, animi at architecto voluptates vel hic optio
                                        doloribus. Sequi. Facere cum possimus voluptates consequatur ea cumque.
                                        Laboriosam sint esse libero maxime quibusdam aperiam distinctio eaque a, porro
                                        soluta dolorem animi repellat praesentium accusamus expedita aliquam autem
                                        temporibus deleniti reprehenderit.
                                    </p>
                                </div>
                            </div>
                        </Link>
                        <Link className="shop-wrapper__card-link" to={Routes.CABLES} style={{ textDecoration: 'none' }}>
                            <div className="shop-wrapper__shop-card">
                                <div className="shop-wrapper__shop-img-container">
                                    <img src={`${process.env.PUBLIC_URL}/shop-images/cableCardPhoto.jpg`} alt="" />
                                </div>
                                <div className="shop-wrapper__shop-content">
                                    <h2 className="shop-wrapper__subheader">Cable</h2>
                                    <p className="shop-wrapper__text">
                                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam, impedit quia.
                                        Id, error architecto reprehenderit tenetur rem explicabo recusandae odit alias
                                        at odio mollitia ab animi molestiae est. Debitis, officiis! Sit minus, nostrum
                                        qui nesciunt doloremque numquam architecto? Tempora reprehenderit optio impedit
                                        asperiores debitis fugiat accusamus, quam vel nobis, autem saepe delectus ullam
                                        officiis sequi at aliquid aperiam tenetur eius? Officiis, vitae suscipit odit
                                        laudantium consequatur quae. Fuga quis dolorum magni dolor veritatis iure animi,
                                        nisi quisquam explicabo dolorem maxime unde odit eveniet officiis corrupti, nam
                                        nesciunt ullam iste laudantium. Similique quasi enim sint assumenda fugiat
                                        inventore cum laudantium saepe placeat explicabo, quaerat dolorum quae pariatur
                                        eum hic. Nemo eligendi sint, animi at architecto voluptates vel hic optio
                                        doloribus. Sequi. Facere cum possimus voluptates consequatur ea cumque.
                                        Laboriosam sint esse libero maxime quibusdam aperiam distinctio eaque a, porro
                                        soluta dolorem animi repellat praesentium accusamus expedita aliquam autem
                                        temporibus deleniti reprehenderit.
                                    </p>
                                </div>
                            </div>
                        </Link>
                        <Link className="shop-wrapper__card-link" to={Routes.PROTECTORS} style={{ textDecoration: 'none' }}>
                            <div className="shop-wrapper__shop-card">
                                <div className="shop-wrapper__shop-img-container">
                                    <img src={`${process.env.PUBLIC_URL}/shop-images/protectorCardPhoto.jpg`} alt="" />
                                </div>
                                <div className="shop-wrapper__shop-content">
                                    <h2 className="shop-wrapper__subheader">Protectors</h2>
                                    <p className="shop-wrapper__text">
                                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam, impedit quia.
                                        Id, error architecto reprehenderit tenetur rem explicabo recusandae odit alias
                                        at odio mollitia ab animi molestiae est. Debitis, officiis! Sit minus, nostrum
                                        qui nesciunt doloremque numquam architecto? Tempora reprehenderit optio impedit
                                        asperiores debitis fugiat accusamus, quam vel nobis, autem saepe delectus ullam
                                        officiis sequi at aliquid aperiam tenetur eius? Officiis, vitae suscipit odit
                                        laudantium consequatur quae. Fuga quis dolorum magni dolor veritatis iure animi,
                                        nisi quisquam explicabo dolorem maxime unde odit eveniet officiis corrupti, nam
                                        nesciunt ullam iste laudantium. Similique quasi enim sint assumenda fugiat
                                        inventore cum laudantium saepe placeat explicabo, quaerat dolorum quae pariatur
                                        eum hic. Nemo eligendi sint, animi at architecto voluptates vel hic optio
                                        doloribus. Sequi. Facere cum possimus voluptates consequatur ea cumque.
                                        Laboriosam sint esse libero maxime quibusdam aperiam distinctio eaque a, porro
                                        soluta dolorem animi repellat praesentium accusamus expedita aliquam autem
                                        temporibus deleniti reprehenderit.
                                    </p>
                                </div>
                            </div>
                        </Link>
                    </div>
                </div>
            </PageLayout>
        );
    }
}

export default Shop;
