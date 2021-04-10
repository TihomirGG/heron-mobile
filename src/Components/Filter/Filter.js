import { useEffect, useState, useContext } from 'react';
import { useLocation } from 'react-router';
import { FirebaseContext } from '../../Firebase';
import { takeItemTypeFromRoute } from '../../Utils';
import './Filter.scss';

function Filter(props) {
    const { priceOnChangeHandler, modelOnChangeHanler } = props;
    const fireBase = useContext(FirebaseContext);
    const [filters, setFilters] = useState(null);
    const { pathname } = useLocation();
    useEffect(() => {
        const item = takeItemTypeFromRoute(pathname.substring(6));
        if (item === 'case') {
            fireBase
                .getPhones()
                .then(x => {
                    setFilters(x);
                })
                .catch(console.log);
        } else if (item === 'cable') {
            fireBase
                .getCables()
                .then(x => {
                    setFilters(x);
                })
                .catch(console.log);
        } else {
            fireBase
                .getProtectors()
                .then(x => {
                    setFilters(x);
                })
                .catch(console.log);
        }
    }, []);
    return (
        <div className="filter-wrapper">
            <div className="filter-wrapper__price">
                <h2 className="filter-wrapper__header">Price Filter</h2>
                <label className="filter-wrapper__label" htmlFor="none">
                    None:
                </label>
                <input
                    className="filter-wrapper__input"
                    onChange={e => priceOnChangeHandler(e)}
                    type="radio"
                    id="none"
                    name="filter"
                    value="none"
                />
                <label className="filter-wrapper__label" htmlFor="asc">
                    Ascending:
                </label>
                <input
                    className="filter-wrapper__input"
                    onChange={e => priceOnChangeHandler(e)}
                    type="radio"
                    id="asc"
                    name="filter"
                    value="asc"
                />
                <label className="filter-wrapper__label" htmlFor="desc">
                    Descending:
                </label>
                <input
                    className="filter-wrapper__input"
                    onChange={e => priceOnChangeHandler(e)}
                    type="radio"
                    id="desc"
                    name="filter"
                    value="desc"
                />
            </div>
            <div className="filter-wrapper__model">
                <h2 className="filter-wrapper__header">Model Filter</h2>
                <select onChange={e => modelOnChangeHanler(e)} className="filter-wrapper__dropdown">
                    <option value="none">none</option>
                    {filters
                        ? filters.map((x, i) => {
                              return (
                                  <option key={i} value={x.type}>
                                      {x.phone}
                                  </option>
                              );
                          })
                        : null}
                </select>
            </div>
        </div>
    );
}

export default Filter;
