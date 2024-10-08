// import React, { useState, useEffect } from "react";
// import apiClient from '../../services/api';
// import { useParams, Link, useNavigate } from 'react-router-dom';
// import '../../styles/ProductDetail.css';
// import HeaderUser from './HeaderUser';
// import { IoIosArrowBack } from "react-icons/io";
// import Swal from 'sweetalert2'; 

// const ProductDetail = () => {
//     const { idSanPham } = useParams();
//     const [product, setProduct] = useState(null);
//     const [quantity, setQuantity] = useState(1); // Thêm trạng thái cho số lượng
//     const navigate = useNavigate();
    
//     useEffect(() => {
//         apiClient.get(`api/sanpham/GetById/${idSanPham}`)
//             .then(response => {
//                 setProduct(response.data);
//             })
//             .catch(error => {
//                 console.error("Error fetching product details!", error);
//             });
//     }, [idSanPham]);

//     if (!product) {
//         return <p>Loading product details...</p>;
//     }
//    let currentCartId ;
//     const getCurrentCartId = () => {
//         // Logic để lấy ID giỏ hàng hiện tại
//         return localStorage.getItem('currentCartId'); // Ví dụ sử dụng localStorage
//     };
//     const handleAddToCart = () => {
//         // Giả sử bạn đã có cách lấy ID giỏ hàng hiện tại
//         currentCartId = getCurrentCartId(); // Giả sử hàm này sẽ trả về ID giỏ hàng hiện tại
    
//         // Kiểm tra nếu ID giỏ hàng không hợp lệ
//         if (!currentCartId) {
//             Swal.fire({
//                 icon: 'error',
//                 title: 'Lỗi',
//                 text: 'ID giỏ hàng không hợp lệ!',
//                 confirmButtonColor: '#d33',
//             });
//             return;
//         }
    
//         // Giả sử bạn đã có thông tin sản phẩm trong biến `product`
//         if (!product || !product.idSanPham) {
//             Swal.fire({
//                 icon: 'error',
//                 title: 'Lỗi',
//                 text: 'ID sản phẩm không hợp lệ!',
//                 confirmButtonColor: '#d33',
//             });
//             return;
//         }
    
//         const cartItem = {
//             IDSanPham: product.idSanPham, // Đảm bảo rằng giá trị này không phải là null
//             GIOHANGIDGioHang: currentCartId, // ID giỏ hàng hiện tại
//             SoLuong: 1, // Mặc định là 1
//             DonGia: product.giaBan, // Giá bán của sản phẩm
//         };
    
//         // Gọi API để thêm sản phẩm vào giỏ hàng
//         apiClient.post('api/CHITIETGIOHANG/AddToCart', cartItem)
//             .then(response => {
//                 // Hiển thị thông báo thành công
//                 Swal.fire({
//                     icon: 'success',
//                     title: 'Thành công',
//                     text: 'Sản phẩm đã được thêm vào giỏ hàng!',
//                     confirmButtonColor: '#3085d6',
//                 });
//             })
//             .catch(error => {
//                 console.error("Có lỗi xảy ra khi thêm sản phẩm vào giỏ hàng!", error);
//                 let errorMessage = 'Có lỗi xảy ra khi thêm sản phẩm vào giỏ hàng!';
//                 if (error.response && error.response.data) {
//                     errorMessage = error.response.data; // Hoặc xử lý tùy theo yêu cầu
//                 }
//                 // Hiển thị thông báo lỗi
//                 Swal.fire({
//                     icon: 'error',
//                     title: 'Lỗi',
//                     text: errorMessage,
//                     confirmButtonColor: '#d33',
//                 });
//             });
//     };
    
//     const getFullImageUrl = (fileName) => {
//         if (!fileName) return null;
//         return `http://localhost:5222/api/sanpham${fileName}`;
//     };

//     return (
//         <div>
//             <HeaderUser />
//             <div className="container mx-auto px-4 py-8">
//                 <header className="header-user">
//                     <Link to="/homepage" className="back-button">
//                         <div className="back-container">
//                             <IoIosArrowBack /> Trở về trang chủ
//                         </div>
//                     </Link>
//                 </header>
//                 <div className="flex flex-col md:flex-row">
//                     <div className="md:w-1/2 mb-8 md:mb-0">
//                         <img
//                             src={getFullImageUrl(product.hinhAnh)}
//                             alt={product.tenSanPham}
//                             className="w-4/5 h-auto object-cover rounded-lg shadow-lg"
//                         />
//                     </div>
//                     <div className="md:w-1/2 md:pl-8">
//                         <h1 className="text-3xl font-bold mb-4">{product.tenSanPham}</h1>
//                         <p className="text-2xl font-semibold mb-6">
//                             {parseInt(product.giaBan).toLocaleString('vi-VN')} VND/{product.donViTinh}
//                         </p>
//                         <p className="mb-6">{product.moTa}</p>
//                         <input 
//                             type="number" 
//                             value={quantity} 
//                             onChange={(e) => setQuantity(e.target.value)} 
//                             min="1"
//                             className="border rounded p-2 w-20 mb-4"
//                         />
//                         <div className="flex space-x-4 mb-6">
//                             <button
//                                 // onClick={handleBuyNow}
//                                 className="bg-green-500 text-white px-6 py-2 rounded-full hover:bg-green-600 transition-colors"
//                             >
//                                 Mua ngay
//                             </button>
//                             <button
//                                 onClick={handleAddToCart}
//                                 className="bg-blue-500 text-white px-6 py-2 rounded-full hover:bg-blue-600 transition-colors"
//                             >
//                                 Thêm vào giỏ hàng
//                             </button>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default ProductDetail;

// ProductsUser.jsx
import React, { useEffect, useState } from 'react';
import apiClient from '../../services/api';
import "../../styles/ProductFilter.css";

const ProductFilter = ({ selectedDanhMuc }) => {
  const [products, setProducts] = useState([]); // Khởi tạo state cho sản phẩm
  const [loading, setLoading] = useState(true); // Thêm state để quản lý trạng thái loading
  const [error, setError] = useState(null); // Thêm state để quản lý lỗi

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
              <div className="product-content">
              {product.hinhAnh ? ( // Kiểm tra xem sản phẩm có hình ảnh không
                <img 
                  src={getFullImageUrl(product.hinhAnh)} // Hiển thị hình ảnh
                  alt={product.tenSanPham}
                  className="product-image"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = '/duong/dan/den/anh/mac-dinh.jpg'; // Thêm ảnh mặc định
                  }}
                />
              ) : (
                <div className="no-image">Không có hình ảnh</div> // Hiển thị khi không có hình ảnh
              )}
                <span className="product-name">{product.tenSanPham}</span>
                <span className="product-price">{product.giaBan} VND</span>
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
