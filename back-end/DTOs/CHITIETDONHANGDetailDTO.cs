using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace back_end.DTOs
{
    public class CHITIETDONHANGDetailDTO
    {
        public int IDChiTietDonHang { get; set; }
        public string IDDonHang { get; set; }
        public string IDSanPham { get; set; }
        public int SoLuong { get; set; }
        public double DonGia { get; set; }
        public double ThanhTien { get; set; }
        // public required DONHANG DONHANG { get; set; }
        // public required SANPHAM SANPHAM { get; set; }
    }
}