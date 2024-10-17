using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace back_end.DTOs
{
    public class CHITIETDONHANGDTO
    {
        public string IDChiTietDonHang { get; set; }
       
        public string IDDonHang { get; set; } 
        

        public string IDSanPham { get; set; }
        public string TenSanPham { get; set; }
        public string IDNguoiDung { get; set; }
        public string TenNguoiDung { get; set; }
        public string Address { get; set; }
        public string PhoneNumber { get; set; }
        public int SoLuong { get; set; }
        public string GiaBan { get; set; }
        public string ThanhTien { get; set; }
        public string HinhAnh { get; set; }
        // public required DONHANG DONHANG { get; set; }
        // public required SANPHAM SANPHAM { get; set; }
    }
}