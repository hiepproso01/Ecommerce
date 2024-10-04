using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
namespace back_end.Models
{
    public class CHITIETDONHANG
    {
      
        public string IDChiTietDonHang { get; set; }
         [StringLength(450)]
        public string IDDonHang { get; set; }
         [ForeignKey("IDDonHang")]
         public virtual DONHANG DonHang { get; set; }
         [StringLength(450)]
        public string IDSanPham { get; set; }
        public int SoLuong { get; set; }
        public double DonGia { get; set; }
        public double ThanhTien { get; set; }
        // public  DONHANG DONHANG { get; set; }
        // public  SANPHAM SANPHAM { get; set; }

       
        
    }
}