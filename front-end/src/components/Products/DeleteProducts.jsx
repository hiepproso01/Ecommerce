import React from 'react';
import Swal from 'sweetalert2';
import apiClient from '../../services/api';

const DeleteProduct = ({ productId, onDeleteSuccess }) => { // Thêm onDeleteSuccess vào props

  const handleDelete = async () => {
    try {
      // Hiển thị hộp thoại xác nhận trước khi xóa
      const result = await Swal.fire({
        title: 'Bạn có chắc chắn không?',
        text: "Hành động này sẽ xóa sản phẩm!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Xóa',
        cancelButtonText: 'Hủy'
      });

      if (result.isConfirmed) {
        // Nếu người dùng xác nhận, thực hiện xóa sản phẩm
        await apiClient.delete(`api/sanpham/Delete/${productId}`);

        // Gọi hàm onDeleteSuccess để cập nhật danh sách sản phẩm
        onDeleteSuccess();

        // Hiển thị thông báo thành công
        Swal.fire(
          'Đã xóa!',
          'Sản phẩm đã được xóa.',
          'success'
        );
       console.log(`${productId} đã được xóa!`);
      }
    } catch (error) {
      console.error("Có lỗi xảy ra khi xóa sản phẩm!", error);

      // Hiển thị thông báo lỗi
      Swal.fire(
        'Lỗi!',
        'Có lỗi xảy ra khi xóa sản phẩm.',
        'error'
      );
    }
  };

  return (
    <button onClick={handleDelete} className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition duration-300">
      Xóa
    </button>
  );
}

export default DeleteProduct;
