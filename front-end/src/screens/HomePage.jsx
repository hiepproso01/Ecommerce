import React, { useState } from 'react';
import HeaderUser from '../components/UserComponents/HeaderUser';
import CategoryUser from '../components/UserComponents/CategoryUser';
import ProductsUser from '../components/UserComponents/ProductsUser';
import ProductFilter from '../components/UserComponents/ProductFilter'; // Import thêm ProductFilter
import '../styles/HomePage.css'; 

const HomePage = () => {
  const [selectedCategory, setSelectedCategory] = useState(null); // State lưu idDanhMuc được chọn

  // Hàm xử lý khi chọn danh mục trong CategoryUser
  const handleCategorySelect = (danhMuc) => {
    setSelectedCategory(danhMuc); // Cập nhật idDanhMuc được chọn
  };

  return (
    <div className="home-page" style={{ backgroundColor: 'rgb(245, 245, 245)' }}>
      <HeaderUser />
      <div className="img1234">
      </div>
      <div className="main-content">
        <div className="sidebar1">
          <CategoryUser onSelectCategory={handleCategorySelect} /> 
        </div>
         {/* <CategoryUser onSelectCategory={handleCategorySelect} />  */}
        <div className="content-container">
          {/* Hiển thị ProductFilter nếu có selectedCategory, ngược lại hiển thị ProductsUser */}
          {selectedCategory ? (
            <ProductFilter selectedDanhMuc={selectedCategory} />
          ) : (
            <ProductsUser />
          )}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
