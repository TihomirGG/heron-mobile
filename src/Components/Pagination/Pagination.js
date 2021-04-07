import './Pagination.scss';

function Pagination(props) {
    const { itemsCount, pageSize, currentPage, onPageChange } = props;
    const pageCount = Math.ceil(itemsCount / pageSize);
    if (pageCount === 1) return null;
    const pages = [];
    for (let i = 1; i < pageCount + 1; i++) {
        pages.push(i);
    }

    return (
        <div className="pagination">
            {pages.map((x, i) => {
               return (<div
                    href={null}
                    onClick={() => onPageChange(x)}
                    key={i}
                    className={x === currentPage ? 'pagination__active' : 'pagination__page-item'}
                >
                    {x}
                </div>);
            })}
        </div>
    );
}

export default Pagination;
