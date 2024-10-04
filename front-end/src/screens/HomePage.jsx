import React, { useState } from 'react';
import HeaderUser from '../components/UserComponents/HeaderUser';
import CategoryUser from '../components/UserComponents/CategoryUser';
import ProductsUser from '../components/UserComponents/ProductsUser';
import '../styles/HomePage.css'; // Thêm file CSS cho HomePage nếu cần

const HomePage = () => {
  const [products, setProducts] = useState([]);

  return (
    <div>
      <HeaderUser />
      {/* Đặt Sidebar vào layout bên trái */}
      <div className="content-container">
        <CategoryUser />
        <ProductsUser />
      </div>
    </div>
  );
};

export default HomePage;
