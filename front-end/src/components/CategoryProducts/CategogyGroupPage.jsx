import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import apiClient from '../../services/api';


const CategogyGroupPage = () => {
    const [categogyGroup, setCategogyGroup] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [filteredCategogyGroup, setFilteredCategogyGroup] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const itemsPerPage = 5; // Số danh mục hiển thị trên mỗi trang
    useEffect(() => {
        const fetchSuppliers = async () => {
          try {
            const response = await apiClient.get('/api/nhomdanhmuc/GetAll');
            setCategogyGroup(response.data);
            setFilteredCategogyGroup(response.data); 
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
            await apiClient.delete(`/api/nhomdanhmuc/Delete/${id}`);
            setCategogyGroup(categogyGroup.filter(ncc => ncc.idNhomDanhMuc !== id));
            setFilteredCategogyGroup(filteredCategogyGroup.filter(ncc => ncc.idNhomDanhMuc !== id));
            Swal.fire(
              'Đã xoá!',
              'Nhóm danh mục đã được xoá.',
              'success'
            );
          } catch (error) {
            console.error('Lỗi khi xoá nhóm danh mục:', error);
            Swal.fire(
              'Lỗi!',
              'Đã có lỗi xảy ra khi xoá nhóm danh mục.',
              'error'
            );
          }
        }
      };

      const handleEditOrAdd = async (id = null) => {
        const categogyGroup = id
          ? categogyGroup.find(ncc => ncc.idNhomDanhMuc === id)
          : { tenNhomDanhMuc: '', idNhomDanhMuc: '' };
    
        const { value: formValues } = await Swal.fire({
          title: `<h2 style="color:#4A90E2;">${id ? 'Chỉnh sửa nhóm danh mục' : 'Thêm mới nhóm danh mục'}</h2>`,
          html: `
            <div style="display: flex; flex-direction: column; gap: 10px;">
             <input 
              id="idNhomDanhMuc" 
              class="swal2-input" 
              placeholder="ID Nhóm danh mục" 
              value="${categogyGroup?.idNhomDanhMuc || ''}" 
              style="border: 1px solid #4A90E2; border-radius: 4px; padding: 10px;">
              <input 
                id="tenNhomDanhMuc" 
                class="swal2-input" 
                placeholder="Tên nhóm danh mục" 
                value="${categogyGroup?.tenNhomDanhMuc || ''}" 
                style="border: 1px solid #4A90E2; border-radius: 4px; padding: 10px;">
                <input 
                id="hinhAnhNhomDanhMuc" 
                type="file" 
                accept="image/*"
                class="swal2-file" 
                style="border: 1px solid #4A90E2; border-radius: 4px; padding: 10px;">
            </div>
          `,
          showCancelButton: true,
          confirmButtonColor: '#4A90E2',
          cancelButtonColor: '#d33',
          confirmButtonText: id ? 'Cập nhật' : 'Thêm mới',
          cancelButtonText: 'Huỷ',
          preConfirm: async () => {
            const file = document.getElementById('hinhAnhNhomDanhMuc').files[0];
            let hinhAnhBase64 = '';
            if (file) {
              hinhAnhBase64 = await convertToBase64(file);
            }
            return {
              idNhomDanhMuc: id ? id : document.getElementById('idNhomDanhMuc').value,
              tenNhomDanhMuc: document.getElementById('tenNhomDanhMuc').value,
              hinhAnhNhomDanhMuc: hinhAnhBase64
            };
          }
        });
    
        if (formValues) {
          try {
            if (id) {
              await apiClient.put(`/api/nhomdanhmuc/Update/${id}`, formValues);
              Swal.fire(
                'Đã cập nhật!',
                'Nhóm danh mục đã được cập nhật thành công.',
                'success'
              );
            } else {
              await apiClient.post('/api/nhomdanhmuc/Create', formValues);
              Swal.fire(
                'Đã thêm!',
                'Nhóm danh mục đã được thêm mới thành công.',
                'success'
              );
            }
    
            // Refresh category list
            const response = await apiClient.get('/api/nhomdanhmuc/GetAll');
            setCategogyGroup(response.data);
            setFilteredCategogyGroup(response.data); // Cập nhật danh sách lọc
          } catch (error) {
            console.error('Lỗi khi lưu nhóm danh mục:', error);
            Swal.fire(
              'Lỗi!',
              'Đã có lỗi xảy ra khi lưu nhóm danh mục.',
              'error'
            );
          }
        }
      };

      const convertToBase64 = (file) => {
        return new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.readAsDataURL(file);
          reader.onload = () => resolve(reader.result);
          reader.onerror = (error) => reject(error);
        });
      };

      const handleSearch = (e) => {
        setSearchTerm(e.target.value);
        const filtered = categogyGroup.filter(
          (product) =>
            product.idNhomDanhMuc.toLowerCase().includes(e.target.value.toLowerCase()) ||
            product.tenNhomDanhMuc.toLowerCase().includes(e.target.value.toLowerCase())
        );
        setFilteredCategogyGroup(filtered);
        setCurrentPage(1); // Reset trang hiện tại về trang đầu tiên
      };
      // Tính toán danh mục sản phẩm sẽ hiển thị trên trang hiện tại
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredCategogyGroup.slice(indexOfFirstItem, indexOfLastItem);

  // Tính tổng số trang
  const totalPages = Math.ceil(filteredCategogyGroup.length / itemsPerPage);
    return (
        <div className="page-container">
      <h1 className="page-title">Nhóm danh mục</h1>
      <div className="search-add-container">
      <button
        onClick={() => handleEditOrAdd()}
        className="add-button"
      >
        Thêm mới nhóm danh mục
      </button>
      <input
        type="text"
        placeholder="Tìm kiếm theo ID hoặc Tên nhóm danh mục"
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
              <th className="table-cell">Hình ảnh nhóm danh mục</th>
                <th className="table-cell">Mã nhóm danh mục</th>
                <th className="table-cell">Tên nhóm danh mục</th>
               
                <th className="table-cell">Tùy chỉnh</th>
              </tr>
            </thead>
            <tbody className="table-row-1">
              {currentItems.map((categoryProduct) => (
                <tr key={categoryProduct.idDanhMuc}>
                  <td className="table-cell">
                    {categoryProduct.hinhAnhNhomDanhMuc ? (
                      <img
                        src={categoryProduct.hinhAnhNhomDanhMuc}
                        alt={categoryProduct.tenNhomDanhMuc}
                        className="w-16 h-16 object-cover rounded"
                      />
                    ) : (
                      <p>Không có hình ảnh</p>
                    )}
                  </td>
                  <td className="table-cell">{categoryProduct.idNhomDanhMuc}</td>
                  <td className="table-cell">{categoryProduct.tenNhomDanhMuc}</td>
                  
                  <td className="table-cell">
                    <div
                      onClick={() => handleEditOrAdd(categoryProduct.idNhomDanhMuc)}
                      className="action-button"
                    >
                      Chỉnh sửa
                    </div>
                    <div
                      onClick={() => handleDelete(categoryProduct.idNhomDanhMuc)}
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

export default CategogyGroupPage;