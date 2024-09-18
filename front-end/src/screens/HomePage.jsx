import React, { useState } from 'react'
import HeaderUser from '../components/UserComponents/HeaderUser';
import CategoryUser from '../components/UserComponents/CategoryUser';
import ProductsUser from '../components/UserComponents/ProductsUser';
// import { ProductProvider } from '../Context/ProductContext';
const HomePage = () => {
  const [products, setProducts] = useState([]);



  return (
    // <ProductProvider>
    <div>

      <HeaderUser />
      <CategoryUser />
      <ProductsUser />

    </div>
    // </ProductProvider>
  )
}

export default HomePage