import React, { useState, useEffect } from 'react';
import apiClient from '../../services/api';
import '../../styles/StatusPage.css'; // Make sure to import your CSS file here
import Swal from 'sweetalert2';
import HeaderUser from './HeaderUser';

const StatusPage = ({ idDonHang, onUpdate }) => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  // Sử dụng một object để lưu trữ trạng thái của từng đơn hàng theo ID
  const [statusByOrder, setStatusByOrder] = useState({});
  const [selectedOrder, setSelectedOrder] = useState(null);
  
  useEffect(() => {
    const fetchOrders = async () => {
        const userId = localStorage.getItem('id'); // Lấy idNguoiDung từ localStorage
        console.log("idNguoiDung",userId)
      try {
        const response = await apiClient.get('/api/donhang/GetAll');
        const allOrders = response.data;

        // Lọc đơn hàng theo idNguoiDung
        const filteredOrders = allOrders.filter(order => order.idNguoiDung === userId);
        setOrders(filteredOrders);

        // Khởi tạo trạng thái của tất cả đơn hàng
        const initialStatus = filteredOrders.reduce((acc, order) => {
          acc[order.idDonHang] = order.trangThai;
          return acc;
        }, {});
        setStatusByOrder(initialStatus);

      } catch (error) {
        console.error('Error fetching orders:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString('vi-VN', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const handleViewDetails = (order) => {
    setSelectedOrder(order); // Set the selected order when "View" is clicked
  };

  const getFullImageUrl = (fileName) => {
    if (!fileName) return null;
    return `http://localhost:5222/api/sanpham${fileName}`;
  };

  const handleUpdateStatus = async (order) => {
    console.log("ID Đơn Hàng:", order.idDonHang);

    try {
      await apiClient.put(`api/DONHANG/ChangeStatus/${order.idDonHang}`, {
        trangThai: statusByOrder[order.idDonHang], // Lấy trạng thái hiện tại của đơn hàng
        idDonHang: order.idDonHang,
        address: order.address, // Gán thêm địa chỉ từ order
        hinhAnh: order.hinhAnh, // Gán hình ảnh từ order
        tongTien: order.tongTien, // Gán tổng tiền từ order
        idNguoiDung: order.idNguoiDung, // Gán ID người dùng từ order
        phoneNumber: order.phoneNumber, // Gán số điện thoại người dùng từ order
        tenNguoiDung: order.tenNguoiDung, // Gán tên người dùng từ order
      });
      if (onUpdate) {
        onUpdate();
      }
      Swal.fire({
        icon: 'success',
        title: 'Cập nhật thành công',
        text: 'Trạng thái đơn hàng đã được cập nhật thành công!',
        confirmButtonColor: '#3085d6',
      });
    } catch (error) {
      console.error("There was an error updating the product!", error);
      let errorMessage = 'Có lỗi xảy ra khi cập nhật trạng thái!';
      if (error.response && error.response.data) {
        if (typeof error.response.data === 'string') {
          errorMessage = error.response.data;
        } else if (typeof error.response.data === 'object') {
          errorMessage = JSON.stringify(error.response.data, null, 2);
        }
      }
      Swal.fire({
        icon: 'error',
        title: 'Lỗi',
        text: errorMessage,
        confirmButtonColor: '#d33',
      });
    }
  };

  const handleCancelOrder = async (order) => {
    try {
      await apiClient.put(`api/DONHANG/ChangeStatus/${order.idDonHang}`, {
        trangThai: 'Đã hủy', // Cập nhật trạng thái thành "Đã hủy"
        idDonHang: order.idDonHang,
        address: order.address, // Gán thêm địa chỉ từ order
        hinhAnh: order.hinhAnh, // Gán hình ảnh từ order
        tongTien: order.tongTien, // Gán tổng tiền từ order
        idNguoiDung: order.idNguoiDung, // Gán ID người dùng từ order
        phoneNumber: order.phoneNumber, // Gán số điện thoại người dùng từ order
        tenNguoiDung: order.tenNguoiDung, // Gán tên người dùng từ order
      });
      // Cập nhật trạng thái trong state
      setStatusByOrder((prevStatus) => ({
        ...prevStatus,
        [order.idDonHang]: 'Đã hủy',
      }));
      Swal.fire({
        icon: 'success',
        title: 'Hủy đơn hàng thành công',
        text: 'Trạng thái đơn hàng đã được cập nhật thành "Đã hủy".',
        confirmButtonColor: '#3085d6',
      }).then(() => {
        window.location.reload(); // Reload lại trang sau khi hiển thị thông báo
      });
    } catch (error) {
      console.error("There was an error canceling the order!", error);
      Swal.fire({
        icon: 'error',
        title: 'Lỗi',
        text: 'Có lỗi xảy ra khi hủy đơn hàng!',
        confirmButtonColor: '#d33',
      });
    }
  };

  const handleResetOrder = async (order) => {
    try {
      await apiClient.put(`api/DONHANG/ChangeStatus/${order.idDonHang}`, {
        trangThai: 'Đang xử lý', // Cập nhật trạng thái thành "Đang giao"
        idDonHang: order.idDonHang,
        address: order.address, // Gán thêm địa chỉ từ order
        hinhAnh: order.hinhAnh, // Gán hình ảnh từ order
        tongTien: order.tongTien, // Gán tổng tiền từ order
        idNguoiDung: order.idNguoiDung, // Gán ID người dùng từ order
        phoneNumber: order.phoneNumber, // Gán số điện thoại người dùng từ order
        tenNguoiDung: order.tenNguoiDung, // Gán tên người dùng từ order
      });
      // Cập nhật trạng thái trong state
      setStatusByOrder((prevStatus) => ({
        ...prevStatus,
        [order.idDonHang]: 'Đang xử lý',
      }));
      Swal.fire({
        icon: 'success',
        title: 'Đặt lại đơn hàng thành công',
        text: 'Trạng thái đơn hàng đã được cập nhật thành "Đang xử lý".',
        confirmButtonColor: '#3085d6',
      }).then(() => {
        window.location.reload(); // Reload lại trang sau khi hiển thị thông báo
      });
    } catch (error) {
      console.error("There was an error resetting the order!", error);
      Swal.fire({
        icon: 'error',
        title: 'Lỗi',
        text: 'Có lỗi xảy ra khi đặt lại đơn hàng!',
        confirmButtonColor: '#d33',
      });
    }
  };

  return (
    <div>
        <HeaderUser/>
        <div className="cart-container">
      <h1>Danh sách đơn hàng</h1>
      {loading ? (
        <p>Đang tải...</p>
      ) : orders.length === 0 ? (
        <p>Không có đơn hàng nào.</p>
      ) : (
        <div className='table'>
          <table>
            <thead>
              <tr>
                <th>Mã đơn hàng</th>
                <th>Tên khách hàng</th>
                <th>Ngày đặt hàng</th>
                <th>Tổng tiền</th>
                <th>Trạng thái</th>
                <th>Hành động</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.idDonHang}>
                  <td>{order.idDonHang}</td>
                  <td>{order.tenNguoiDung}</td>
                  <td>{formatDate(order.ngayDatHang)}</td>
                  <td>{order.tongTien}</td>
                  <td>{order.trangThai}</td>
                  <td>
                    <div className='btn-watch'>
                      <button onClick={() => handleViewDetails(order)}>Xem</button>
                      {statusByOrder[order.idDonHang] === 'Đã hủy' || statusByOrder[order.idDonHang] === 'Đã giao' ? (
                        <button onClick={() => handleResetOrder(order)}>Đặt lại</button> // Nút đặt lại khi đã hủy hoặc đã giao
                      ) : (
                        <button className={statusByOrder[order.idDonHang] === 'Đang giao' ? 'cancelled-button' : ''} onClick={() => handleCancelOrder(order)}>
                          Hủy hàng
                        </button> // Nút hủy hàng, tô màu xám khi đang giao
                      )}
                      
                    </div>
                  </td>
                  
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Modal with overlay */}
      {selectedOrder && (
        <>
          <div className="modal1-overlay" onClick={() => setSelectedOrder(null)}></div>
          <div className="modal1">
            <h2>Chi tiết đơn hàng: {selectedOrder.idDonHang}</h2>
            <p>Khách hàng: {selectedOrder.tenNguoiDung}</p>
            <p>Tổng tiền: {selectedOrder.tongTien}</p>
            <p>Địa chỉ: {selectedOrder.address}</p>
            <p>Ngày đặt hàng: {formatDate(selectedOrder.ngayDatHang)}</p>

            <h3>Sản phẩm:</h3>
            <div className='table'>
              <table>
                <thead>
                  <tr>
                    <th>Mã sản phẩm</th>
                    <th>Tên sản phẩm</th>
                    <th>Số lượng</th>
                    <th>Đơn giá</th>
                    <th>Hình ảnh</th>
                  </tr>
                </thead>
                <tbody>
                  {selectedOrder.chitietdonhang.map((item) => (
                    <tr key={item.idChiTietDonHang}>
                      <td>{item.idSanPham}</td>
                      <td>{item.tenSanPham}</td>
                      <td>{item.soLuong}</td>
                      <td>{item.giaBan}</td>
                      <td>
                        <img src={getFullImageUrl(item.hinhAnh)} alt={item.tenSanPham} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="btn-close">
              <button onClick={() => setSelectedOrder(null)}>Đóng</button>
            </div>
          </div>
        </>
      )}
      </div>
    </div>
  );
};

export default StatusPage;
