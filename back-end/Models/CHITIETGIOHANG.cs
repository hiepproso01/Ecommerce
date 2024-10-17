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
        [Key]
        public string IDChiTietGioHang { get; set; }
        public string IDSanPham { get; set; }
        public string TenSanPham { get; set; }
        public int SoLuong { get; set; }
        public string IDNguoiDung { get; set; }
        public string TenNguoiDung { get; set; }
        public string Address { get; set; }
        public string PhoneNumber { get; set; }
        public string IDGioHang { get; set; }
        public string GiaBan { get; set; }
        public string HinhAnh { get; set; }

        // [ForeignKey("IDGioHang")]
        // public virtual GIOHANG GioHang { get; set; }
    }
}
