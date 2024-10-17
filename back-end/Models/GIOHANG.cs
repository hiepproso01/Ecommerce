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
        public string IDNguoiDung { get; set; }
        public List<CHITIETGIOHANG> ChiTietGioHang { get; set; }
    }
}
