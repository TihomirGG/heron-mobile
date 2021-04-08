import { useEffect, useContext, useState, Fragment } from 'react';
import { useLocation } from 'react-router';
import ROUTES from '../../Constants/Routes';
import { FirebaseContext } from '../../Firebase';
import Product from '../Product';
import { keyGenerator, paginate, takeItemTypeFromRoute } from '../../Utils/index';
import Pagination from '../Pagination';
import Filter from '../Filter';
import './Products.scss';

function Products(props) {
    const fireBase = useContext(FirebaseContext);
    const [items, setItems] = useState(null);
    const [currPage, setCurrentPage] = useState(1);
    const [paginationData, setPaginationData] = useState(null);
    const [priceState, setPriceState] = useState('none');
    const [modelState, setModelState] = useState('none');
    const { pathname } = useLocation();
    const pageSize = 20;
    const productType = takeItemTypeFromRoute(pathname);

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

    useEffect(() => {
        fireBase.filterItems(productType, priceState, modelState).then(data => {
            setItems(data);
            const pageData = paginate(data, currPage, pageSize);
            setPaginationData(pageData);
        }).catch(console.log);
    }, [priceState, modelState]);

    const handlePageChange = page => {
        setCurrentPage(page);
    };

    const getPageData = () => {
        const paginationData = paginate(items, currPage, pageSize);

        return paginationData;
    };

    const modelOnChangeHanler = e => {
        const model = e.target.value;
        setModelState(model);
    }

    const priceOnChangeHandler = e => {
        if(!e.target.checked)return;
        const type = e.target.value;
        setPriceState(type);
    };

    return (
        <Fragment>
            <Filter priceOnChangeHandler={priceOnChangeHandler} modelOnChangeHanler={modelOnChangeHanler} priceState={priceState} type={productType} />
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
