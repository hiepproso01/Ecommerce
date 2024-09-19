// import React, { useState, useEffect } from "react";
// import apiClient from '../../services/api';
// import { useParams } from 'react-router-dom';
// import HeaderUser from './HeaderUser';
// import "../../styles/ProductDetail.css";
// const ProductDetail = () => {
//     const { idSanPham } = useParams(); // Lấy idSanPham từ URL
//     const [product, setProduct] = useState(null);

//     useEffect(() => {
//         // Gọi API lấy chi tiết sản phẩm theo idSanPham
//         apiClient.get(`api/sanpham/GetById/${idSanPham}`)
//         .then(response => {
//             setProduct(response.data); // Lưu sản phẩm vào state
//         })
//         .catch(error => {
//             console.error("There was an error fetching the product details!", error);
//         });
//     }, [idSanPham]);

//     if (!product) {
//         return <p>Đang tải chi tiết sản phẩm...</p>;
//     }

//     return (
//         <div>
//         <HeaderUser />
//         <div className="product-detail">
//             <img src={product.hinhAnh} alt={product.tenSanPham} className="product-detail-image" />
//             <h3 className="product-detail-name">{product.tenSanPham}</h3>
//             <p className="product-detail-price">Giá: {parseInt(product.giaBan).toLocaleString('vi-VN')} VND</p>
//             <p className="product-detail-description">{product.moTa}</p>
//         </div>
//         </div>
//     );
// };

// export default ProductDetail;

