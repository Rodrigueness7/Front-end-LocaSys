
export default function SortItem(data, field) {
    const sortedData = data.sort((a, b) => {
        const nameA = a[field].toUpperCase();
        const nameB = b[field].toUpperCase();   
        if (nameA < nameB) {
            return -1;
        }
        if (nameA > nameB) {
            return 1;
        }   
        return 0;
    });
    return sortedData;
    
}