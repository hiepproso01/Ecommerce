import React, { useState, useEffect } from "react";
import HeaderUser from "./HeaderUser";
import "../../styles/Feedback.css";
import Swal from 'sweetalert2';
import apiClient from '../../services/api';  // Dịch vụ gọi API

const Feedback = () => {
    const [hinhAnhPhanHoi, setHinhAnhPhanHoi] = useState("");
    const [imagePreview, setImagePreview] = useState("");
    const [noiDung, setNoiDung] = useState("");
    const userInfo = JSON.parse(localStorage.getItem('userInfo')); // Lấy thông tin người dùng từ localStorage
    const [tenNguoiDung, setTenNguoiDung] = useState(userInfo ? userInfo.tenNguoiDung : ""); // Lấy tên người dùng
    const [email, setEmail] = useState(userInfo ? userInfo.email : ""); // Lấy email người dùng
    const idNguoiDung = localStorage.getItem('id') || ""; 
    console.log ()
    // Hàm lấy danh sách người dùng
    const fetchUserName = async () => {
        try {
            const response = await apiClient.get('api/NGUOIDUNG/GetAll');
            const users = response.data;  // Giả sử API trả về mảng người dùng
            const currentUser = users.find(user => user.id === idNguoiDung);  // Tìm người dùng có ID trùng khớp
            if (currentUser) {
                setTenNguoiDung(currentUser.tenNguoiDung);  // Giả sử tên người dùng nằm trong trường 'ten'
                console.log("Tên người dùng:", currentUser.tenNguoiDung);  // In tên người dùng ra console
                setEmail(currentUser.email);
                console.log("Email", currentUser.email);
            }
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    };

    useEffect(() => {
        fetchUserName();  // Gọi hàm khi component mount
    }, [idNguoiDung]);  // Chạy lại khi idNguoiDung thay đổi

    function randomId() {
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let id = '';
        for (let i = 0; i < 20; i++) {
            id += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return id;
    }

    const handleSubmitFeedback = async (e) => {
        e.preventDefault();
        try {
            await apiClient.post('api/phanhoi/Create', {
                idNguoiDung: idNguoiDung,
                idPhanHoi: randomId(),
                tenNguoiDung: tenNguoiDung,
                email: email,
                noiDung: noiDung,
                hinhAnhPhanHoi: hinhAnhPhanHoi
            });
            Swal.fire('Thành công!', 'Phản hồi của bạn đã được gửi.', 'success');
        } catch (e) {
            console.log("Error fetching", e);
            Swal.fire('Lỗi!', 'Đã có lỗi xảy ra khi gửi phản hồi.', 'error');
        }
    };

    const getFullImageUrl = (fileName) => {
        if (!fileName) return null;
        return `http://localhost:5222/api/phanhoi${fileName}`;
    };

    const handleImageChange = async (e) => {
        const file = e.target.files[0];
        if (file) {
            const formData = new FormData();
            formData.append('file', file);
            try {
                const response = await apiClient.post('/api/phanhoi/UploadImageFeedback', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                });
                setHinhAnhPhanHoi(response.data);
                setImagePreview(getFullImageUrl(response.data));
            } catch (error) {
                console.error('Error uploading image:', error);
                Swal.fire('Lỗi!', 'Đã có lỗi xảy ra khi tải lên hình ảnh.', 'error');
            }
        }
    };

    

    return (
        <div>
            <HeaderUser />
            <div className="feedback-container">
                <div className="feedback-content">
                    <p className="feedback-text">Gửi phản hồi</p>
                    <form className="feedback-form" onSubmit={handleSubmitFeedback}>
                        <div>
                            <label>Tên người dùng:</label>
                            <input
                                type="text"
                                name="tenNguoiDung"
                                value={tenNguoiDung}
                                readOnly 
                            />
                        </div>
                        <div>
                            <label>Email:</label>
                            <input
                                type="email"
                                name="email"
                                value={email}
                                readOnly
                            />
                        </div>
                        <div>
                            <label>Nội dung phản hồi:</label>
                            <textarea
                                name="noiDung"
                                value={noiDung}
                                onChange={(e) => setNoiDung(e.target.value)}  
                                required
                            />
                        </div>
                        <div>
                            <label>Hình ảnh phản hồi (URL):</label>
                            <input
                                type="file"  
                                name="hinhAnhPhanHoi"
                                onChange={handleImageChange}  
                            />
                            {imagePreview && (  
                                <img src={imagePreview} alt="Preview" />
                            )}
                        </div>
                        <button type="submit">Gửi phản hồi</button>
                    </form>
                </div>
            </div>
        </div>
    );
    
};

export default Feedback;
