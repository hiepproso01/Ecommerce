using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace back_end.DTOs
{
    public class CHITIETGIOHANGDTO
    {
          public int IDGioHang { get; set; }
        // public required GIOHANG GIOHANG { get; set; }
        public int IDSanPham { get; set; }
        // public required SANPHAM SANPHAM { get; set; }
        public int SoLuong { get; set; }
        public double DonGia { get; set; }
        public double ThanhTien { get; set; }
    }
}