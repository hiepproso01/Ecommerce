import React, { useEffect, useState } from 'react';
import apiClient from '../../services/api';
import "../../styles/ProductFilter.css";
import { useNavigate } from 'react-router-dom';
const ProductFilter = ({ selectedDanhMuc }) => {
  const [products, setProducts] = useState([]); // Khởi tạo state cho sản phẩm
  const [loading, setLoading] = useState(true); // Thêm state để quản lý trạng thái loading
  const [error, setError] = useState(null); // Thêm state để quản lý lỗi
  const navigate = useNavigate();
  useEffect(() => {
    if (selectedDanhMuc) {
      setLoading(true); // Bắt đầu loading
      apiClient.get(`api/sanpham/GetByDanhMuc/${selectedDanhMuc}`) // Gọi API
        .then(response => {
          setProducts(response.data); // Lưu danh sách sản phẩm vào state
          setLoading(false); // Kết thúc loading
        })
        .catch(error => {
          console.error("There was an error fetching the products!", error);
          setError("Lỗi khi lấy danh sách sản phẩm."); // Cập nhật thông báo lỗi
          setLoading(false); // Kết thúc loading
        });
    }
  }, [selectedDanhMuc]); // Khi selectedDanhMuc thay đổi, gọi lại useEffect
  const handleProductClick = (idSanPham) => {
    console.log("idSanPham:", idSanPham); // Kiểm tra xem có lấy đúng idSanPham
    navigate(`/product/${idSanPham}`); // Điều hướng đến trang chi tiết sản phẩm
    // Gọi API khác sử dụng idSanPham
    apiClient.get(`api/sanpham/GetById/${idSanPham}`)
    .then(response => {
        console.log(response.data); // Kiểm tra phản hồi từ API
        setSelectedProduct(response.data); // Lưu trữ chi tiết sản phẩm
    })
    .catch(error => {
        console.error("There was an error fetching the product details!", error);
    });
};
  if (loading) {
    return <div>Loading...</div>; // Hiển thị khi đang loading
  }

  if (error) {
    return <div>{error}</div>; // Hiển thị thông báo lỗi nếu có
  }
  const getFullImageUrl = (fileName) => {
    if (!fileName) return null;
    return `http://localhost:5222/api/sanpham${fileName}`; // Đường dẫn đến hình ảnh
  };
  return (
    <div className="product-list">
      {/* <h3 className="product-title">Sản Phẩm</h3> */}
      <ul className="product-grid">
        {products.length > 0 ? (
          products.map((product) => (
            <li key={product.idSanPham} className="product-item">
              <div className="product-content"onClick={() => handleProductClick(product.idSanPham)} >
              {product.hinhAnh ? ( // Kiểm tra xem sản phẩm có hình ảnh không
                <img 
                  src={getFullImageUrl(product.hinhAnh)} // Hiển thị hình ảnh
                  alt={product.tenSanPham}
                  className="product-image"
                  onError={(e) => {
                    e.target.onerror = null;
                    
                  }}
                />
              ) : (
                <div className="no-image">Không có hình ảnh</div> // Hiển thị khi không có hình ảnh
              )}
                <div className="product-content">
    <span className="product-name">{product.tenSanPham}</span>
                <span className="product-price">{parseInt(product.giaBan).toLocaleString('vi-VN')} VND</span>
              </div>
              </div>
            </li>
          ))
        ) : (
          <li className="product-item">Không có sản phẩm nào trong danh mục này.</li> // Thông báo nếu không có sản phẩm
        )}
      </ul>
    </div>
  );
};

export default ProductFilter;
