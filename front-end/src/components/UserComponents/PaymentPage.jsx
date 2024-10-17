import React, { useState, useEffect } from 'react'
import HeaderUser from './HeaderUser.jsx'
import { Link } from 'react-router-dom'
import { IoIosArrowBack } from 'react-icons/io'
import "../../styles/PaymentPage.css"
import apiClient from '../../services/api.js'
import momo from '../../img/MoMo_Logo.png'
import visa from '../../img/visa.webp'
import mastercard from '../../img/Mastercard-logo.svg.png'
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const PaymentPage = () => {
    const navigate = useNavigate();
    const [cart, setCart] = useState([]);
    const [userInfo, setUserInfo] = useState(null);
    const [discountCode, setDiscountCode] = useState('');
    const [paymentMethod, setPaymentMethod] = useState('momo');

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
    };

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
              console.log("Cart items:", userItems);

              // Lấy thông tin người dùng từ item đầu tiên trong giỏ hàng
              if (userItems.length > 0) {
                const firstItem = userItems[0];
                setUserInfo({
                  tenNguoiDung: firstItem.tenNguoiDung,
                  address: firstItem.address,
                  phoneNumber: firstItem.phoneNumber
                });
              }
            })
            .catch(error => {
              console.error("There was an error fetching the cart!", error);
            });
        }
    }, []);
    const handlePaymentMethodChange = (e) => {
        setPaymentMethod(e.target.value);
    };

    const getFullImageUrl = (fileName) => {
        if (!fileName) return null;
        return `http://localhost:5222/api/sanpham${fileName}`;
    };

    const calculateTotal = () => {
        return formatCurrency(cart.reduce((total, item) => total + (item.soLuong * parseFloat(item.giaBan)), 0));
    };

    const handleApplyDiscount = () => {
        // Xử lý áp dụng mã giảm giá
        console.log("Áp dụng mã giảm giá:", discountCode);
    };
    function randomId() {
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let id = '';
        for (let i = 0; i < 20; i++) {
            id += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return id;
    }
    function randomId1() {
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let id = '';
        for (let i = 0; i < 20; i++) {
            id += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return id;
    }

    const handlePaymentConfirmation = async () => {
        try {
            const orderDetails = cart.map(item => ({
                idChiTietDonHang: randomId(),
                // idDonHang: randomId(),
                idSanPham: item.idSanPham,
                tenSanPham: item.tenSanPham,
                soLuong: item.soLuong,
                idNguoiDung: localStorage.getItem('id'),
                tenNguoiDung: userInfo?.tenNguoiDung || '',
                address: userInfo?.address || '',
                phoneNumber: userInfo?.phoneNumber || '',
                // idGioHang: localStorage.getItem('idGioHang'),
                giaBan: item.giaBan,
                hinhAnh: item.hinhAnh,
                thanhTien:calculateTotal(),
 }));

          
           
            const orderData = {
                donHang:{
                    idDonHang: randomId1(),
                    idNguoiDung: localStorage.getItem('id'),
                    tenNguoiDung: userInfo?.tenNguoiDung || '',
                    address: userInfo?.address || '',
                    ngayDatHang: new Date().toISOString(),
                    phoneNumber: userInfo?.phoneNumber || '',
                    tongTien: calculateTotal(),
                    trangThai: "Đang xử lý",
                    chitietdonhang: orderDetails
                }
                
            };
            console.log("Order data being sent:", orderData);
            const response = await apiClient.post('api/DONHANG/Create', orderData);
            // const response = await apiClient.post('api/CHITIETDONHANG/Payment', orderDetails);
            
            if (response.status === 201 || response.status === 200) {
                console.log("Chi tiết đơn hàng đã được lưu thành công");

                // Delete all items from the cart for the current user
                const userId = localStorage.getItem('id');
                await apiClient.delete(`api/CHITIETGIOHANG/DeleteAllForUser/${userId}`);

                setCart([]);
                await Swal.fire({
                    icon: 'success',
                    title: 'Thanh toán thành công!',
                    text: 'Cảm ơn bạn đã mua hàng.',
                    confirmButtonColor: '#3085d6',
                });
                navigate('/homepage'); // Redirect to homepage or order confirmation page
            } else {
                console.error("Có lỗi xảy ra khi lưu chi tiết đơn hàng");
            }
        } catch (error) {
            let errorMessage = 'Có lỗi xảy ra khi tạo đơn hàng!';
            if (error.response && error.response.data) {
                if (typeof error.response.data === 'string') {
                    errorMessage = error.response.data;
                } else if (typeof error.response.data === 'object') {
                    errorMessage = JSON.stringify(error.response.data, null, 2);
                }
            }
            
            console.error("Lỗi khi gửi yêu cầu lưu chi tiết đơn hàng:", errorMessage);
            Swal.fire({
                icon: 'error',
                title: 'Lỗi',
                text: errorMessage,
                confirmButtonColor: '#d33',
              });
          
        }
    };
    const handleBack = () => {
        navigate(-1);
    };
    return (
        <div>
            <HeaderUser/>
            <div className='payment-container'>
                <header className="header-user">
                    <div className="back-button" onClick={handleBack}>
                        <div className="back-container"><IoIosArrowBack/>Trở về trang chủ</div>
                    </div>
                </header>
                {/* <h1 className="payment-title">Thanh toán</h1> */}
                <div className="payment-content">
                    <div className="order-info">
                        <h2>Thông tin đơn hàng</h2>
                        <div className="product-list-container">
                            <div className="product-header">
                                <span>Hình ảnh</span>
                                <span>Sản phẩm</span>
                                <span>Số lượng</span>
                                <span>Đơn giá</span>
                            </div>
                            <div className="product-list">
                                {cart.map((item) => (
                                    <div key={item.idSanPham} className="product-item2">
                                        <img src={getFullImageUrl(item.hinhAnh)} alt={item.tenSanPham} />
                                        <span>{item.tenSanPham}</span>
                                        <span>{item.soLuong}</span>
                                        <span>{formatCurrency(parseFloat(item.giaBan))}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="order-total">
                            <p>Tổng cộng: {calculateTotal()}</p>
                        </div>
                        <div className="discount-code">
                            <input 
                                type="text" 
                                placeholder="Mã giảm giá" 
                                value={discountCode}
                                onChange={(e) => setDiscountCode(e.target.value)}
                            />
                            <button onClick={handleApplyDiscount}>Áp dụng</button>
                        </div>
                    </div>
                    <div className="payment-info">
                        <h2>Thông tin thanh toán</h2>
                        <input type="text" placeholder="Tên" value={userInfo?.tenNguoiDung || ''} readOnly />
                        <input type="text" placeholder="Địa chỉ" value={userInfo?.address || ''} readOnly />
                        <input type="text" placeholder="Số điện thoại" value={userInfo?.phoneNumber || ''} readOnly />
                        <div className="payment-method">
                            <div className='payment-option'>
                            <input 
                                type="radio" 
                                id="momo" 
                                name="paymentMethod" 
                                value="momo"
                                checked={paymentMethod === 'momo'}
                                onChange={handlePaymentMethodChange}
                            />
                           <img src={momo} alt="MoMo" className="payment-icon" />
                            </div>
                            <div className='payment-option'>
                            <input 
                                type="radio" 
                                id="visa" 
                                name="paymentMethod" 
                                value="visa"
                                checked={paymentMethod === 'visa'}
                                onChange={handlePaymentMethodChange}
                            />
                            <img src={visa} alt="Visa" className="payment-icon" />
                            </div>
                            <div className='payment-option'>
                            <input 
                                type="radio" 
                                id="mastercard" 
                                name="paymentMethod" 
                                value="mastercard"
                                checked={paymentMethod === 'mastercard'}
                                onChange={handlePaymentMethodChange}
                            />
                           
                            <img src={mastercard} alt="Mastercard" className="payment-icon" />
                            </div>
                        </div>
                        <button className="confirm-payment" onClick={handlePaymentConfirmation}>
                            Xác nhận thanh toán
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PaymentPage
