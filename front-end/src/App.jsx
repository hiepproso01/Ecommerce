import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Register from './screens/Register';
import Login from './screens/Login';
import Home from './components/Home';
import HeaderUser from './components/UserComponents/HeaderUser';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Category from './components/CategoryProducts/CategoryProductPage.jsx';
import HomePage from './screens/HomePage.jsx';
import './styles/Sidebar.css'; 
import apiClient from './services/api.js';
import ProductPage from './components/Products/ProductsPage.jsx';
import Supplier from './components/Supplier/Supplier.jsx';
import Customer from './components/Customer.jsx';
import CategoryUser from './components/UserComponents/CategoryUser.jsx';
import ProductsUser from './components/UserComponents/ProductsUser.jsx';
import CategogyGroupPage from './components/CategoryProducts/CategogyGroupPage.jsx';
import Cart from './components/UserComponents/Cart.jsx';
// import { ProductProvider } from './Context/ProductContext';
import ProductDetail from './components/UserComponents/ProductDetail.jsx';
function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);
  const [openSidebar, setOpenSidebar] = useState(false);
  const [userRole, setUserRole] = useState(null);
  const [products, setProducts] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);
  useEffect(() => {
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role');
    setIsLoggedIn(!!token);
    setUserRole(role);
    setIsInitialized(true);
  }, []);

  useEffect(() => {
    apiClient.get('api/sanpham/GetAll')
      .then(response => {
        setProducts(response.data);
      })
      .catch(error => {
        console.error("There was an error fetching the products!", error);
      });
  }, []);
  useEffect(() =>{
    apiClient.get('api/danhmucsp/GetAll')
    .then(response => {
      setProducts(response.data);
      setFilteredProducts(response.data);
    })
    .catch(error => {
      console.error("There was an error fetching the products!", error);
    });
},[]);

  if (!isInitialized) return <div>Loading...</div>;

  const toggleSidebar = () => {
    setOpenSidebar(!openSidebar);
  };

  const AuthenticatedLayout = ({ children }) => (
    <div className="flex h-screen">
      <Sidebar openSidebarToggle={openSidebar} OpenSidebar={toggleSidebar} />
      <div
        className={`flex-1 flex flex-col ${
          openSidebar ? 'content-open' : 'content-closed'
        }`}
      >
        <Header OpenSidebar={toggleSidebar} />
        <main className="flex-1 p-4 bg-white">
          {children}
        </main>
      </div>
    </div>
  );

  return (
    // <ProductProvider>
    <Router>
      <Routes>
        {!isLoggedIn ? (
          <>
            <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} setUserRole={setUserRole} />} />
            <Route path="/register" element={<Register />} />
            <Route path="*" element={<Navigate to="/login" replace />} />
          </>
        ) : userRole === "Admin" ? (
          <Route
            path="*"
            element={
              <AuthenticatedLayout>
                <Routes>
                  <Route path="/" element={<ProductPage />} />
                  <Route path='/product' element={<ProductPage />} />
                  <Route path="/category" element={<Category />} />
                  <Route path="/supplier" element={<Supplier />} />
                  <Route path="/customer" element={<Customer />} />
                  <Route path="/categorygroup" element={<CategogyGroupPage />} />
                  <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
              </AuthenticatedLayout>
            }
          />
        ) : (
          <>
            <Route path="/homepage" element={<HomePage />} />
            <Route path="/categoryuser" element={<CategoryUser />} />
            <Route path="/productsuser" element={<ProductsUser />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/product/:idSanPham" element={<ProductDetail />} />
            <Route path="*" element={<Navigate to="/homepage" replace />} />
          
          </>
        )}
      </Routes>
    </Router>
    // </ProductProvider>
  );
}

export default App;
