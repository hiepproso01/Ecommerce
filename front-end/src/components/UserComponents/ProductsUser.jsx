import React,{useState,useEffect} from 'react';
import apiClient from '../../services/api';
import { useNavigate } from 'react-router-dom';
import "../../styles/ProductsUser.css";
const ProductsUser = () => {
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [selectedProducts, setSelectedProduct] = useState("");
    const navigate = useNavigate();
    useEffect(() =>{
        apiClient.get('api/sanpham/GetAll')
        .then(response => {
          setProducts(response.data);
          setFilteredProducts(response.data);
        })
        .catch(error => {
          console.error("There was an error fetching the products!", error);
        });
    },[]);
    const handleProductClick = (idSanPham) => {
        console.log("idSanPham:", idSanPham); // Kiểm tra xem có lấy đúng idSanPham
        navigate(`/product/${idSanPham}`); // Điều hướng đến trang chi tiết sản phẩm
        // Gọi API khác sử dụng idSanPham
        apiClient.get(`api/sanpham/GetById/${idSanPham}`)
        .then(response => {
            console.log(response.data); // Kiểm tra phản hồi từ API
            setSelectedProduct(response.data); // Lưu trữ chi tiết sản phẩm
        })
        .catch(error => {
            console.error("There was an error fetching the product details!", error);
        });
    };
    
    return (
           <div className="products-container">
            {products.length > 0 ? (
                products.map(product => (
                    <div key={product.idSanPham} className="product-card" onClick={() => handleProductClick(product.idSanPham)}>
                        <img src={product.hinhAnh} alt={product.tenSanPham} className="product-image" />
                        <h3 className="product-name">{product.tenSanPham}</h3>
                        <p className="product-price">Giá: {parseInt(product.giaBan).toLocaleString('vi-VN')} VND</p>
                    </div>
                ))
            ) : (
                <p>Không có sản phẩm nào.</p>
            )}
        </div>
    );
}

export default ProductsUser;


