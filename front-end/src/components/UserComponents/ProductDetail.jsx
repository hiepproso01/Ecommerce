import React, { useState, useEffect } from "react";
import apiClient from '../../services/api';
import { useParams } from 'react-router-dom';
import HeaderUser from './HeaderUser';
import '../../styles/ProductDetail.css';

const ProductDetail = () => {
    const { idSanPham } = useParams(); 
    const [product, setProduct] = useState(null);

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

    return (
        <div>
             <HeaderUser />
        <div className="product-detail-container">
           
            <main className="product-main">
                <section className="product-info">
                    <div className="product-images">
                        <img src={product.hinhAnh} alt={product.tenSanPham} className="main-image" />
                        <div className="product-thumbnails">
                            {/* Add product thumbnails here */}
                            <img src={product.hinhAnh} alt="variation" className="thumbnail" />
                        </div>
                    </div>

                    <div className="product-details">
                        <h2>{product.tenSanPham}</h2>
                        <p className="product-price">
                            {parseInt(product.giaBan).toLocaleString('vi-VN')} VND
                        </p>
                        {/* <div className="product-rating">★ ★ ★ ★ ☆ (77 reviews)</div> */}
                        <p className="product-description">
                            {product.moTa}
                        </p>

                        <div className="product-options">
                            {/* <label htmlFor="size">Size</label>
                            <select id="size">
                                <option>Small</option>
                                <option>Medium</option>
                                <option>Large</option>
                            </select> */}

                            <button className="btn-add-to-cart">Add to Cart</button>
                            <button className="btn-buy-now">Buy Now</button>
                        </div>
                    </div>
                </section>

                {/* Product Tabs */}
                {/* <section className="product-tabs">
                    <div className="tab">
                        <input type="radio" id="tab1" name="tab" defaultChecked />
                        <label htmlFor="tab1">Detail</label>
                        <div className="tab-content">
                            <p>SKU: {product.sku}</p>
                            <p>Upper Material: Leather</p>
                            <p>Sole Material: Synthetic</p>
                        </div>
                    </div>
                    <div className="tab">
                        <input type="radio" id="tab2" name="tab" />
                        <label htmlFor="tab2">Return Policy</label>
                        <div className="tab-content">
                            <p>30-day return policy.</p>
                        </div>
                    </div>
                    <div className="tab">
                        <input type="radio" id="tab3" name="tab" />
                        <label htmlFor="tab3">Delivery Info</label>
                        <div className="tab-content">
                            <p>Free delivery for orders over 500,000 VND.</p>
                        </div>
                    </div>
                </section> */}
            </main>
        </div>
        </div>
    );
};

export default ProductDetail;

