import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import apiClient from '../../services/api';
import CreateProduct from './CreateProducts';
import UpdateProduct from './UpdateProducts';
import '../../styles/global.css';
import Popup from '../Popup';
import CategoryProductPage from '../CategoryProducts/CategoryProductPage';

const ProductPage = () => {
  const [products, setProducts] = useState([]);
  const [editingidSanPham, setEditingidSanPham] = useState(null);
  const [showCreate, setShowCreate] = useState(false);
  const [showCategoryPopup, setShowCategoryPopup] = useState(false);
  const [description, setDescription] = useState('');
  const [showDescriptionPopup, setShowDescriptionPopup] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(6); // Số sản phẩm trên mỗi trang
  const [selectedImage, setSelectedImage] = useState(null);
const [showImagePopup, setShowImagePopup] = useState(false);

  useEffect(() => {
    apiClient.get('api/sanpham/GetAll')
      .then(response => {
        setProducts(response.data);
      })
      .catch(error => {
        console.error("There was an error fetching the products!", error);
      });
  }, []);

  // Xử lý phân trang
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  const handleImageClick = (imageUrl) => {
    setSelectedImage(imageUrl);
    setShowImagePopup(true);
  };
  
  const closeImagePopup = () => setShowImagePopup(false);
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(products.length / productsPerPage); i++) {
    pageNumbers.push(i);
  }

  const handleAddClick = () => {
    setShowCreate(true);
  };

  const handleEditClick = (idSanPham) => {
    setEditingidSanPham(idSanPham);
  };

  const handleDeleteClick = (idSanPham) => {
    Swal.fire({
      title: 'Bạn có chắc chắn không?',
      text: "Hành động này sẽ xóa sản phẩm!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Xóa',
      cancelButtonText: 'Hủy'
    }).then((result) => {
      if (result.isConfirmed) {
        apiClient.delete(`api/sanpham/Delete/${idSanPham}`)
          .then(() => {
            setProducts(products.filter(product => product.idSanPham !== idSanPham));
            Swal.fire(
              'Đã xóa!',
              'Sản phẩm đã được xóa.',
              'success'
            );
          })
          .catch(error => {
            console.error("There was an error deleting the product!", error);
            Swal.fire(
              'Lỗi!',
              'Có lỗi xảy ra khi xóa sản phẩm.',
              'error'
            );
          });
      }
    });
  };

  const closeCreatePopup = () => setShowCreate(false);
  const closeUpdatePopup = () => setEditingidSanPham(null);
  const closeCategoryPopup = () => setShowCategoryPopup(false);

  const handleDescriptionView = (idSanPham) => {
    const product = products.find(p => p.idSanPham === idSanPham);
    if (product) {
      setDescription(product.moTa);
      setShowDescriptionPopup(true);
    }
  };
  const formatter = new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
    currencyDisplay: 'symbol',
    minimumFractionDigits: 0,
  });

  return (
    <div className="mx-auto p-6 bg-gray-50 rounded-lg shadow-lg bg-gradient-to-r from-white/50 to-blue-500/50">
      <div className="flex justify-between mb-6">
        <button
          onClick={handleAddClick}
          className="bg-indigo-500 text-white px-5 py-2 rounded-lg hover:bg-indigo-600 transition duration-300"
        >
          Nhập hàng
        </button>
        <button
          onClick={() => setShowCategoryPopup(true)}
          className="bg-teal-500 text-white px-5 py-2 rounded-lg hover:bg-teal-600 transition duration-300"
        >
          Quản lý danh mục
        </button>
      </div>
      <Popup width="w-[auto] h-[auto]" isOpen={showCreate} onClose={closeCreatePopup}>
        <CreateProduct
          onClose={closeCreatePopup}
          onSuccess={() => {
            closeCreatePopup();
            apiClient.get('api/sanpham/GetAll')
              .then(response => setProducts(response.data))
              .catch(error => console.error("Error refreshing product list", error));
          }}
        />
      </Popup>
      <Popup width="max-w-[1000px]" isOpen={!!editingidSanPham} onClose={closeUpdatePopup}>
        <UpdateProduct
          idSanPham={editingidSanPham}
          onUpdate={() => {
            closeUpdatePopup();
            apiClient.get('api/sanpham/GetAll')
              .then(response => setProducts(response.data))
              .catch(error => console.error("Error refreshing product list", error));
          }}
        />
      </Popup>
      <Popup width="max-w-[1000px]" isOpen={showCategoryPopup} onClose={closeCategoryPopup}>
        <CategoryProductPage onClose={closeCategoryPopup} />
      </Popup>
      <Popup isOpen={showDescriptionPopup} onClose={() => setShowDescriptionPopup(false)}>
        <div>
          <h2 className="text-2xl font-bold mb-4 text-gray-700">Mô tả sản phẩm</h2>
          <textarea
            className="border border-gray-300 p-3 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows="4"
            value={description}
          />
          <div className="flex justify-end mt-6">
            <button
              onClick={() => setShowDescriptionPopup(false)}
              className=" text-red-600 px-6 py-2 rounded-lg hover:text-gray-600 transition duration-300"
            >
              Đóng
            </button>
          </div>
        </div>
      </Popup>
      <Popup width="max-w-[40vw]" isOpen={showImagePopup} onClose={closeImagePopup}>
  <div className="flex justify-center items-center h-full">
    <img
      src={selectedImage}
      alt="Product"
      className="max-w-full max-h-screen object-contain"
    />
  </div>
</Popup>

      <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-md mt-6" style={{cursor: 'pointer'}}>
        <thead>
          <tr className="bg-gray-100 text-blue-600">
            {/* <th className="p-4 text-center"></th> */}
            <th className="p-4 text-center">Hình ảnh</th>
            <th className="p-4 text-center">Mã sản phẩm</th>
            <th className="p-4 text-center">Tên sản phẩm</th>
            <th className="p-4 text-center">Giá nhập</th>
            <th className="p-4 text-center">Giá bán</th>
            <th className="p-4 text-center">Số lượng tồn</th>
            <th className="p-4 text-center">Đơn vị tính</th>
            <th className="p-4 text-center">Mô tả sản phẩm</th>
            <th className="p-4 text-center">Chức năng</th>
          </tr>
        </thead>
        
        <tbody>
          {currentProducts.map(product => (
            <tr key={product.idSanPham} className="border-t hover:bg-blue-100 transition duration-200">
              {/* <td className="p-4 text-center">{product.categoryidSanPham}</td>
              <td className="p-4 text-center">{product.categoryProductName}</td> */}
              {/* <td className="p-4 text-center"></td> */}
              <td className="p-4 text-center">
                {product.hinhAnh ? (
                  <img
                    src={product.hinhAnh}
                    alt={product.tenSanPham}
                    className="w-16 h-16 object-cover rounded"
                    onClick={() => handleImageClick(product.hinhAnh)}
                  />
                ) : (
                  <span>Chưa có ảnh</span>
                )}
              </td>
              <td className="p-4 text-center">{product.idSanPham}</td>
              <td className="p-4 text-center">
                <span
                  className="relative group" // Sử dụng group để điều chỉnh tooltip khi hover
                >
                  {product.tenSanPham.length > 25
                    ? `${product.tenSanPham.substring(0, 25)}...`
                    : product.tenSanPham}

                  {/* Tooltip */}
                  <span className="absolute z-10 hidden w-[300px] group-hover:block bg-black text-white text-sm font-semibold p-2 rounded-lg max-w-xs transform -translate-x-1/2 translate-y-1 top-8">
                    {product.tenSanPham}
                  </span>
                </span>
              </td>

              <td className="p-4 text-center">{formatter.format(product.giaNhap)}</td>
              <td className="p-4 text-center">{formatter.format(product.giaBan)}</td>
              <td className="p-4 text-center">{product.soLuong}</td>
              <td className="p-4 text-center">{product.donViTinh}</td>
              <td className="p-4 text-center">
                <button
                  onClick={() => handleDescriptionView(product.idSanPham)}
                  className="text-blue-500 px-3 py-1 rounded hover:text-yellow-600 transition duration-300"
                >
                  Xem mô tả
                </button>
              </td>
              <td className="p-4 text-center">
                <button
                  onClick={() => handleEditClick(product.idSanPham)}
                  className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600 transition duration-300 mr-2"
                >
                  Sửa
                </button>
                <button
                  onClick={() => handleDeleteClick(product.idSanPham)}
                  className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition duration-300"
                >
                  Xóa
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex justify-center mt-6">
        <nav>
          <ul className="flex space-x-2">
            {pageNumbers.map(number => (
              <li key={number}>
                <button
                  onClick={() => handlePageChange(number)}
                  className={`px-4 py-2 border rounded ${number === currentPage ? 'bg-blue-500 text-white' : 'bg-white text-blue-500'}`}
                >
                  {number}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  );
}

export default ProductPage;
