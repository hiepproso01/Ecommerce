using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace back_end.DTOs
{
    public class CHITIETGIOHANGDetailDTO
    {
         public string IDChiTietGioHang { get; set; }

        public string IDGioHang { get; set; }
        public string IDNguoiDung { get; set; }
        public string IDSanPham { get; set; }
          public string TenNguoiDung { get; set; }
        public string Address { get; set; }
        public string PhoneNumber { get; set; }
        public string TenSanPham { get; set; }
        public int SoLuong { get; set; }
        public double DonGia { get; set; }
        // public required TAIKHOAN TAIKHOAN { get; set; }
        // public required List<CHITIETGIOHANG> CHITIETGIOHANG { get; set; }
    }
}