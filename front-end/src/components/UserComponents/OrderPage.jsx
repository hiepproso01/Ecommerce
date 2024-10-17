import React, { useState, useEffect } from 'react';
import apiClient from '../../services/api';
import '../../styles/OrderPage.css'; // Make sure to import your CSS file here

const OrderPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState(null); // State for the selected order

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await apiClient.get('/api/donhang/GetAll');
        setOrders(response.data);
      } catch (error) {
        console.error('Error fetching orders:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);
  const handleStatusChange = async (orderId, newStatus) => {
    try {
      await apiClient.put(`api/DONHANG/UpdateStatus/${orderId}`, { trangThai: newStatus });
      setOrders(prevOrders => 
        prevOrders.map(order => order.idDonHang === orderId ? { ...order, trangThai: newStatus } : order)
      );
    } catch (error) {
      console.error("Error updating order status:", error);
    }
  };
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
  return (
    <div>
      <h1>Danh sách đơn hàng</h1>
      {orders.length === 0 ? (
        <p>Không có đơn hàng nào.</p>
      ) : (
        <div className='table'>
        <table>
          <thead>
            <tr>
              <th>Mã đơn hàng</th>
              <th>Tên khách hàng</th>
              <th>Ngày đặt hàng</th>
              {/* <th>Địa chỉ</th> */}
              <th>Tổng tiền</th>
              <th>Trạng thái</th>
              <th>Hành động</th> {/* Added action column */}
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.idDonHang}>
                <td>{order.idDonHang}</td>
                <td>{order.tenNguoiDung}</td>
                <td>{formatDate(order.ngayDatHang)}</td>
                {/* <td>{order.address}</td> */}
                <td>{order.tongTien}</td>
                {/* <td>{order.trangThai}</td> */}
                <td>
                    <select 
                      value={order.trangThai} 
                      onChange={(e) => handleStatusChange(order.idDonHang, e.target.value)}
                    >
                      <option value="Đang xử lý">Đang xử lý</option>
                      <option value="Đã nhận đơn">Đã nhận đơn</option>
                      <option value="Đang giao">Đang giao</option>
                      <option value="Giao thành công">Giao thành công</option>
                    </select>
                  </td>
                <td>
                  <div className='btn-watch'>
                  <button onClick={() => handleViewDetails(order)}>Xem</button> {/* View button */}
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
            <button onClick={() => setSelectedOrder(null)} >Đóng</button> {/* Close button */}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default OrderPage;
