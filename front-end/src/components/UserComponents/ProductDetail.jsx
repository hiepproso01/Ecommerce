import React, { useState, useEffect } from "react";
import apiClient from '../../services/api';
import { useParams,Link } from 'react-router-dom';
import '../../styles/ProductDetail.css';
import HeaderUser from './HeaderUser';
import { IoIosArrowBack } from "react-icons/io";
const ProductDetail = () => {
    const { idSanPham } = useParams();
    const [product, setProduct] = useState(null);
    const [cartItems, setCartItems] = useState(0);
  
    useEffect(() => {
        apiClient.get(`api/sanpham/GetById/${idSanPham}`)
            .then(response => {
                setProduct(response.data);
            })
            .catch(error => {
                console.error("Error fetching product details!", error);
            });
    }, [idSanPham]);

    if (!product) {
        return <p>Loading product details...</p>;
    }

    const handleAddToCart = () => {
        setCartItems(cartItems + 1);
    };
    const handleBack = () => {
        navigate(-1);
    };
    const handleBuyNow = () => {
        // Logic for buying the product
        console.log("Buying product:", product.tenSanPham);
    };

    return (
        <div>
            <HeaderUser />
          
            <div className="container mx-auto px-4 py-8">
           
                <header className="header-user">
                <Link to="/homepage" className="back-button"><div className="back-container"><IoIosArrowBack/>Trở về trang chủ</div>
            </Link>
                </header>

                <div className="flex flex-col md:flex-row">

                    <div className="md:w-1/2 mb-8 md:mb-0">
                        <img
                            src={product.hinhAnh}
                            alt={product.tenSanPham}
                            className="w-4/5 h-auto object-cover rounded-lg shadow-lg"
                        />
                    </div>


                    <div className="md:w-1/2 md:pl-8">
                        <h1 className="text-3xl font-bold mb-4">{product.tenSanPham}</h1>
                        <p className="text-2xl font-semibold mb-6">
                            {parseInt(product.giaBan).toLocaleString('vi-VN')} VND
                        </p>

                        <p className="mb-6">{product.moTa}</p>


                        <div className="flex space-x-4 mb-6">
                            <button
                                onClick={handleBuyNow}
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
