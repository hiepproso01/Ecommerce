import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Register.css";
import { Player } from '@lottiefiles/react-lottie-player';
import animation from "../img/Animation.json"
import apiClient from "../services/api";
const Register = () => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [tenAdmin, setTenAdmin] = useState('');
  const [position, setPosition] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await apiClient.post('/api/admin/register', {
        username: username,
        password: password,
        email: email,
        tenAdmin: tenAdmin,
        position: position,
        phoneNumber: phoneNumber,
      });
      if (response.status === 200) {
        Swal.fire({
          icon: 'success',
          title: 'Đăng ký thành công!',
          showConfirmButton: false,
          timer: 1500
        });
        navigate('/login');
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Đăng ký thất bại!',
          text: 'Vui lòng thử lại.',
        });
      }

    } catch (error) {
      console.error('Error registering:', error);
    }
  };

  const handleLoginRedirect = () => {
    navigate('/login');
  };

  return (
    <div className="wrapper">
    <div className="form-container">
      <form onSubmit={handleRegister}>
        <h2 className="welcome-text">Đăng ký</h2>
        <div className="input-field">
          <input 
            type="text" 
            required 
            value={username} 
            onChange={(e) => setUsername(e.target.value)} 
          />
          <label htmlFor="username" className="input-label" style={{fontWeight:'bold'}}>Tài khoản</label>
        </div>
        <div className="input-field">
          <input 
            type="password" 
            required 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
          />
          <label htmlFor="password" className="input-label" style={{fontWeight:'bold'}}>Mật khẩu</label>
        </div>
        <div className="input-field">
          <input 
            type="email" 
            required 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
          />
          <label htmlFor="email" className="input-label" style={{fontWeight:'bold'}}>Email</label>
        </div>
        
        <div className="input-field">
          <input 
            type="text" 
            required 
            value={phoneNumber} 
            onChange={(e) => setPhoneNumber(e.target.value)} 
          />
          <label htmlFor="phoneNumber" className="input-label" style={{fontWeight:'bold'}}>Số điện thoại</label>
        </div>
        <div className="input-field">
          <input 
            type="text" 
            required 
            value={tenAdmin} 
            onChange={(e) => setTenAdmin(e.target.value)} 
          />
          <label htmlFor="tenAdmin" className="input-label" style={{fontWeight:'bold'}}>Họ và tên</label>
        </div>
        <div className="input-field">
          <input 
            type="text" 
            required 
            value={position} 
            onChange={(e) => setPosition(e.target.value)} 
          />
          <label htmlFor="position" className="input-label" style={{fontWeight:'bold'}}>Vị trí</label>
        </div>
        <div className="button-group" style={{ display: 'flex', justifyContent: 'space-between' }}>
          <button type="submit" className="btn-submit">
            <span>Đăng Ký</span>
          </button>
          <button type="button" className="btn-register" onClick={handleLoginRedirect}>
            <span>Đăng Nhập</span>
          </button>
        </div>
      </form>
    </div>
    <div className="logo">
      <div className="animation">
        <Player
          autoplay
          loop
          src={animation}
          style={{ height: '300px', width: '300px', marginLeft:10 }}
        />
      </div>
    </div>
  </div>


    
  );
};

export default Register;