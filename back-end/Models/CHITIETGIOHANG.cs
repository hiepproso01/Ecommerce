using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace back_end.Models
{
    public class CHITIETGIOHANG
    {
        public string IDChiTietGioHang { get; set; }
        public string IDGioHang { get; set; }
      [ForeignKey("IDGioHang")]
        public virtual GIOHANG GioHang { get; set; }
        // public required GIOHANG GIOHANG { get; set; }
        [StringLength(450)]
        public string IDSanPham { get; set; }
        
        
        // public required SANPHAM SANPHAM { get; set; }
        public int SoLuong { get; set; }
        public double DonGia { get; set; }
        public double ThanhTien { get; set; }
    }
}