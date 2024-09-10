import React, { useState, useEffect, useRef } from 'react';
import Swal from 'sweetalert2';
import apiClient from '../../services/api';

function CreateProduct({ onClose, onSuccess }) {
  const [productID, setProductID] = useState('');
  const [productName, setProductName] = useState('');
  const [unit, setUnit] = useState('');
  const [sellPrice, setSellPrice] = useState('');
  const [importPrice, setImportPrice] = useState('');
  const [description, setDescription] = useState('');
  const [quantity, setQuantity] = useState('');
  const [categoryInput, setCategoryInput] = useState('');
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [suppliers, setSuppliers] = useState([]);
  const [selectedSupplier, setSelectedSupplier] = useState('');
  const [hinhAnh, setHinhAnh] = useState('');
  const [soLuongBan, setSoLuongBan] = useState('');
  const importPriceRef = useRef(null);
  const sellPriceRef = useRef(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await apiClient.get('api/danhmucsp/GetAll');
        setCategories(response.data);
      } catch (error) {
        console.error("There was an error fetching the categories!", error);
      }
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    const fetchSuppliers = async () => {
      try {
        const response = await apiClient.get('api/nhacungcap/GetAll');
        setSuppliers(response.data);
      } catch (error) {
        console.error("There was an error fetching the suppliers!", error);
      }
    };

    fetchSuppliers();
  }, []);

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  const handleSupplierChange = (e) => {
    setSelectedSupplier(e.target.value);
  };

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('vi-VN').format(value);
  };

  const handlePriceChange = (setter, ref) => (e) => {
    const rawValue = e.target.value.replace(/[^\d]/g, '');
    setter(rawValue);

    // Maintain cursor position
    const formattedValue = formatCurrency(rawValue);
    const cursorPosition = e.target.selectionStart + (formattedValue.length - e.target.value.length);

    setter(formattedValue);
    setTimeout(() => {
      if (ref.current) {
        ref.current.setSelectionRange(cursorPosition, cursorPosition);
      }
    }, 0);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    let idDanhMuc = selectedCategory;
    let idNhaCungCap = selectedSupplier;
  
    if (!idDanhMuc) {
      Swal.fire({
        icon: 'error',
        title: 'Lỗi',
        text: 'Trường TenDanhMuc là bắt buộc.',
        confirmButtonColor: '#d33',
      });
      return;
    }
  
    if (!idNhaCungCap) {
      Swal.fire({
        icon: 'error',
        title: 'Lỗi',
        text: 'Trường TenNhaCungCap là bắt buộc.',
        confirmButtonColor: '#d33',
      });
      return;
    }
  
    if (categoryInput && !selectedCategory) {
      try {
        // Tạo danh mục mới nếu nó không tồn tại
        const response = await apiClient.post('api/danhmucsp/Create', {
          tenDanhMuc: categoryInput
        });
        idDanhMuc = response.data.idDanhMuc;
      } catch (error) {
        console.error("Có lỗi xảy ra khi tạo danh mục!", error);
        Swal.fire({
          icon: 'error',
          title: 'Lỗi',
          text: 'Có lỗi xảy ra khi tạo danh mục!',
          confirmButtonColor: '#d33',
        });
        return;
      }
    }
  
    try {
      await apiClient.post('api/sanpham/Create', {
        idSanPham: productID, // Dựa trên logic tạo ID của bạn
        tenSanPham: productName,
        donViTinh: unit,
        giaBan: sellPrice.replace(/\D/g, ''),
        giaNhap: importPrice.replace(/\D/g, ''),
        moTa: description,
        soLuong: quantity,
        idDanhMuc: idDanhMuc,
        idNhaCungCap: idNhaCungCap,
        hinhAnh: hinhAnh,
        soLuongBan: soLuongBan,
        tenNhaCungCap: selectedSupplier,
        tenDanhMuc: selectedCategory,
      });
  
      if (onSuccess) onSuccess();
      resetForm();
  
      Swal.fire({
        icon: 'success',
        title: 'Sản phẩm đã được tạo',
        text: 'Sản phẩm đã được tạo thành công!',
        confirmButtonColor: '#3085d6',
      });
  
    } catch (error) {
      console.error("Có lỗi xảy ra khi tạo sản phẩm!", error);
  
      let errorMessage = 'Có lỗi xảy ra khi tạo sản phẩm!';
      if (error.response && error.response.data) {
        if (typeof error.response.data === 'string') {
          errorMessage = error.response.data;
        } else if (typeof error.response.data === 'object') {
          errorMessage = JSON.stringify(error.response.data, null, 2);
        }
      }
  
      Swal.fire({
        icon: 'error',
        title: 'Lỗi',
        text: errorMessage,
        confirmButtonColor: '#d33',
      });
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setHinhAnh(reader.result); // Lưu Base64 string vào trạng thái
      };
      reader.readAsDataURL(file); // Chuyển đổi hình ảnh sang Base64
    }
  };
  
  const resetForm = () => {
    setProductID('');
    setProductName('');
    setUnit('');
    setSellPrice('');
    setImportPrice('');
    setDescription('');
    setQuantity('');
    setCategoryInput('');
    setSelectedCategory('');
    setSelectedSupplier('');
    setHinhAnh('');
    setSoLuongBan('');
  };

  return (
    <div className="p-8 bg-white rounded-lg w-[1000px] h-[auto] mx-auto">
    <h2 className="text-3xl font-bold mb-8 text-gray-900">Nhập hàng</h2>
    <form onSubmit={handleSubmit}>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <div className="flex flex-col">
          <label htmlFor="productID" className="block text-gray-700 text-sm font-medium mb-2">Mã sản phẩm</label>
          <input
            placeholder='Nhập mã sản phẩm'
            id="productID"
            type="text"
            value={productID}
            onChange={(e) => setProductID(e.target.value)}
            required
            className="border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="productName" className="block text-gray-700 text-sm font-medium mb-2">Tên sản phẩm</label>
          <input
            placeholder='Nhập tên sản phẩm'
            id="productName"
            type="text"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            required
            className="border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="unit" className="block text-gray-700 text-sm font-medium mb-2">Đơn vị tính</label>
          <input
            placeholder='Ví dụ: Cái, Cuộn, Hộp, ...'
            id="unit"
            type="text"
            value={unit}
            onChange={(e) => setUnit(e.target.value)}
            required
            className="border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="importPrice" className="block text-gray-700 text-sm font-medium mb-2">Giá nhập</label>
          <input
            placeholder='Nhập giá nhập'
            id="importPrice"
            type="text"
            value={importPrice}
            onChange={handlePriceChange(setImportPrice, importPriceRef)}
            ref={importPriceRef}
            required
            className="border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="sellPrice" className="block text-gray-700 text-sm font-medium mb-2">Giá bán</label>
          <input
            placeholder='Nhập giá bán'
            id="sellPrice"
            type="text"
            value={sellPrice}
            onChange={handlePriceChange(setSellPrice, sellPriceRef)}
            ref={sellPriceRef}
            required
            className="border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="quantity" className="block text-gray-700 text-sm font-medium mb-2">Số lượng nhập</label>
          <input
            placeholder='Nhập số lượng'
            id="quantity"
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            required
            className="border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="supplier" className="block text-gray-700 text-sm font-medium mb-2">Nhà cung cấp</label>
          <select
            id="supplier"
            value={selectedSupplier}
            onChange={handleSupplierChange}
            className="border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Chọn nhà cung cấp</option>
            {suppliers.map((supplier) => (
              <option key={supplier.idNhaCungCap} value={supplier.idNhaCungCap}>
                {supplier.tenNhaCungCap}
              </option>
            ))}
          </select>
        </div>
        <div className="flex flex-col">
          <label htmlFor="category" className="block text-gray-700 text-sm font-medium mb-2">Danh mục</label>
          <select
            id="category"
            value={selectedCategory}
            onChange={handleCategoryChange}
            className="border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Chọn danh mục</option>
            {categories.map((category) => (
              <option key={category.idDanhMuc} value={category.tenDanhMuc}>
                {category.tenDanhMuc}
              </option>
            ))}
          </select>
        </div>
        <div className="col-span-4 flex gap-6">
        <div className="flex flex-col w-1/2">
          <label htmlFor="description" className="block text-gray-700 text-sm font-medium mb-2">Mô tả</label>
          <textarea
            id="description"
            placeholder='Nhập mô tả sản phẩm'
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 h-full"
          />
        </div>
        <div className="flex flex-col w-1/2">
          <label htmlFor="hinhAnh" className="block text-gray-700 text-sm font-medium mb-2">Hình ảnh sản phẩm</label>
          <input
            id="hinhAnh"
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {hinhAnh && (
            <div className="mt-4 h-40 w-full border border-gray-300 rounded-md overflow-hidden">
              <img src={hinhAnh} alt="Preview" className="h-full w-full object-cover" />
            </div>
          )}
        </div>
      </div>
      </div>
      <div className="flex justify-end">
        <button
          type="button"
          onClick={onClose}
          className="bg-gray-500 text-white px-4 py-2 rounded-md mr-4"
        >
          Hủy
        </button>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-md"
        >
          Lưu
        </button>
      </div>
    </form>
  </div>
  

  );
}

export default CreateProduct;
