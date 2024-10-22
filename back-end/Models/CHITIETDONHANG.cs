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
       
        // Sử dụng IDDonHang từ bảng DONHANG
        // public string IDDonHang { get; set; }
        public string IDSanPham { get; set; }
        public string TenSanPham { get; set; }
        public int SoLuong { get; set; }
        public string GiaBan { get; set; }
        public string ThanhTien { get; set; }
        public string HinhAnh { get; set; }

        // Khóa ngoại tới bảng DONHANG
        // public virtual DONHANG DONHANG { get; set; }   
    }
}
