// import React from 'react';
// import HeaderUser from '../components/UserComponents/HeaderUser';
// import CategoryUser from '../components/UserComponents/CategoryUser';
// import ProductsUser from '../components/UserComponents/ProductsUser';
// import '../styles/HomePage.css'; 

// const HomePage = () => {
//   return (
//     <div className="home-page" style={{backgroundColor: 'rgb(245, 245, 245)'}}>
//       <HeaderUser />
//       <div className="main-content">
//         <div className="sidebar1">
//           <CategoryUser />
//         </div>
//         <div className="content-container">
//           <ProductsUser />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default HomePage;


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
      <div className="main-content">
        <div className="sidebar1">
          <CategoryUser onSelectCategory={handleCategorySelect} /> {/* Truyền hàm onSelectCategory vào */}
        </div>
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
