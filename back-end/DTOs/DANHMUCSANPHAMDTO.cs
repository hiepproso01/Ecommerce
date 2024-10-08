using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace back_end.DOTs
{
    public class DANHMUCSANPHAMDTO
    {
        
        public string TenDanhMuc { get; set; }
        public int SoLuongSanPham { get; set; }
        public string TenNhomDanhMuc { get; set; }
        public string IDNhomDanhMuc { get; set; }
        [StringLength(1000)]
        public string HinhAnhDanhMuc { get; set; }
    }
}