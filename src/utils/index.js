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
    console.log(startIndex, endIndex);
    const data =items.slice(startIndex, endIndex);
    console.log(data);
    return data;
};
