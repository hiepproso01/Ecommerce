import React, { useEffect, useState } from 'react';
import apiClient from '../services/api';
import "../styles/Customer.css";
const Customer = () => {
    const [customers, setCustomers] = useState([]);
    const [filteredCustomers, setFilteredCustomers] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [loading, setLoading] = useState(true);
    const itemsPerPage = 10; // Số lượng khách hàng mỗi trang

    useEffect(() => {
        const fetchCustomer = async () => {
            try {
                const response = await apiClient.get('/api/nguoidung/GetAll');
                const allCustomers = response.data;

                // Lọc khách hàng có role = "NguoiDung"
                const filtered = allCustomers.filter(customer => customer.role === 'NguoiDung');
                
                setCustomers(filtered);
                setFilteredCustomers(filtered);
            } catch (error) {
                console.error('Error fetching customers:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchCustomer();
    }, []);

    // Tính toán danh mục khách hàng sẽ hiển thị trên trang hiện tại
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredCustomers.slice(indexOfFirstItem, indexOfLastItem);

    // Tính tổng số trang
    const totalPages = Math.ceil(filteredCustomers.length / itemsPerPage);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    return (
        <div >
            <h1>Customer</h1>
            {loading ? (
                <p>Loading...</p>
            ) : (
                <div className="mx-auto p-6 bg-gray-50 rounded-lg shadow-lg ">
                    <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-md mt-6" style={{ cursor: 'pointer' }}>
                        <thead>
                            <tr className='bg-gray-100 text-blue-600'>
                                <th className='p-4 text-center'>ID</th>
                                <th className='p-4 text-center'>Tên người dùng</th>
                                <th className='p-4 text-center'>Email</th>
                                <th className='p-4 text-center'>SĐT</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentItems.map(customer => (
                                <tr key={customer.id}>
                                    <td>{customer.id}</td>
                                    <td>{customer.tenNguoiDung}</td>
                                    <td>{customer.email}</td>
                                    <td>{customer.phoneNumber}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <div className="flex justify-center mt-6" id="pagination">
                        <button
                         className='px-4 py-2 border rounded bg-blue-500 text-black'
                            disabled={currentPage === 1}
                            onClick={() => handlePageChange(currentPage - 1)}
                        >
                            Previous
                        </button>
                        {Array.from({ length: totalPages }, (_, index) => (
                            <button
                             className='px-4 py-2 border rounded bg-blue-500 text-black ml-2'
                                key={index + 1}
                                onClick={() => handlePageChange(index + 1)}
                                disabled={currentPage === index + 1}
                            >
                                {index + 1}
                            </button>
                        ))}
                        <button
                         className='px-4 py-2 border rounded bg-blue-500 text-black ml-2'
                            disabled={currentPage === totalPages}
                            onClick={() => handlePageChange(currentPage + 1)}
                        >
                            Next
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Customer;
