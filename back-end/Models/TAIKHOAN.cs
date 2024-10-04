using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;

namespace back_end.Models
{
    public class TAIKHOAN : IdentityUser
    {
       
        public string IDTaiKhoan { get; set; }
        public string TenNguoiDung { get; set; }
        public string Address { get; set; }
      
    }
}