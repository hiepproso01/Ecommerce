using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using back_end.Models;

namespace back_end.DTOs
{
    public class CHITIETGIOHANGDTO
    {
        public string IDChiTietGioHang { get; set; }
        public string IDGioHang { get; set; }
        // public required GIOHANG GIOHANG { get; set; }
        public string IDNguoiDung { get; set; }
        public string IDSanPham { get; set; }
        // public required SANPHAM SANPHAM { get; set; }
        public string TenSanPham { get; set; }
        public int SoLuong { get; set; }
        public double DonGia { get; set; }
          public string TenNguoiDung { get; set; }
        public string Address { get; set; }
        public string PhoneNumber { get; set; }
        public double ThanhTien  {
        get { return SoLuong * DonGia; }   // Tính thành tiền dựa trên số lượng và đơn giá
    }
    }
}