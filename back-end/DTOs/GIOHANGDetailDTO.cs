using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace back_end.DTOs
{
    public class GIOHANGDetailDTO
    {
        public string IDGioHang { get; set; }
        public string IDNguoiDung { get; set; }
        public string IDSanPham { get; set; }
        public string TenSanPham { get; set; }
        public int SoLuong { get; set; }
        public double DonGia { get; set; }
        public double ThanhTien { get; set; }
        public string GiaBan { get; set; }
        public string HinhAnh { get; set; }
    }
}