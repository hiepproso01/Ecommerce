import React,{useState,useEffect} from 'react';
import apiClient from '../../services/api';

import "../../styles/ProductsUser.css";
const ProductsUser = () => {
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
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
    
    return (
           <div className="products-container">
            {products.length > 0 ? (
                products.map(product => (
                    <div key={product.id} className="product-card">
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


