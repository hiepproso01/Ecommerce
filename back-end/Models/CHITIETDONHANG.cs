using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace back_end.Models
{
    public class CHITIETDONHANG
    {
      
        public int IDChiTietDonHang { get; set; }
        public int IDDonHang { get; set; }
        public int IDSanPham { get; set; }
        public int SoLuong { get; set; }
        public double DonGia { get; set; }
        public double ThanhTien { get; set; }
        public  DONHANG DONHANG { get; set; }
        public  SANPHAM SANPHAM { get; set; }
    }
}