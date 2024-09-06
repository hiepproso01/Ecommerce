using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace back_end.Models
{
    public class SANPHAM
    {
       
        public string IDSanPham { get; set; }
        public string TenSanPham { get; set; }
        public string DonViTinh { get; set; }
        public int SoLuongNhap { get; set; }
        public string SoLuongBan { get; set; }
        public string MoTa { get; set; }
        public string GiaNhap { get; set; }
        public string GiaBan { get; set; }
        public string TenDanhMuc { get; set; }
        public string TenNhaCungCap { get; set; }
        public string HinhAnh { get; set; }
    }
}