using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
namespace back_end.Models
{
    public class PHANHOI
    {
       [Key]
        public string IDPhanHoi { get; set; }
        public string IDNguoiDung { get; set; }
        public string TenNguoiDung { get; set; }
        public string Email { get; set; }
        public string NoiDung { get; set; }
        public string HinhAnhPhanHoi { get; set; }
        public DateTime NgayPhanHoi {get;set;}

    }
}
