// DataTable.tsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Chart from "./Chart";
import Pagination from "./Pagination";

interface DataRow {
    id: number;
    title: string;
    brand: string;
    price: number;
    rating: number;
}

const DataTable: React.FC = () => {
    const [data, setData] = useState<DataRow[]>([]);
    const [selectedRows, setSelectedRows] = useState<DataRow[]>([]);
    const [searchTerm, setSearchTerm] = useState<string>("");
    const [currentPage, setCurrentPage] = useState<number>(1);
    const itemsPerPage = 10; // Set the number of items per page
    const [totalItemCount, setTotalItemCount] = useState(0)
    const [loading, setLoading] = useState(false);

    const history = useNavigate();

    useEffect(() => {
        fetchData();
    }, [searchTerm, currentPage]);

    const fetchData = async () => {
        try {
            // Fetch data from backend API
            setLoading(true)
            const response = await fetch(`https://dummyjson.com/products/search?q=${searchTerm}&skip=${(currentPage - 1) * itemsPerPage}&limit=${itemsPerPage}`);
            const apidData = await response.json();

            const initialSelectedRows = apidData.products.slice(0, 5).map((row: any) => ({
                ...row,
                checked: true,
            }));

            setData(apidData.products);
            setSelectedRows(initialSelectedRows);
            setTotalItemCount(apidData.total)
            setLoading(false)
        } catch (error) {
            setLoading(false)
            window.alert("SOMETHING WENT WRONG")
            console.error("Error fetching data:", error);
        }
    };


    const handleCheckboxChange = (row: DataRow) => {
        const updatedRows = [...selectedRows];
        const index = updatedRows.findIndex((r) => r.id === row.id);

        if (index === -1) {
            updatedRows.push(row);
        } else {
            updatedRows.splice(index, 1);
        }

        setSelectedRows(updatedRows);
    };

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);

        // if (event.target.value.trim().length > 3) {
        // }
    };

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    return (
        <div className="flex">

            <div>
                <div className="flex justify-content-between mt-4 mb-4 ml-6">
                    <label className="block text-gray-700 text-2xl  ">Search:</label>
                    <input type="text" placeholder="Search..." className="border border-gray-300 rounded-md px-3 py-2  w-half" onChange={handleSearchChange} />
                    {/* <select
                        // value={selectedOption}
                        // onChange={handleSelectChange}
                        className="block ml-6 appearance-none w-half bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:ring focus:border-blue-300"
                    >
                        <option value="">Select an option</option>
                        <option value="option1">Option 1</option>
                        <option value="option2">Option 2</option>
                        <option value="option3">Option 3</option>
                    </select> */}

                </div>

                <div className="table-fixed  min-w-half  mt-4">

                    <table className="ml-6 table-fixed  w-half">
                        {/* Table headers */}
                        <thead>
                            <tr className="mt-6 ">
                                <th className="px-2 py-2 bg-gray-200 border border-gray-300"></th>
                                <th className="px-2 py-2 bg-gray-200 border border-gray-300">ID</th>
                                <th className="px-2 py-2 bg-gray-200 border border-gray-300">Title</th>
                                <th className="px-2 py-2 bg-gray-200 border border-gray-300">Brand</th>
                                <th className="px-2 py-2 bg-gray-200 border border-gray-300">Price</th>
                                <th className="px-2 py-2 bg-gray-200 border border-gray-300">Stock</th>
                            </tr>
                        </thead>
                        {/* Table body */}
                        {
                            loading ? (
                                <div className="w-full h-64 flex items-center justify-center ml-[150px]">
                                    <div className="text-center">
                                        Loading...
                                    </div>                                </div>
                            ) : (
                                <>
                                    {
                                        data.length > 0 ? (
                                            <tbody>
                                                {
                                                    data.map((row) => (
                                                        <tr key={row.id}>
                                                            <td className="px-2 py-4 border border-gray-300 row.id % 2 === 0 ? 'bg-white' : 'bg-gray-100' ">
                                                                <input
                                                                    type="checkbox"
                                                                    checked={selectedRows.some((r) => r.id === row.id)}
                                                                    onChange={() => handleCheckboxChange(row)}
                                                                />
                                                            </td>
                                                            <td className="px-2 py-4 whitespace-nowrap border border-gray-300">{row.id}</td>
                                                            <td className="px-2 py-4 whitespace-nowrap border border-gray-300">{row.title}</td>
                                                            <td className="px-2 py-4 whitespace-nowrap border border-gray-300">{row.brand}</td>
                                                            <td className="px-2 py-4 whitespace-nowrap border border-gray-300">{row.price}</td>
                                                            <td className="px-2 py-4 whitespace-nowrap border border-gray-300">{row.rating}</td>
                                                        </tr>
                                                    ))
                                                }
                                            </tbody>

                                        ) : (<>No Data Found</>)
                                    }
                                </>
                            )
                        }


                    </table>

                    <Pagination
                        totalItems={totalItemCount} // Pass the total number of items
                        itemsPerPage={itemsPerPage} // Pass the number of items per page
                        onPageChange={handlePageChange} // Pass the callback function to handle page changes
                    />
                </div>

            </div>
            {/*  chart component */}
            {
                data.length > 0 ? (
                    <Chart data={selectedRows} />
                ) : null
            }

        </div>
    );
};

export default DataTable;
