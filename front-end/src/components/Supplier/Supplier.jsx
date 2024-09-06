import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import apiClient from '../../services/api';


const Supplier = () => {
    const [suppliers, setSuppliers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [filteredSuppliers, setFilteredSuppliers] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const itemsPerPage = 5; // Số danh mục hiển thị trên mỗi trang
    useEffect(() => {
        const fetchSuppliers = async () => {
          try {
            const response = await apiClient.get('/api/nhacungcap/GetAll');
            setSuppliers(response.data);
            setFilteredSuppliers(response.data); 
          } catch (error) {
            console.error('Error fetching suppliers:', error);
          } finally {
            setLoading(false);
          }
        };
    
        fetchSuppliers();
      }, []);
      const handleDelete = async (id) => {
        const result = await Swal.fire({
          title: 'Bạn có chắc chắn?',
          text: 'Bạn sẽ không thể hoàn tác điều này!',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Vâng, xoá nó đi!'
        });
    
        if (result.isConfirmed) {
          try {
            await apiClient.delete(`/api/nhacungcap/Delete/${id}`);
            setSuppliers(suppliers.filter(ncc => ncc.idNhaCungCap !== id));
            setFilteredSuppliers(filteredSuppliers.filter(ncc => ncc.idNhaCungCap !== id));
            Swal.fire(
              'Đã xoá!',
              'Nhà cung cấp đã được xoá.',
              'success'
            );
          } catch (error) {
            console.error('Lỗi khi xoá nhà cung cấp:', error);
            Swal.fire(
              'Lỗi!',
              'Đã có lỗi xảy ra khi xoá nhà cung cấp.',
              'error'
            );
          }
        }
      };

      const handleEditOrAdd = async (id = null) => {
        const supplier = id
          ? suppliers.find(ncc => ncc.idNhaCungCap === id)
          : { tenNhaCungCap: '', idNhaCungCap: '' };
    
        const { value: formValues } = await Swal.fire({
          title: `<h2 style="color:#4A90E2;">${id ? 'Chỉnh sửa nhà cung cấp' : 'Thêm mới nhà cung cấp'}</h2>`,
          html: `
            <div style="display: flex; flex-direction: column; gap: 10px;">
             <input 
              id="idNhaCungCap" 
              class="swal2-input" 
              placeholder="ID Nhà cung cấp" 
              value="${supplier?.idNhaCungCap || ''}" 
              style="border: 1px solid #4A90E2; border-radius: 4px; padding: 10px;">
              <input 
                id="tenNhaCungCap" 
                class="swal2-input" 
                placeholder="Tên nhà cung cấp" 
                value="${supplier?.tenNhaCungCap || ''}" 
                style="border: 1px solid #4A90E2; border-radius: 4px; padding: 10px;">
            </div>
          `,
          showCancelButton: true,
          confirmButtonColor: '#4A90E2',
          cancelButtonColor: '#d33',
          confirmButtonText: id ? 'Cập nhật' : 'Thêm mới',
          cancelButtonText: 'Huỷ',
          preConfirm: () => {
            return {
              idNhaCungCap: id ? id : document.getElementById('idNhaCungCap').value,
              tenNhaCungCap: document.getElementById('tenNhaCungCap').value
            };
          }
        });
    
        if (formValues) {
          try {
            if (id) {
              await apiClient.put(`/api/nhacungcap/Update/${id}`, formValues);
              Swal.fire(
                'Đã cập nhật!',
                'Nhà cung cấp đã được cập nhật thành công.',
                'success'
              );
            } else {
              await apiClient.post('/api/nhacungcap/Create', {
                idNhaCungCap: formValues.idNhaCungCap,
                tenNhaCungCap: formValues.tenNhaCungCap
              });
              Swal.fire(
                'Đã thêm!',
                'Nhà cung cấp đã được thêm mới thành công.',
                'success'
              );
            }
    
            // Refresh category list
            const response = await apiClient.get('/api/nhacungcap/GetAll');
            setSuppliers(response.data);
            setFilteredSuppliers(response.data); // Cập nhật danh sách lọc
          } catch (error) {
            console.error('Lỗi khi lưu nhà cung cấp:', error);
            Swal.fire(
              'Lỗi!',
              'Đã có lỗi xảy ra khi lưu nhà cung cấp.',
              'error'
            );
          }
        }
      };
      const handleSearch = (e) => {
        setSearchTerm(e.target.value);
        const filtered = suppliers.filter(
          (product) =>
            product.idNhaCungCap.toLowerCase().includes(e.target.value.toLowerCase()) ||
            product.tenNhaCungCap.toLowerCase().includes(e.target.value.toLowerCase())
        );
        setFilteredSuppliers(filtered);
        setCurrentPage(1); // Reset trang hiện tại về trang đầu tiên
      };
      // Tính toán danh mục sản phẩm sẽ hiển thị trên trang hiện tại
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredSuppliers.slice(indexOfFirstItem, indexOfLastItem);

  // Tính tổng số trang
  const totalPages = Math.ceil(filteredSuppliers.length / itemsPerPage);
    return (
        <div className="page-container">
      <h1 className="page-title">Nhà cung cấp</h1>
      <div className="search-add-container">
      <button
        onClick={() => handleEditOrAdd()}
        className="add-button"
      >
        Thêm mới nhà cung cấp
      </button>
      <input
        type="text"
        placeholder="Tìm kiếm theo ID hoặc Tên nhà cung cấp"
        value={searchTerm}
        onChange={handleSearch}
          className="search-input-1"
        />
      </div>
      {loading ? (
        <p className="loading-text">Đang tải...</p>
      ) : (
        <>
          <table className="table">
            <thead className="table-header">
              <tr>
                <th className="table-cell">Mã nhà cung cấp</th>
                <th className="table-cell">Tên nhà cung cấp</th>
                <th className="table-cell">Tùy chỉnh</th>
              </tr>
            </thead>
            <tbody className="table-row-1">
              {currentItems.map((categoryProduct) => (
                <tr key={categoryProduct.idDanhMuc}>
                  <td className="table-cell">{categoryProduct.idNhaCungCap}</td>
                  <td className="table-cell">{categoryProduct.tenNhaCungCap}</td>
                  <td className="table-cell">
                    <div
                      onClick={() => handleEditOrAdd(categoryProduct.idNhaCungCap)}
                      className="action-button"
                    >
                      Chỉnh sửa
                    </div>
                    <div
                      onClick={() => handleDelete(categoryProduct.idNhaCungCap)}
                      className="delete-button"
                    >
                      Xoá
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="pagination-container">
            <button
              onClick={() => setCurrentPage((prevPage) => Math.max(prevPage - 1, 1))}
              className={`pagination-button ${currentPage === 1 ? 'pagination-button-disabled' : 'pagination-button-active'}`}
              disabled={currentPage === 1}
            >
              Trước
            </button>
            <span className="pagination-text">{`Trang ${currentPage} / ${totalPages}`}</span>
            <button
              onClick={() => setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages))}
              className={`pagination-button ${currentPage === totalPages ? 'pagination-button-disabled' : 'pagination-button-active'}`}
              disabled={currentPage === totalPages}
            >
              Sau
            </button>
          </div>
        </>
      )}
    </div>
    )
}

export default Supplier;