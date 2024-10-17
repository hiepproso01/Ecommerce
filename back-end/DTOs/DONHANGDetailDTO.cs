using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace back_end.DTOs
{
    public class DONHANGDetailDTO
    {
       
         [Key]
       [StringLength(20)]
        public string IDDonHang { get; set; }

        public string IDNguoiDung { get; set; }
        public string TenNguoiDung { get; set; }
        public string Address { get; set; }
        public string PhoneNumber { get; set; }
        public DateTime NgayDatHang { get; set; }
          public string TrangThai {get;set;}
        public string TongTien { get; set; }
        public string HinhAnh { get; set; }
       
    }
}