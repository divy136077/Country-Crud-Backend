
export const SortOrder = ["asc", "desc"]


const FILTER_SCHEMA: any = [
    { queryName: "Name", mongocolumn: "Name" },
    { queryName: "Status", mongocolumn: "Status" },
];
const extra = ["sortDir", "sortColumn", "pageSize", "pageNumber"]


export const handleSearchValues = (unFilteredData: any) => {
    let filteredData = {};
    Object.keys(unFilteredData).forEach((unFilteredKey) => {
        if (!extra.includes(unFilteredKey)) {
            const obj = FILTER_SCHEMA.find((a: any) => a.queryName == unFilteredKey);
            filteredData = {
                ...filteredData,
                [obj.mongocolumn]: unFilteredData[unFilteredKey],
            };
            
            
        }
    });
    return filteredData;
};

















