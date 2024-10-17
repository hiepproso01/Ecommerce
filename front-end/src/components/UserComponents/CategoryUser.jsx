// import React, { useState, useEffect } from 'react';
// import apiClient from '../../services/api';
// import "../../styles/CategoryUser.css";

// const CategoryUser = () => {
//   const [categoryProducts, setCategoryProducts] = useState([]);
//   const [filteredCategoryProducts, setFilteredCategoryProducts] = useState([]);
//   const [subCategories, setSubCategories] = useState({});

//   useEffect(() => {
//     // Lấy danh sách nhóm danh mục
//     apiClient.get('api/nhomdanhmuc/GetAll')
//       .then(response => {
//         setCategoryProducts(response.data);
//         setFilteredCategoryProducts(response.data);
//       })
//       .catch(error => {
//         console.error("There was an error fetching the products!", error);
//       });

//     // Lấy danh sách danh mục con
//     apiClient.get('api/danhmucsp/GetAll')
//       .then(response => {
//         const groupedCategories = response.data.reduce((acc, item) => {
//           // Gom nhóm danh mục con theo IDNhomDanhMuc
//           const { idNhomDanhMuc } = item;
//           if (!acc[idNhomDanhMuc]) {
//             acc[idNhomDanhMuc] = [];
//           }
//           acc[idNhomDanhMuc].push(item);
//           return acc;
//         }, {});
//         setSubCategories(groupedCategories);
//       })
//       .catch(error => {
//         console.error("There was an error fetching the subcategories!", error);
//       });
//   }, []);

//   const getFullImageUrl = (fileName) => {
//     if (!fileName) return null;
//     return `http://localhost:5222/api/nhomdanhmuc${fileName}`;
//   };

//   return (
//     <div className="category-sidebar">
//       <h3 className="category-title">Danh Mục Sản Phẩm</h3>
//       <ul className="category-list">
//         {filteredCategoryProducts.map((categoryProduct) => (
//           <li key={categoryProduct.idNhomDanhMuc} className="category-item">
//             <div className="category-content">
//               {categoryProduct.hinhAnhNhomDanhMuc ? (
//                 <img 
//                   src={getFullImageUrl(categoryProduct.hinhAnhNhomDanhMuc)}
//                   alt={categoryProduct.tenNhomDanhMuc}
//                   className="category-image"
//                   onError={(e) => {
//                     e.target.onerror = null;
//                     e.target.src = '/duong/dan/den/anh/mac-dinh.jpg'; // Thêm ảnh mặc định
//                   }}
//                 />
//               ) : (
//                 <div className="no-image">Không có hình ảnh</div>
//               )}
//               <span className="category-name">{categoryProduct.tenNhomDanhMuc}</span>
//             </div>

//             {/* Hiển thị danh mục con */}
//             <ul className="subcategory-list">
//               {subCategories[categoryProduct.idNhomDanhMuc] ? (
//                 subCategories[categoryProduct.idNhomDanhMuc].map((subCategory) => (
//                   <li key={subCategory.idDanhMuc} className="subcategory-item">
//                     <span>{subCategory.tenDanhMuc}</span>
//                   </li>
//                 ))
//               ) : (
//                 <li className="subcategory-item">Không có danh mục con</li>
//               )}
//             </ul>
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

  return (
    <div className="category-sidebar">
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
  );
};

export default CategoryUser;
