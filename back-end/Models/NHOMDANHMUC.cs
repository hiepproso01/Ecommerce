using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
namespace back_end.Models
{
    public class NHOMDANHMUC
    {
      
        [Key]
        public string IDNhomDanhMuc { get; set; }
         [StringLength(450)]
        public string  TenNhomDanhMuc { get; set; }
       
        public string HinhAnhNhomDanhMuc { get; set; }
        // public string IDDanhMuc { get; set; }
        // [ForeignKey("IDDanhMuc")]
        // public virtual DANHMUCSANPHAM DanhMuc { get; set; }
        // public string TenDanhMuc { get; set;}
        // public string HinhAnhDanhMuc { get; set; }     
    }
}