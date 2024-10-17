import React, { useState, useEffect } from "react";
import apiClient from '../../services/api';
import { useParams, Link, useNavigate } from 'react-router-dom';
import '../../styles/ProductDetail.css';
import HeaderUser from './HeaderUser';
import { IoIosArrowBack } from "react-icons/io";
import Swal from 'sweetalert2'; 

const ProductDetail = () => {
    const { idSanPham } = useParams();
    const [product, setProduct] = useState(null);
    const [quantity, setQuantity] = useState(1); // Thêm trạng thái cho số lượng
    const navigate = useNavigate();
    const [cartId, setCartId] = useState(null);
    const [userInfo, setUserInfo] = useState(null);
    
    useEffect(() => {
        apiClient.get(`api/sanpham/GetById/${idSanPham}`)
            .then(response => {
                setProduct(response.data);
            })
            .catch(error => {
                console.error("Error fetching product details!", error);
            });

        
        const cartId = localStorage.getItem('idGioHang');
        if (cartId) {
            setCartId(cartId);
        }

        const userId = localStorage.getItem('id');
        if (userId) {
            apiClient.get('api/NGUOIDUNG/GetAll')
                .then(response => {
                    const users = response.data;
                    const currentUser = users.find(user => user.id === userId);
                    if (currentUser) {
                        setUserInfo({
                            tenNguoiDung: currentUser.tenNguoiDung,
                            address: currentUser.address,
                            phoneNumber: currentUser.phoneNumber
                        });
                    }
                })
                .catch(error => {
                    console.error("Error fetching user information!", error);
                });
        }
    }, [idSanPham]);

    if (!product) {
        return <p>Loading product details...</p>;
    }
 

    
    const getFullImageUrl = (fileName) => {
        if (!fileName) return null;
        return `http://localhost:5222/api/sanpham${fileName}`;
    };

    const handleAddToCart = () => {
        const cartId = localStorage.getItem('idGioHang');
        console.log("Thông tin sản phẩm:", {
            idGioHang: cartId,
            idNguoiDung: localStorage.getItem('id'),
            idSanPham: product.idSanPham,
            tenSanPham: product.tenSanPham,
            soLuong: quantity,
            giaBan: product.giaBan,
            hinhAnh: product.hinhAnh
        });

        if (!cartId) {
            Swal.fire({
                icon: 'error',
                title: 'Lỗi',
                text: 'Không tìm thấy giỏ hàng của bạn. Vui lòng đăng nhập lại.',
                confirmButtonColor: '#d33',
            });
            return;
        }
        function randomId() {
            const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
            let id = '';
            for (let i = 0; i < 20; i++) {
                id += chars.charAt(Math.floor(Math.random() * chars.length));
            }
            return id;
        }
        const cartItem = {
            idChiTietGioHang: randomId(),
            idGioHang: cartId,
            idNguoiDung: localStorage.getItem('id'),
            idSanPham: product.idSanPham,
            tenSanPham: product.tenSanPham,
            soLuong: quantity,
            giaBan: product.giaBan,
            hinhAnh: product.hinhAnh,
            tenNguoiDung: userInfo?.tenNguoiDung,
            address: userInfo?.address,
            phoneNumber: userInfo?.phoneNumber
        };

        apiClient.post('api/CHITIETGIOHANG/AddToCart', [cartItem])
            .then(response => {
                Swal.fire({
                    icon: 'success',
                    title: 'Thành công',
                    text: 'Sản phẩm đã được thêm vào giỏ hàng!',
                    confirmButtonColor: '#3085d6',
                });
            })
            .catch(error => {
                console.error("Có lỗi xảy ra khi thêm sản phẩm vào giỏ hàng!", error);
                let errorMessage = 'Có lỗi xảy ra khi thêm sản phẩm vào giỏ hàng!';
                if (error.response && error.response.data) {
                    errorMessage = typeof error.response.data === 'string' 
                        ? error.response.data 
                        : JSON.stringify(error.response.data, null, 2);
                }
                Swal.fire({
                    icon: 'error',
                    title: 'Lỗi',
                    text: errorMessage,
                    confirmButtonColor: '#d33',
                });
            });
    };

    return (
        <div>
            <HeaderUser />
            <div className="container mx-auto px-4 py-8">
                <header className="header-user">
                    <Link to="/homepage" className="back-button">
                        <div className="back-container">
                            <IoIosArrowBack /> Trở về trang chủ
                        </div>
                    </Link>
                </header>
                <div className="flex flex-col md:flex-row">
                    <div className="md:w-1/2 mb-8 md:mb-0">
                        <img
                            src={getFullImageUrl(product.hinhAnh)}
                            alt={product.tenSanPham}
                            className="w-4/5 h-auto object-cover rounded-lg shadow-lg"
                        />
                    </div>
                    <div className="md:w-1/2 md:pl-8">
                        <h1 className="text-3xl font-bold mb-4">{product.tenSanPham}</h1>
                        <p className="text-2xl font-semibold mb-6">
                            {parseInt(product.giaBan).toLocaleString('vi-VN')} VND/{product.donViTinh}
                        </p>
                        <p className="mb-6">{product.moTa}</p>
                        <input 
                            type="number" 
                            value={quantity} 
                            onChange={(e) => setQuantity(e.target.value)} 
                            min="1"
                            className="border rounded p-2 w-20 mb-4"
                        />
                        <div className="flex space-x-4 mb-6">
                            <button
                                // onClick={handleBuyNow}
                                className="bg-green-500 text-white px-6 py-2 rounded-full hover:bg-green-600 transition-colors"
                            >
                                Mua ngay
                            </button>
                            <button
                                onClick={handleAddToCart}
                                className="bg-blue-500 text-white px-6 py-2 rounded-full hover:bg-blue-600 transition-colors"
                            >
                                Thêm vào giỏ hàng
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetail;
