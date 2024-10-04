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
  const [categoryGroups, setCategoryGroups] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [categoryProductsResponse, categoryGroupsResponse] = await Promise.all([
          apiClient.get('/api/danhmucsp/GetAll'),
          apiClient.get('/api/nhomdanhmuc/GetAll')
        ]);
        setCategoryProducts(categoryProductsResponse.data);
        setFilteredCategoryProducts(categoryProductsResponse.data);
        setCategoryGroups(categoryGroupsResponse.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
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


  const handleEditOrAdd = async (id = null) => {
    const categoryProduct = id
      ? categoryProducts.find(cp => cp.idDanhMuc === id)
      : { tenDanhMuc: '', idDanhMuc: '', nhomDanhMuc: '' }; // Thêm thuộc tính nhóm danh mục
  
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
          <select id="nhomDanhMuc" class="swal2-input" style="border: 1px solid #4A90E2; border-radius: 4px; padding: 10px;">
            <option value="">Chọn nhóm danh mục</option>
            ${categoryGroups.map(group => `
              <option value="${group.idNhomDanhMuc}" ${categoryProduct?.nhomDanhMuc === group.idNhomDanhMuc ? 'selected' : ''}>
                ${group.tenNhomDanhMuc}
              </option>
            `).join('')}
          </select>
        </div>
      `,
      showCancelButton: true,
      confirmButtonColor: '#4A90E2',
      cancelButtonColor: '#d33',
      confirmButtonText: id ? 'Cập nhật' : 'Thêm mới',
      cancelButtonText: 'Huỷ',
      preConfirm: () => {
        return {
          idDanhMuc: id ? id : document.getElementById('idDanhMuc').value,
          tenDanhMuc: document.getElementById('tenDanhMuc').value,
          nhomDanhMuc: document.getElementById('nhomDanhMuc').value // Lấy giá trị nhóm danh mục
        };
      }
    });
  
    if (formValues) {
      try {
        if (id) {
          await apiClient.put(`/api/danhmucsp/Update/${id}`, formValues);
          Swal.fire(
            'Đã cập nhật!',
            'Danh mục đã được cập nhật thành công.',
            'success'
          );
        } else {
          await apiClient.post('/api/danhmucsp/Create', {
            idDanhMuc: formValues.idDanhMuc,
            tenDanhMuc: formValues.tenDanhMuc,
            nhomDanhMuc: formValues.nhomDanhMuc // Thêm nhóm danh mục vào dữ liệu gửi
          });
          Swal.fire(
            'Đã thêm!',
            'Danh mục đã được thêm mới thành công.',
            'success'
          );
        }
  
        // Refresh category list
        const response = await apiClient.get('/api/danhmucsp/GetAll');
        setCategoryProducts(response.data);
        setFilteredCategoryProducts(response.data); // Cập nhật danh sách lọc
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

  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        resolve(fileReader.result);
      };
      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };

  const handleAddCategoryGroup = async () => {
    const { value: formValues } = await Swal.fire({
      title: '<h2 style="color:#4A90E2;">Thêm mới nhóm danh mục</h2>',
      html: `
        <div style="display: flex; flex-direction: column; gap: 10px;">
          <input 
            id="idNhomDanhMuc" 
            class="swal2-input" 
            placeholder="ID Nhóm Danh mục" 
            style="border: 1px solid #4A90E2; border-radius: 4px; padding: 10px;">
          <input 
            id="tenNhomDanhMuc" 
            class="swal2-input" 
            placeholder="Tên Nhóm Danh mục" 
            style="border: 1px solid #4A90E2; border-radius: 4px; padding: 10px;">
          <input 
            type="file" 
            id="hinhAnhNhomDanhMuc" 
            accept="image/*"
            style="border: 1px solid #4A90E2; border-radius: 4px; padding: 10px;">
        </div>
      `,
      showCancelButton: true,
      confirmButtonColor: '#4A90E2',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Thêm mới',
      cancelButtonText: 'Huỷ',
      preConfirm: async () => {
        const file = document.getElementById('hinhAnhNhomDanhMuc').files[0];
        let hinhAnhBase64 = '';
        if (file) {
          hinhAnhBase64 = await convertToBase64(file);
        }
        return {
          idNhomDanhMuc: document.getElementById('idNhomDanhMuc').value,
          tenNhomDanhMuc: document.getElementById('tenNhomDanhMuc').value,
          hinhAnhNhomDanhMuc: hinhAnhBase64
        };
      }
    });

    if (formValues) {
      try {
        await apiClient.post('/api/nhomdanhmuc/Create', formValues);
        Swal.fire(
          'Đã thêm!',
          'Nhóm danh mục đã được thêm mới thành công.',
          'success'
        );
        // Refresh the category groups list if needed
      } catch (error) {
        console.error('Lỗi khi thêm nhóm danh mục:', error);
        Swal.fire(
          'Lỗi!',
          'Đã có lỗi xảy ra khi thêm nhóm danh mục.',
          'error'
        );
      }
    }
  };

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
        <button
          onClick={handleAddCategoryGroup}
          className="add-button"
          style={{ marginLeft: '10px' }}
        >
          Thêm nhóm danh mục
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
                <th className="table-cell">Mã danh mục</th>
                <th className="table-cell">Tên danh mục</th>
                <th className="table-cell">Nhóm danh mục</th>
                <th className="table-cell">Tùy chỉnh</th>
              </tr>
            </thead>
            <tbody className="table-row-1">
              {currentItems.map((categoryProduct) => (
                <tr key={categoryProduct.idDanhMuc}>
                  <td className="table-cell">{categoryProduct.idDanhMuc}</td>
                  <td className="table-cell">{categoryProduct.tenDanhMuc}</td>
                  <td className="table-cell">{categoryProduct.nhomDanhMuc}</td>
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