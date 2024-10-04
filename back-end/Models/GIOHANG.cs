using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;

namespace back_end.Models
{
    public class GIOHANG
    {
        
        public string IDGioHang { get; set; }
        public string IDTaiKhoan { get; set; }
        // public int SoLuongHang { get; set; }
        // public required TAIKHOAN TAIKHOAN { get; set; }
        public required List<CHITIETGIOHANG> CHITIETGIOHANG { get; set; }
    }
}