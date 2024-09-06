using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;

namespace back_end.Models
{
    public class GIOHANG
    {
        
        public int IDGioHang { get; set; }
        public int IDTaiKhoan { get; set; }
        public required TAIKHOAN TAIKHOAN { get; set; }
        public required List<CHITIETGIOHANG> CHITIETGIOHANG { get; set; }
    }
}