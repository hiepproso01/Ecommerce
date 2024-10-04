import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import apiClient from '../../services/api';
import "../../styles/CategoryProductPage.css";

const CategoryProductsPage = () => {
  const [categoryProducts, setCategoryProducts] = useState([]);
  const [filteredCategoryProducts, setFilteredCategoryProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const itemsPerPage = 5; // Số danh mục hiển thị trên mỗi trang
  const [nhomDanhMucList, setNhomDanhMucList] = useState([]);

  useEffect(() => {
    const fetchCategoryProducts = async () => {
      try {
        const response = await apiClient.get('/api/danhmucsp/GetAll');
        setCategoryProducts(response.data);
        setFilteredCategoryProducts(response.data);
      } catch (error) {
        console.error('Error fetching category products:', error);
      } finally {
        setLoading(false);
      }
    };

    const fetchNhomDanhMuc = async () => {
      try {
        const response = await apiClient.get('/api/nhomdanhmuc/GetAll');
        setNhomDanhMucList(response.data);
      } catch (error) {
        console.error('Error fetching nhom danh muc:', error);
      }
    };

    fetchCategoryProducts();
    fetchNhomDanhMuc();
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
        await apiClient.delete(`/api/danhmucsp/Delete/${id}`);
        setCategoryProducts(categoryProducts.filter(cp => cp.idDanhMuc !== id));
        setFilteredCategoryProducts(filteredCategoryProducts.filter(cp => cp.idDanhMuc !== id));
        Swal.fire(
          'Đã xoá!',
          'Danh mục đã được xoá.',
          'success'
        );
      } catch (error) {
        console.error('Lỗi khi xoá danh mục:', error);
        Swal.fire(
          'Lỗi!',
          'Đã có lỗi xảy ra khi xoá danh mục.',
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

  const handleEditOrAdd = async (id = null) => {
    const categoryProduct = id
      ? categoryProducts.find(cp => cp.idDanhMuc === id)
      : { tenDanhMuc: '', idDanhMuc: '', idNhomDanhMuc: '', tenNhomDanhMuc: '', hinhAnhDanhMuc: '' };
  
    const { value: formValues } = await Swal.fire({
      title: `<h2 style="color:#4A90E2;">${id ? 'Chỉnh sửa danh mục' : 'Thêm mới danh mục'}</h2>`,
      html: `
        <div style="display: flex; flex-direction: column; gap: 10px;">
          <input 
            id="idDanhMuc" 
            class="swal2-input" 
            placeholder="ID Danh mục" 
            value="${categoryProduct?.idDanhMuc || ''}" 
            style="border: 1px solid #4A90E2; border-radius: 4px; padding: 10px;">
          <input 
            id="tenDanhMuc" 
            class="swal2-input" 
            placeholder="Tên danh mục" 
            value="${categoryProduct?.tenDanhMuc || ''}" 
            style="border: 1px solid #4A90E2; border-radius: 4px; padding: 10px;">
          <select id="idNhomDanhMuc" class="swal2-select" style="border: 1px solid #4A90E2; border-radius: 4px; padding: 10px;">
            <option value="">Chọn nhóm danh mục</option>
            ${nhomDanhMucList.map(nhom => `
              <option value="${nhom.idNhomDanhMuc}" ${categoryProduct?.idNhomDanhMuc === nhom.idNhomDanhMuc ? 'selected' : ''}>
                ${nhom.tenNhomDanhMuc}
              </option>
            `).join('')}
          </select>
          <input 
            id="hinhAnhDanhMuc" 
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
        const file = document.getElementById('hinhAnhDanhMuc').files[0];
        let hinhAnhBase64 = categoryProduct?.hinhAnhDanhMuc || '';
        if (file) {
          hinhAnhBase64 = await convertToBase64(file);
        }
        const idNhomDanhMuc = document.getElementById('idNhomDanhMuc').value;
        const selectedNhomDanhMuc = nhomDanhMucList.find(nhom => nhom.idNhomDanhMuc === idNhomDanhMuc);
        return {
          idDanhMuc: id ? id : document.getElementById('idDanhMuc').value,
          tenDanhMuc: document.getElementById('tenDanhMuc').value,
          idNhomDanhMuc: idNhomDanhMuc,
          tenNhomDanhMuc: selectedNhomDanhMuc ? selectedNhomDanhMuc.tenNhomDanhMuc : '',
          hinhAnhDanhMuc: hinhAnhBase64
        };
      }
    });
  
    if (formValues) {
      // Log dữ liệu của các trường vào console
      console.log('Dữ liệu các trường:', formValues);

      try {
        if (id) {
          await apiClient.put(`/api/danhmucsp/Update/${id}`, formValues);
          Swal.fire(
            'Đã cập nhật!',
            'Danh mục đã được cập nhật thành công.',
            'success'
          );
        } else {
          await apiClient.post('/api/danhmucsp/Create', formValues);
          Swal.fire(
            'Đã thêm!',
            'Danh mục đã được thêm mới thành công.',
            'success'
          );
        }
  
        // Refresh category list
        const response = await apiClient.get('/api/danhmucsp/GetAll');
        setCategoryProducts(response.data);
        setFilteredCategoryProducts(response.data);
      } catch (error) {
        console.error('Lỗi khi lưu danh mục:', error);
        Swal.fire(
          'Lỗi!',
          'Đã có lỗi xảy ra khi lưu danh mục.',
          'error'
        );
      }
    }
  };
  

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    const filtered = categoryProducts.filter(
      (product) =>
        product.idDanhMuc.toLowerCase().includes(e.target.value.toLowerCase()) ||
        product.tenDanhMuc.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setFilteredCategoryProducts(filtered);
    setCurrentPage(1); // Reset trang hiện tại về trang đầu tiên
  };

  // Tính toán danh mục sản phẩm sẽ hiển thị trên trang hiện tại
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredCategoryProducts.slice(indexOfFirstItem, indexOfLastItem);

  // Tính tổng số trang
  const totalPages = Math.ceil(filteredCategoryProducts.length / itemsPerPage);

  return (
    <div className="page-container">
      <h1 className="page-title">Danh mục sản phẩm</h1>
      <div className="search-add-container">
      <button
        onClick={() => handleEditOrAdd()}
        className="add-button"
      >
        Thêm mới danh mục
      </button>
      <input
        type="text"
        placeholder="Tìm kiếm theo ID hoặc Tên danh mục"
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
              <th className="table-cell">Hình ảnh danh mục</th>
                <th className="table-cell">Mã danh mục</th>
                <th className="table-cell">Tên danh mục</th>
                <th className='table-cell'>Mã nhóm danh mục</th>
                <th className="table-cell">Nhóm danh mục</th>
                <th className="table-cell">Tùy chỉnh</th>
              </tr>
            </thead>
            <tbody className="table-row-1">
              {currentItems.map((categoryProduct) => (
                <tr key={categoryProduct.idDanhMuc}>
                    <td className="table-cell">
                    {categoryProduct.hinhAnhDanhMuc && (
                      <img 
                        src={categoryProduct.hinhAnhDanhMuc} 
                        alt={categoryProduct.tenDanhMuc} 
                        style={{ width: '50px', height: '50px', objectFit: 'cover' }} 
                      />
                    )}
                  </td>
                  <td className="table-cell">{categoryProduct.idDanhMuc}</td>
                  <td className="table-cell">{categoryProduct.tenDanhMuc}</td>
                  <td className="table-cell">{categoryProduct.idNhomDanhMuc}</td>
                  <td className="table-cell">{categoryProduct.tenNhomDanhMuc}</td>
                  {/* <td className="table-cell">
                    {nhomDanhMucList.find(nhom => nhom.idNhomDanhMuc === categoryProduct.idNhomDanhMuc)?.tenNhomDanhMuc || ''}
                  </td> */}
                
                  <td className="table-cell">
                    <div
                      onClick={() => handleEditOrAdd(categoryProduct.idDanhMuc)}
                      className="action-button"
                    >
                      Chỉnh sửa
                    </div>
                    <div
                      onClick={() => handleDelete(categoryProduct.idDanhMuc)}
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
  );
};

export default CategoryProductsPage;