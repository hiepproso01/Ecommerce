import React, { useState, useEffect, useRef } from 'react';
import { BsFillBellFill, BsFillEnvelopeFill, BsPersonCircle, BsSearch, BsJustify } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import '../styles/Header.css'; 
import apiClient from '../services/api'; // Import apiClient đã cấu hình

function Header({ OpenSidebar, openSidebarToggle }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);
  const [userName, setUserName] = useState('');

  // const handleSearchChange = (e) => {
  //   setSearchQuery(e.target.value);
  // };
    // Lấy tenAdmin từ localStorage khi component Header render lần đầu
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
    <header className={`header ${openSidebarToggle ? 'shifted' : ''}`}>
      <div className='flex-center'>
        <BsJustify 
          className='header-icon' 
          onClick={OpenSidebar} 
        />
      </div>
      <div className='user-profile'>
        <BsPersonCircle
          className='user-icon'
          onClick={() => setShowDropdown(!showDropdown)}
        />
        <span className="username">{userName}</span>
        {showDropdown && (
          <div className='dropdown-menu'>
            <button onClick={handleLogout}>
              Đăng xuất
            </button>
          </div>
        )}
      </div>
    </header>
  );
}

export default Header;
