import React,{useState,useEffect} from 'react';
import apiClient from '../../services/api';
import { useNavigate } from 'react-router-dom';
import "../../styles/ProductsUser.css";
import CategoryUser from './CategoryUser';

const ProductsUser = () => {
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [selectedProducts, setSelectedProduct] = useState("");
    const navigate = useNavigate();
    useEffect(() =>{
        console.log('Current cookies:', document.cookie);
        console.log(document.cookie); 
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
    const getFullImageUrl = (fileName) => {
        if (!fileName) return null;
        return `http://localhost:5222/api/sanpham${fileName}`;
      };
    
    return (
           <div style={{display:'flex',justifyContent:'center',padding:0,margin:0,flexDirection:'column',alignItems:'center'}}>
        <div className='img123'></div>
        <div className="products-container1">
            {products.length > 0 ? (
                products.map(product => (
                    <div key={product.idSanPham} className="product-card" onClick={() => handleProductClick(product.idSanPham)}>
                        <img src={getFullImageUrl(product.hinhAnh)} alt={product.tenSanPham} className="product-image" />
                        <h3 className="product-name">{product.tenSanPham}</h3>
                        <p className="product-price">Giá: {parseInt(product.giaBan).toLocaleString('vi-VN')} VND</p>
                    </div>
                ))
            ) : (
                <p>Không có sản phẩm nào.</p>
            )}
        </div>
        </div>
    );
}

export default ProductsUser;


