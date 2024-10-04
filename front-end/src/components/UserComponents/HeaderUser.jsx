import React, { useState, useEffect, useRef } from 'react';
import { BsFillBellFill, BsFillEnvelopeFill, BsPersonCircle, BsSearch, BsJustify,BsCart2 } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import '../../styles/HeaderUser.css'; 
import apiClient from '../../services/api'; 

const HeaderUser = ({ OpenSidebar, openSidebarToggle }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);
  const [userName, setUserName] = useState('');
  const navigate = useNavigate();
    useEffect(() => {
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        const parsedUser = JSON.parse(storedUser);
        setUserName(parsedUser);
      }
    }, []);

  // Xử lý đăng xuất
  const handleLogout = () => {
    Swal.fire({
      title: 'Bạn có chắc chắn muốn thoát?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Có, đăng xuất!',
      cancelButtonText: 'Không, ở lại',
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.removeItem('token');
        localStorage.removeItem('user'); 
        localStorage.removeItem('role');
        window.location.reload();
      }
    });
  };

  // Xử lý submit tìm kiếm
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    console.log('Searching for:', searchQuery);
  };
  const handleCartClick = () => {
    navigate('/cart'); // Điều hướng đến trang giỏ hàng 
  };
  // Xử lý click ngoài dropdown để đóng
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className='header0'>
    <header className={`header1 ${openSidebarToggle ? 'shifted' : ''}`}>
      <div className='user-profile'>
     <div style={{marginRight:15}}>
     <BsCart2   onClick={handleCartClick} style={{ cursor: 'pointer' }}/>
     </div>
        <BsPersonCircle
          className='user-icon'
          onClick={() => setShowDropdown(!showDropdown)}
        />
        <span className="username">{userName}</span>
        {showDropdown && (
          <div className='dropdown-menu1'>
            <button onClick={handleLogout}>
             Chỉnh sửa thông tin
            </button>
            <button onClick={handleLogout}>
              Đăng xuất
            </button>
          </div>
        )}
      </div>
    </header>
    </div>
  );
}

export default HeaderUser;
