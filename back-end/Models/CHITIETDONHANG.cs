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
       [Key]
        public string IDChiTietDonHang { get; set; }
       
        public string IDSanPham { get; set; }
        public string TenSanPham { get; set; }
        public int SoLuong { get; set; }
        public string GiaBan { get; set; }
        public string ThanhTien { get; set; }
        public string HinhAnh { get; set; }
//        [ForeignKey("DONHANG")]
// public string IDDonHang { get; set; } // Đảm bảo tên này trùng khớp với cột trong bảng DONHANG

// public virtual DONHANG DONHANG { get; set; } // Định nghĩa mối quan hệ
        

       
        
    }
}