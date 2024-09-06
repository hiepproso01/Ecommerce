import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Register from './screens/Register';
import Login from './screens/Login';
import Home from './components/Home';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Category from './components/CategoryProducts/CategoryProductPage.jsx';
// import './styles/App.css';  
import './styles/Sidebar.css'; 
import apiClient from './services/api.js';
import ProductPage from './components/Products/ProductsPage.jsx';
import Supplier from './components/Supplier/Supplier.jsx';
function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);
  const [openSidebar, setOpenSidebar] = useState(false);
  const [products, setProducts] = useState([]);
  const [customers, setCustomers] = useState([]);
  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);
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
  // useEffect(() => {
  //   apiClient.get('api/taikhoan/GetAll')
  //     .then(response => {
  //       setCustomers(response.data);
  //     })
  //     .catch(error => {
  //       console.error("There was an error fetching the products!", error);
  //     });
  // }, []);

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
    <Router>
      <Routes>
        {!isLoggedIn ? (
          <>
            <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
            <Route path="/register" element={<Register />} />
            <Route path="*" element={<Navigate to="/login" replace />} />
          </>
        ) : (
          <Route
            path="*"
            element={
              <AuthenticatedLayout>
                <Routes>
                  <Route path="/" element={<ProductPage />} />
                  <Route path='/product' element={<ProductPage />} />
                  <Route path="/category" element={<Category  />} />
                  <Route path="/supplier" element={<Supplier  />} />
                  <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
              </AuthenticatedLayout>
            }
          />
        )}
      </Routes>
    </Router>
  );
}

export default App;
