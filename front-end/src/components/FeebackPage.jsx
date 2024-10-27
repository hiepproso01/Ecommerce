import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import apiClient from "../services/api";

const FeedbackPage = () => {
    const [feedbacks, setFeedbacks] = useState([]);
    const [selectedFeedback, setSelectedFeedback] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await apiClient.get("/api/phanhoi/GetAll");
                setFeedbacks(response.data);
            } catch (error) {
                console.log("Failed to fetch product data", error);
            }
        };
        fetchData();
    }, []);

    const getFullImageUrl = (fileName) => {
        if (!fileName) return null;
        return `http://localhost:5222/api/phanhoi${fileName}`;
    };

    const handleDelete = async (id) => {
        const result = await Swal.fire({
            title: 'Bạn có chắc chắn?',
            text: 'Bạn sẽ không thể hoàn tác điều này!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Vâng, xoá nó đi!'
        });

        if (result.isConfirmed) {
            try {
                await apiClient.delete(`/api/phanhoi/Delete/${id}`);
                setFeedbacks(feedbacks.filter(feedback => feedback.idPhanHoi !== id));
                Swal.fire('Đã xoá!', 'Phản hồi đã được xoá.', 'success');
            } catch (error) {
                console.error('Lỗi khi xoá phản hồi:', error);
                Swal.fire('Lỗi!', 'Đã có lỗi xảy ra khi xoá phản hồi.', 'error');
            }
        }
    };

    const handleViewDetails = (feedback) => {
        setSelectedFeedback(feedback);
    };

    const handleCloseModal = () => {
        setSelectedFeedback(null);
    };

    return (
        <div>
            <h1>Feedback Page</h1>
            <ul>
                {feedbacks.map((feedback) => (
                    <li key={feedback.idPhanHoi} style={{ borderBottom: "1px solid #ccc", padding: "10px 0" }}>
                        <h3><strong>Tên Khách hàng: </strong>{feedback.tenNguoiDung}</h3>
                        <p><strong>Email:</strong> {feedback.email}</p>
                        <p><strong>Ngày phản hồi:</strong> {new Date(feedback.ngayPhanHoi).toLocaleDateString()}</p>
                        <button
                            onClick={() => handleViewDetails(feedback)}
                            style={{
                                marginRight: "10px",
                                padding: "5px 10px",
                                backgroundColor: "#3085d6",
                                color: "#fff",
                                border: "none",
                                borderRadius: "4px",
                                cursor: "pointer"
                            }}
                        >
                            Xem mô tả
                        </button>
                        <button
                            onClick={() => handleDelete(feedback.idPhanHoi)}
                            style={{
                                padding: "5px 10px",
                                backgroundColor: "#d33",
                                color: "#fff",
                                border: "none",
                                borderRadius: "4px",
                                cursor: "pointer"
                            }}
                        >
                            Xóa
                        </button>
                    </li>
                ))}
            </ul>

            {/* Modal for Viewing Details */}
            {selectedFeedback && (
                <div
                    style={{
                        position: "fixed",
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        backgroundColor: "rgba(0, 0, 0, 0.5)",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center"
                    }}
                >
                    <div
                        style={{
                            backgroundColor: "#fff",
                            padding: "20px",
                            borderRadius: "8px",
                            width: "400px",
                            maxHeight: "80vh",
                            overflowY: "auto"
                        }}
                    >
                        <h2>Chi tiết phản hồi</h2>
                        <p><strong>Nội dung:</strong> {selectedFeedback.noiDung}</p>
                        {selectedFeedback.hinhAnhPhanHoi && (
                            <img
                                src={getFullImageUrl(selectedFeedback.hinhAnhPhanHoi)}
                                alt="Phản hồi"
                                style={{ width: "100%", height: "auto", marginTop: "10px" }}
                            />
                        )}
                        <button
                            onClick={handleCloseModal}
                            style={{
                                marginTop: "15px",
                                padding: "5px 10px",
                                backgroundColor: "#3085d6",
                                color: "#fff",
                                border: "none",
                                borderRadius: "4px",
                                cursor: "pointer"
                            }}
                        >
                            Đóng
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default FeedbackPage;
