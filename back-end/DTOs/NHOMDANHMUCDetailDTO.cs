using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace back_end.DTOs
{
    public class NHOMDANHMUCDetailDTO
    {
        public string IDNhomDanhMuc { get; set; }
         public string  TenNhomDanhMuc { get; set; }
        // public byte[] HinhAnhNhomDanhMuc { get; set; }
        [StringLength(1000)] // Đủ dài để chứa URL hoặc đường dẫn file
        public string HinhAnhNhomDanhMuc { get; set; }
         
        // public string IDDanhMuc { get; set; }
        // public string TenDanhMuc { get; set;}
        // public string HinhAnhDanhMuc { get; set; }     
    }
}