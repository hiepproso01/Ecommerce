// import React,{useState,useEffect} from 'react';
// import apiClient from '../../services/api';
// import "../../styles/CategoryUser.css";
// const CategoryUser = () => {    
//     const [products, setProducts] = useState([]);
//     const [filteredProducts, setFilteredProducts] = useState([]);
//     useEffect(() =>{
//         apiClient.get('api/danhmucsp/GetAll')
//         .then(response => {
//           setProducts(response.data);
//           setFilteredProducts(response.data);
//         })
//         .catch(error => {
//           console.error("There was an error fetching the products!", error);
//         });
//     },[]);
//     return (
//         <div>
//             <select id="productSelect">
//                 {filteredProducts.map(product => (
//                     <option key={product.id} value={product.id}>
//                         {product.tenDanhMuc}
//                     </option>
//                 ))}
//             </select>
//         </div>
//     );

// }
// export default CategoryUser;

import React, { useState, useEffect } from 'react';
import apiClient from '../../services/api';
import "../../styles/CategoryUser.css"; // Đảm bảo đường dẫn CSS

const CategoryUser = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    apiClient.get('api/danhmucsp/GetAll')
      .then(response => {
        setProducts(response.data);
        setFilteredProducts(response.data);
      })
      .catch(error => {
        console.error("There was an error fetching the products!", error);
      });
  }, []);

  return (
    <div className="category-sidebar">
      <h3 className="category-title">Danh Mục Sản Phẩm</h3>
      <ul className="category-list">
        {filteredProducts.map((product) => (
          <li key={product.id} className="category-item">
            {product.tenDanhMuc}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CategoryUser;
