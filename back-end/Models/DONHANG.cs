using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace back_end.Models
{
    public class DONHANG
    {
       
        public string IDDonHang { get; set; }
        public string IDTaiKhoan { get; set; }
        public DateTime NgayDatHang { get; set; }
        public decimal TongTien { get; set; }
        // public required TAIKHOAN TAIKHOAN { get; set; }
        public required List<CHITIETDONHANG> CHITIETDONHANG { get; set; }
}
}