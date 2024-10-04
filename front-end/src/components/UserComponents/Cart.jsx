import React, { useState, useEffect } from 'react';
import apiClient from '../../services/api'; // Đảm bảo bạn đã import đúng service để gọi API
import "../../styles/Cart.css"; // Thêm file CSS nếu muốn tùy chỉnh
import HeaderUser from './HeaderUser';
import { Link } from 'react-router-dom';
import { IoIosArrowBack } from "react-icons/io";
const Cart = () => {
  const [cart, setCart] = useState([]); // Khởi tạo mảng trống cho giỏ hàng

  useEffect(() => {
    // Gọi API để lấy danh sách giỏ hàng từ server
    apiClient.get('api/CHITIETGIOHANG/GetAll')
      .then(response => {
        setCart(response.data); // Lưu dữ liệu vào state cart
      })
      .catch(error => {
        console.error("There was an error fetching the products!", error);
      });
  }, []);

  return (
    <div>
       <HeaderUser />
    
    <div className="cart-container">
    <header className="header-user">
                <Link to="/homepage" className="back-button"><div className="back-container"><IoIosArrowBack/>Trở về trang chủ</div>
            </Link>
                </header>
      <h1>Giỏ Hàng</h1>
      {cart.length === 0 ? (
        <p className="empty-cart-message">Không có sản phẩm trong giỏ hàng.</p>
      ) : (
        <table className="cart-table">
          <thead>
            <tr>
              <th>Tên Sản Phẩm</th>
              <th>Số Lượng</th>
              <th>Đơn Giá</th>
              <th>Thành Tiền</th>
            </tr>
          </thead>
          <tbody>
            {/* Duyệt qua từng sản phẩm trong giỏ hàng */}
            {cart.map((item) => (
              <tr key={item.id}>
                <td>{item.tenSanPham}</td>
                <td>{item.soLuong}</td>
                <td>{item.donGia}</td>
                <td>{item.soLuong * item.donGia}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
    </div>
  );
};

export default Cart;
