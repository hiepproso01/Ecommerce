import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Login.css";
import { Player } from '@lottiefiles/react-lottie-player';
import animation from "../img/Animation2.json"
import apiClient from "../services/api";
import Swal from "sweetalert2";
const Login = ({ setIsLoggedIn, setUserRole }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null); 
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await apiClient.post('/api/admin/login', {
        username: username,
        password: password,
        rememberMe: true 
      });
      if (response.status === 200) {
        const { token, user } = response.data;
        localStorage.setItem('token', token); 
        localStorage.setItem('user', JSON.stringify(user.tenNguoiDung));
        localStorage.setItem('role', user.role);
        setIsLoggedIn(true);
        setUserRole(user.role);  // Set user role in App component state
        
        console.log("User role:", user.role); // Debugging line
  
        Swal.fire({
          icon: 'success',
          title: 'Đăng nhập thành công!',
          showConfirmButton: false,
          timer: 1500
        });
  
        if (user.role === "Admin") {
          navigate('/product');
        } else if (user.role === "NguoiDung") {
          navigate('/homepage');
        } 
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Đăng nhập thất bại!',
          showConfirmButton: false,
          timer: 1500
        });
      }
    } catch (error) {
      if (error.response) {
        setError(`Lỗi: ${error.response.data.message || 'Đã xảy ra lỗi. Vui lòng thử lại.'}`);
      } else {
        setError('Đã xảy ra lỗi. Vui lòng kiểm tra kết nối mạng.');
      }
      Swal.fire({
        icon: 'error',
        title: 'Lỗi đăng nhập',
        text: error.message || 'Đã xảy ra lỗi. Vui lòng thử lại.',
      });
    }
  }
  
 

  const handleRegisterRedirect = () => {
    navigate('/register');
  };
  // Đăng nhập bằng phím Enter
  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      handleButtonClick();
    }
  };
  return (
    <div className="wrapper1">
      <div className="form-wrapper1">
        <form onSubmit={handleLogin}>
          <h2 className="welcome-text">Đăng nhập</h2>
          {error && <p className="error-message">{error}</p>}
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
          <div className="button-group1" style={{ display: 'flex', justifyContent: 'space-between' }}>
            <button type="submit" className="btn-submit1" onKeyDown={handleKeyDown}>
              <span>Đăng Nhập</span>
            </button>
            <button type="button" className="btn-register1" onClick={handleRegisterRedirect}>
              <span>Đăng Ký</span>
            </button>
          </div>
        </form>
      </div>
      <div className="img">
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

export default Login;
