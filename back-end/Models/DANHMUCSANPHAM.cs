using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace back_end.Models
{
    public class DANHMUCSANPHAM
    {
       
        public string TenDanhMuc { get; set; }
         [Key]
        public string IDDanhMuc { get; set; }
      
        public int SoLuongSanPham { get; set; }
        public string IDNhomDanhMuc { get; set; }
        // [ForeignKey("IDNhomDanhMuc")]
        // public virtual NHOMDANHMUC NhomDanhMuc { get; set; }
        public string TenNhomDanhMuc { get; set; }
        public string HinhAnhDanhMuc { get; set; }
    }
}