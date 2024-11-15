import React, { useState, useEffect,useRef } from 'react'
import HeaderUser from './HeaderUser.jsx'
import { Link } from 'react-router-dom'
import { IoIosArrowBack } from 'react-icons/io'
import "../../styles/PaymentPage.css"
import apiClient from '../../services/api.js'
import momo from '../../img/MoMo_Logo.png'
import visa from '../../img/visa.webp'
import mastercard from '../../img/Mastercard-logo.svg.png'
import zalopay from "../../img/images.png"
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import emailjs from '@emailjs/browser';
import axios from 'axios';
const PaymentPage = () => {
    const navigate = useNavigate();
    const [cart, setCart] = useState([]);
    const [userInfo, setUserInfo] = useState(null);
    const [discountCode, setDiscountCode] = useState('');
    const [paymentMethod, setPaymentMethod] = useState('momo');
    const [amount, setAmount] = useState(0);
    const [loading, setLoading] = useState(false);
    const form = useRef();
    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
    };

    useEffect(() => {
        const idGioHang = localStorage.getItem('idGioHang');
        const id = localStorage.getItem('id');
        const email = localStorage.getItem('email');
        console.log("idGioHang:", idGioHang);
        console.log("id:", id);
        console.log("email:", email);
     
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
                  phoneNumber: firstItem.phoneNumber,
                  email: email,
                });
              }
            })
            .catch(error => {
              console.error("There was an error fetching the cart!", error);
            });
        } setAmount(calculateTotal());
    },  [cart]);
    const handlePaymentMethodChange = (e) => {
        setPaymentMethod(e.target.value);
    };
    const getFullImageUrl = (fileName) => {
        if (!fileName) return null;
        return `http://localhost:5222/api/sanpham${fileName}`;
    };

    const calculateTotal = () => {
        return cart.reduce((total, item) => total + (item.soLuong * parseFloat(item.giaBan)), 0);
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
            setLoading(true);
    
            // Tạo chi tiết đơn hàng
            const orderDetails = cart.map(item => ({
                idChiTietDonHang: randomId(),
                idSanPham: item.idSanPham,
                tenSanPham: item.tenSanPham,
                soLuong: item.soLuong,
                idNguoiDung: localStorage.getItem('id'),
                tenNguoiDung: userInfo?.tenNguoiDung || '',
                address: userInfo?.address || '',
                phoneNumber: userInfo?.phoneNumber || '',
                giaBan: item.giaBan,
                hinhAnh: item.hinhAnh,
                thanhTien: (item.soLuong * parseFloat(item.giaBan)).toString(),
            }));
            const productListHtml = cart.map(item => `
                            <tr>
                                <td>${item.tenSanPham}</td>
                              <td>${item.soLuong}</td>
                              <td>${formatCurrency(item.giaBan)}</td>
                          </tr>
                       `).join('');
                
            // Kiểm tra và đảm bảo donHang không thiếu
            const orderData = {
                donHang: {
                    idDonHang: randomId1(),
                    idNguoiDung: localStorage.getItem('id'),
                    tenNguoiDung: userInfo?.tenNguoiDung || '',
                    email: userInfo?.email || '',
                    address: userInfo?.address || '',
                    ngayDatHang: new Date().toISOString(),
                    phoneNumber: userInfo?.phoneNumber || '',
                    tongTien: calculateTotal().toString(),  // Chuyển thành chuỗi
                    trangThai: "Đang xử lý",
                    chitietdonhang: orderDetails
                }
            };
    //  Chuẩn bị dữ liệu để gửi qua emailjs
        const emailData = {
            to_name: userInfo?.tenNguoiDung || '',
            to_email: userInfo?.email || '',
            user_address: userInfo?.address || '',
            user_phone: userInfo?.phoneNumber || '',
            order_total: calculateTotal(),
            product_list: productListHtml,
        };
        // Gửi email với thông tin đơn hàng qua EmailJS
        await emailjs.send('service_z73zgjf', 'template_05fy2ik',
        //      {
        //     to_name: userInfo?.tenNguoiDung || '',
        //     to_email: userInfo?.email || '',
        //     message: JSON.stringify(orderData, null, 2),
        // }, 
        emailData,
        'jjWxV1Q6jxT17zNHm');

        console.log("Email đã được gửi thành công");

            // Kiểm tra xem donHang đã được tạo đầy đủ chưa
            if (!orderData.donHang) {
                throw new Error("Trường donHang bị thiếu!");
            }
            const userId = localStorage.getItem('id');
            // Gửi yêu cầu POST để lưu đơn hàng
            await apiClient.post('/api/donhang/create', orderData);
           
            await apiClient.delete(`api/CHITIETGIOHANG/DeleteAllForUser/${userId}`);
           
            // Chuyển hướng đến trang /home
            // navigate('/home');
            // Hiển thị thông báo thành công
            // Swal.fire({
            //     icon: 'success',
            //     title: 'Thành công',
            //     text: 'Đơn hàng của bạn đã được tạo thành công!',
            //     confirmButtonColor: '#3085d6',
            // });
            let response;
            const amount = calculateTotal();
            
            if (paymentMethod === 'zalopay') {
                // Gọi API thanh toán ZaloPay
                response = await axios.post('http://localhost:3000/payment', { amount });
                const { order_url } = response.data;
                window.location.href = order_url;

            } else if (paymentMethod === 'momo') {
                // Gọi API thanh toán MoMo
                response = await axios.post('http://localhost:3001/payment', {amount});
                const {payUrl} = response.data;
                window.location.href = payUrl;
               
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
    
            // In chi tiết lỗi
            console.error('Lỗi khi thực hiện lưu đơn hàng:', error);
            console.log(errorMessage);  // Hiển thị chi tiết lỗi trên console
    
            // Hiển thị thông báo lỗi
            Swal.fire({
                icon: 'error',
                title: 'Lỗi',
                text: errorMessage,
                confirmButtonColor: '#d33',
            });
        } finally {
            setLoading(false);
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
                                        <span>{formatCurrency((item.giaBan))}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="order-total">
                            <p>Tổng cộng: {formatCurrency(calculateTotal())}</p>
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
                    <div className="payment-info" >
                        <form ref={form}>
                        <h2>Thông tin thanh toán</h2>
                        <input type="text" placeholder="Tên" value={userInfo?.tenNguoiDung || ''} readOnly name="to_name" />
                        <input type="text" placeholder="Địa chỉ" value={userInfo?.address || ''} readOnly />
                        <input type="text" placeholder="Số điện thoại" value={userInfo?.phoneNumber || ''} readOnly />
                        <input type="text" placeholder="Email" value={userInfo?.email || ''} readOnly name="to_email" />
                        </form>
                        <div className="payment-method">
                            <div className='payment-option'>
                            <input 
                                type="radio" 
                                id="momo" 
                               
                                value="momo"
                                checked={paymentMethod === 'momo'}
                                onChange={handlePaymentMethodChange}
                            />
                           <img src={momo} alt="MoMo" className="payment-icon" />
                            </div>
                            <div className='payment-option'>
                            <input 
                                type="radio" 
                                id="zalopay" 
                               
                                value="zalopay"
                                checked={paymentMethod === 'zalopay'}
                                onChange={handlePaymentMethodChange}
                            />
                            <img src={zalopay} alt="Zalopay" className="payment-icon" />
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
                        <br/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PaymentPage
