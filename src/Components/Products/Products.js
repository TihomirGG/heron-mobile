import { useEffect, useContext, useState, Fragment } from 'react';
import { useLocation } from 'react-router';
import ROUTES from '../../Constants/Routes';
import { FirebaseContext } from '../../Firebase';
import Product from '../Product';
import { keyGenerator, paginate } from '../../Utils/index';
import './Products.scss';
import Pagination from '../Pagination';

function Products(props) {
    const fireBase = useContext(FirebaseContext);
    const [items, setItems] = useState(null);
    const [currPage, setCurrentPage] = useState(1);
    const [paginationData, setPaginationData] = useState(null);
    const { pathname } = useLocation();
    const pageSize = 20;

    let productType = pathname.substring(6);
    productType = productType.substring(0, productType.lastIndexOf('s'));

    useEffect(() => {
        fireBase
            .getProducts(productType)
            .then(data => {
                setItems(data);
                const pageData = paginate(data, currPage, pageSize);
                setPaginationData(pageData);
            })
            .catch(console.log);
    }, []);

    useEffect(() => {
        if (items) {
            const pageData = getPageData(items, currPage, pageSize);
            setPaginationData(pageData);
        }
    }, [currPage]);

    const handlePageChange = page => {
        setCurrentPage(page);
    };

    const getPageData = () => {
        const paginationData = paginate(items, currPage, pageSize);

        return paginationData;
    };

    return (
        <Fragment>
            <div className="products-container">
                {items ? null : <p>Loading</p>}
                {items && paginationData
                    ? paginationData.map(x => {
                          return (
                              <Product
                                  key={keyGenerator()}
                                  route={`${ROUTES.DETAILS}${x.id}`}
                                  price={x.price}
                                  imgUrl={x.url}
                              />
                          );
                      })
                    : null}
            </div>
            {items ? (
                <div className="pagination-container">
                    <Pagination
                        className="pagination-container__paginator"
                        itemsCount={items.length}
                        pageSize={pageSize}
                        currentPage={currPage}
                        onPageChange={handlePageChange}
                    />
                    <p className="pagination-container__page-info">{`Page ${currPage} of ${Math.ceil(
                        items.length / pageSize
                    )}`}</p>
                </div>
            ) : null}
        </Fragment>
    );
}

export default Products;
