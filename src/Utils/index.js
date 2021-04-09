export const keyGenerator = () => {
    let dt = new Date().getTime();
    let uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        let r = (dt + Math.random() * 16) % 16 | 0;
        dt = Math.floor(dt / 16);
        return (c === 'x' ? r : (r & 0x3) | 0x8).toString(16);
    });
    return uuid;
};

export const paginate = (items, pageNumber, pageSize) => {
    const startIndex = +(pageNumber - 1) * +pageSize;
    const endIndex = +startIndex + +pageSize;
    const data = items.slice(startIndex, endIndex);
    return data;
};

export const takeItemTypeFromRoute = pathName => {
    let productType = pathName.substring(6);
    productType = productType.substring(0, productType.lastIndexOf('s'));
    return productType;
};

export const filterOnPrice = (items, type) => {
    switch (type) {
        case 'desc':
            return items.sort((a, b) => {
                return Number(b.price) - Number(a.price);
            });
        case 'asc':
            return items.sort((a, b) => {
                return Number(a.price) - Number(b.price);
            });
            default: 
            return items;
    }
};
