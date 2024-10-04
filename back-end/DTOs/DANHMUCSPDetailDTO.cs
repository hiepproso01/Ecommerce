using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace back_end.DTOs
{
    public class DANHMUCSPDetailDTO
    {
        public string IDDanhMuc { get; set; }
        public string TenDanhMuc { get; set; }
        public int SoLuongSanPham { get; set; }
        public string IDNhomDanhMuc { get; set; }
        public string TenNhomDanhMuc { get; set; }
        public string HinhAnhDanhMuc { get; set; }
    }
}