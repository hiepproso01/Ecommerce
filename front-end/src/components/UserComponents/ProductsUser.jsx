import React,{useState,useEffect} from 'react';
import apiClient from '../../services/api';
import { useNavigate } from 'react-router-dom';
import "../../styles/ProductsUser.css";
import CategoryUser from './CategoryUser';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import img1 from "../../img/anime-eyes-illustration1.jpg";
import img2 from "../../img/anime-eyes-illustration(2).jpg";
import img3 from "../../img/anime-eyes-illustration(1).jpg";
import img4 from "../../img/10942784.png";
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
      const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000,
        arrows: true,
      
      };
    return (
     <div style={{display:'flex',justifyContent:'center',padding:0,margin:0,flexDirection:'column',alignItems:'center'}}>
        <div className='img123'>
            <div className='slider-container'>
                <Slider {...settings}>
                    <div className="slider-slide">
                        <img src={img1} alt="Slide 1" className="slider-image" />
                        <div className="slider-caption">Anime Eyes Illustration</div>
                    </div>
                    <div className="slider-slide">
                        <img src={img2} alt="Slide 2" className="slider-image" />
                        <div className="slider-caption">Caption for Slide 2</div>
                    </div>
                    <div className="slider-slide">
                        <img src={img3} alt="Slide 3" className="slider-image" />
                        <div className="slider-caption">Caption for Slide 3</div>
                    </div>
                    <div className="slider-slide">
                        <img src={img4} alt="Slide 3" className="slider-image" />
                        <div className="slider-caption">Caption for Slide 3</div>
                    </div>
                </Slider>
            </div>
        </div>
        <div className="products-container">
            {products.length > 0 ? (
                products.map(product => (
                    <div key={product.idSanPham} className="product-card" onClick={() => handleProductClick(product.idSanPham)}>
                        <img src={getFullImageUrl(product.hinhAnh)} alt={product.tenSanPham} className="product-image" />
                        <h3 className="product-name">{product.tenSanPham}</h3>
                        <p className="product-price">{parseInt(product.giaBan).toLocaleString('vi-VN')} VND</p>
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
