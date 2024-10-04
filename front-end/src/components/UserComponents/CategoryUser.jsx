// import React, { useState, useEffect } from 'react';
// import apiClient from '../../services/api';
// import "../../styles/CategoryUser.css"; // Đảm bảo đường dẫn CSS

// const CategoryUser = () => {
//   const [categoryProducts, setCategoryProducts] = useState([]);
//   const [filteredCategoryProducts, setFilteredCategoryProducts] = useState([]);

//   useEffect(() => {
//     apiClient.get('api/nhomdanhmuc/GetAll')
//       .then(response => {
//         setCategoryProducts(response.data);
//         setFilteredCategoryProducts(response.data);
//       })
//       .catch(error => {
//         console.error("There was an error fetching the products!", error);
//       });
//   }, []);

//   return (
//     <div className="category-sidebar">
//       <h3 className="category-title">Danh Mục Sản Phẩm</h3>
//       <ul className="category-list">
//         {filteredCategoryProducts.map((categoryProduct) => (
//           <li key={categoryProduct.idNhomDanhMuc} className="category-item">
//             <div className="category-content">
//               <img 
//                 src={categoryProduct.hinhAnhNhomDanhMuc}
//                 alt={categoryProduct.tenNhomDanhMuc}
//                 className="category-image"
//               />
//               <span className="category-name">{categoryProduct.tenNhomDanhMuc}</span>
//             </div>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default CategoryUser;
import React, { useState, useEffect } from 'react';
import apiClient from '../../services/api';
import "../../styles/CategoryUser.css";

const CategoryUser = () => {
  const [categoryProducts, setCategoryProducts] = useState([]);
  const [filteredCategoryProducts, setFilteredCategoryProducts] = useState([]);
  const [subCategories, setSubCategories] = useState({});
  const [openCategory, setOpenCategory] = useState(null);

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

  // Hàm để đóng/mở menu dropdown của danh mục cha
  const handleToggle = (idNhomDanhMuc) => {
    setOpenCategory(openCategory === idNhomDanhMuc ? null : idNhomDanhMuc);
  };

  return (
    <div className="category-sidebar">
      <h3 className="category-title">Danh Mục Sản Phẩm</h3>
      <ul className="category-list">
        {filteredCategoryProducts.map((categoryProduct) => (
          <li key={categoryProduct.idNhomDanhMuc} className="category-item">
            <div className="category-content" onClick={() => handleToggle(categoryProduct.idNhomDanhMuc)}>
              <img 
                src={categoryProduct.hinhAnhNhomDanhMuc}
                alt={categoryProduct.tenNhomDanhMuc}
                className="category-image"
              />
              <span className="category-name">{categoryProduct.tenNhomDanhMuc}</span>
            </div>

            {/* Hiển thị danh mục con nếu nhấn vào danh mục cha */}
            {openCategory === categoryProduct.idNhomDanhMuc && (
              <ul className="subcategory-list">
                {subCategories[categoryProduct.idNhomDanhMuc] ? (
                  subCategories[categoryProduct.idNhomDanhMuc].map((subCategory) => (
                    <li key={subCategory.idDanhMuc} className="subcategory-item">
                      <span>{subCategory.tenDanhMuc}</span>
                    </li>
                  ))
                ) : (
                  <li className="subcategory-item">Không có danh mục con</li>
                )}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CategoryUser;
