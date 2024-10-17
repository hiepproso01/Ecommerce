import React, { useState, useEffect } from 'react';
import apiClient from '../../services/api'; // Đảm bảo bạn đã import đúng service để gọi API
import "../../styles/Cart.css"; // Thêm file CSS nếu muốn tùy chỉnh
import HeaderUser from './HeaderUser';
import { Link } from 'react-router-dom';
import { IoIosArrowBack } from "react-icons/io";

const Cart = () => {
  const [cart, setCart] = useState([]); // Khởi tạo mảng trống cho giỏ hàng

  useEffect(() => {
    const idGioHang = localStorage.getItem('idGioHang');
    const id = localStorage.getItem('id');
    console.log("idGioHang:", idGioHang);
    console.log("id:", id);
    if (idGioHang && id) {
      apiClient.get(`api/CHITIETGIOHANG/GetAll`)
        .then(response => {
          const allItems = Array.isArray(response.data) ? response.data : [response.data];
          // Lọc các sản phẩm có IDNguoiDung trùng với id
          const userItems = allItems.filter(item => item.idNguoiDung === id);
          setCart(userItems);
        })
        .catch(error => {
          console.error("There was an error fetching the cart!", error);
        });
    }
  }, []);

  const getFullImageUrl = (fileName) => {
    if (!fileName) return null;
    return `http://localhost:5222/api/sanpham${fileName}`;
  };
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
  };
  const calculateTotal = () => {
    return formatCurrency(cart.reduce((total, item) => total + (item.soLuong * parseFloat(item.giaBan)), 0));
  };

  const handleDeleteItem = (idSanPham) => {
    apiClient.delete(`api/CHITIETGIOHANG/Delete/${idSanPham}`)
      .then(response => {
        console.log("Item deleted successfully:", response.data);
        // Cập nhật lại giỏ hàng sau khi xóa
        setCart(cart.filter(item => item.idSanPham !== idSanPham));
      })
      .catch(error => {
        console.error("Error deleting item:", error);
      });
  };

  return (
    <div>
      <HeaderUser />
      <div className="cart-container">
        <header className="header-user">
          <Link to="/homepage" className="back-button">
            <div className="back-container"><IoIosArrowBack/>Trở về trang chủ</div>
          </Link>
        </header>
        <h1>Giỏ Hàng</h1>
        {cart.length === 0 ? (
          <p className="empty-cart-message">Không có sản phẩm trong giỏ hàng.</p>
        ) : (
          <>
            <table className="cart-table">
              <thead>
                <tr>
                  <th>Hình Ảnh</th>
                  <th>Tên Sản Phẩm</th>
                  <th>Số Lượng</th>
                  <th>Đơn Giá</th>
                  <th>Thành Tiền</th>
                  <th>Xóa</th>
                </tr>
              </thead>
              <tbody>
                {cart.map((item) => (
                  <tr key={item.idSanPham}>
                    <td><img src={getFullImageUrl(item.hinhAnh)} alt={item.tenSanPham} /></td>
                    <td>{item.tenSanPham}</td>
                    <td>{item.soLuong}</td>
                    <td>{formatCurrency(parseFloat(item.giaBan))}</td>
                    <td>{formatCurrency(item.soLuong * parseFloat(item.giaBan))}</td>
                    <td>
                      <button onClick={() => handleDeleteItem(item.idSanPham)}>Xóa</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="cart-total">
              <strong>Tổng cộng: {calculateTotal()}</strong>
            </div>
            <Link to="/payment" className="payment-button">
              Thanh Toán
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default Cart;
