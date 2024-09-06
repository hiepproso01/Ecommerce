using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace back_end.DTOs
{
    public class DONHANGDTO
    {
        public string IDTaiKhoan { get; set; }
        public string NgayDatHang { get; set; }
        public string TongTien { get; set; }
        // public required TAIKHOAN TAIKHOAN { get; set; }
        // public required List<CHITIETDONHANG> CHITIETDONHANG { get; set; }
    }
}