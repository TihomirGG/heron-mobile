import { useEffect, useState } from 'react';
import { FirebaseContext } from '../../Firebase';
import { keyGenerator } from '../../Utils';
import './Filter.scss';

function Filter(props) {
    const { priceOnChangeHandler } = props;
    const fireBase = FirebaseContext;
    const [filters, setFilters] = useState(null);
    useEffect(() => {
        fireBase
            .getPhones()
            .then(x => {
                setFilters(x);
            })
            .catch(console.log);
    }, []);
    return (
        <div className="filter-wrapper">
            <div className="filter-wrapper__price">
            <label htmlFor="none">none</label>
                <input onChange={e => priceOnChangeHandler(e)} type="radio" id="none" name="filter" value="none" />
                <label htmlFor="asc">Ascending</label>
                <input onChange={e => priceOnChangeHandler(e)} type="radio" id="asc" name="filter" value="asc" />
                <label htmlFor="desc">Descending</label>
                <input onChange={e => priceOnChangeHandler(e)} type="radio" id="desc" name="filter" value="desc" />
            </div>
            <select className="filter-wrapper__dropdown">
                <option value="none">none</option>
                {filters
                    ? filters.map(x => {
                          return (
                              <option key={keyGenerator} value={x.phone}>
                                  {x.phone}
                              </option>
                          );
                      })
                    : null}
            </select>
        </div>
    );
}

export default Filter;
