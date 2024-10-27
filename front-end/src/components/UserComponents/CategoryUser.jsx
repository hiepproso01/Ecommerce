import React, { useState, useEffect } from 'react';
import apiClient from '../../services/api';
import "../../styles/CategoryUser.css";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import img1 from "../../img/anime-eyes-illustration1.jpg";
import img2 from "../../img/anime-eyes-illustration(2).jpg";
import img3 from "../../img/anime-eyes-illustration(1).jpg";
import img4 from "../../img/10942784.png";
const CategoryUser = ({ onSelectCategory }) => { // Nhận props onSelectCategory
  const [categoryProducts, setCategoryProducts] = useState([]);
  const [filteredCategoryProducts, setFilteredCategoryProducts] = useState([]);
  const [subCategories, setSubCategories] = useState({});

  useEffect(() => {
    // Lấy danh sách nhóm danh mục
    apiClient.get('api/nhomdanhmuc/GetAll')
      .then(response => {
        setCategoryProducts(response.data);
        setFilteredCategoryProducts(response.data);
      })
      .catch(error => {
        console.error("There was an error fetching the products!", error);
      });

    // Lấy danh sách danh mục con
    apiClient.get('api/danhmucsp/GetAll')
      .then(response => {
        const groupedCategories = response.data.reduce((acc, item) => {
          // Gom nhóm danh mục con theo IDNhomDanhMuc
          const { idNhomDanhMuc } = item;
          if (!acc[idNhomDanhMuc]) {
            acc[idNhomDanhMuc] = [];
          }
          acc[idNhomDanhMuc].push(item);
          return acc;
        }, {});
        setSubCategories(groupedCategories);
      })
      .catch(error => {
        console.error("There was an error fetching the subcategories!", error);
      });
  }, []);

  const getFullImageUrl = (fileName) => {
    if (!fileName) return null;
    return `http://localhost:5222/api/nhomdanhmuc${fileName}`;
  };

  const handleSubCategorySelect = (idDanhMuc) => {
    onSelectCategory(idDanhMuc); // Gọi hàm onSelectCategory với idDanhMuc
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
    <div className="category-sidebar">
       {/* <div className='img123'>
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
        </div> */}
        <div style={{marginTop:'-50px'}}>
      <h3 className="category-title">Danh Mục Sản Phẩm</h3>
      <ul className="category-list">
        {filteredCategoryProducts.map((categoryProduct) => (
          <li key={categoryProduct.idNhomDanhMuc} className="category-item">
            <div className="category-content">
              {categoryProduct.hinhAnhNhomDanhMuc ? (
                <img 
                  src={getFullImageUrl(categoryProduct.hinhAnhNhomDanhMuc)}
                  alt={categoryProduct.tenNhomDanhMuc}
                  className="category-image"
                  onError={(e) => {
                    e.target.onerror = null;
                    // e.target.src = '/duong/dan/den/anh/mac-dinh.jpg';
                  }}
                />
              ) : (
                <div className="no-image">Không có hình ảnh</div>
              )}
              <span className="category-name">{categoryProduct.tenNhomDanhMuc}</span>
            </div>

            {/* Hiển thị danh mục con */}
            <ul className="subcategory-list">
              {subCategories[categoryProduct.idNhomDanhMuc] ? (
                subCategories[categoryProduct.idNhomDanhMuc].map((subCategory) => (
                  <li key={subCategory.idDanhMuc} className="subcategory-item" onClick={() => handleSubCategorySelect(subCategory.idDanhMuc)}>
                    <span>{subCategory.tenDanhMuc}</span>
                  </li>
                ))
              ) : (
                <li className="subcategory-item">Không có danh mục con</li>
              )}
            </ul>
          </li>
        ))}
      </ul>
      </div>
    </div>
  );
};

export default CategoryUser;
