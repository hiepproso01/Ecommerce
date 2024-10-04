using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace back_end.DTOs
{
    public class NHOMDANHMUCDTO
    {
         public string  TenNhomDanhMuc { get; set; }
       
        public string HinhAnhNhomDanhMuc { get; set; }
        // public string IDDanhMuc { get; set; }
        // public string TenDanhMuc { get; set;}
        // public string HinhAnhDanhMuc { get; set; }     
    }
}