using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace back_end.DTOs
{
    public class DANGKYNGUOIDUNG
    {
        public string UserName { get; set; }
        public string Password { get; set; }
        public string Email { get; set; }
        public string Address { get; set; }
        public string TenNguoiDung { get; set; }
        public string PhoneNumber { get; set; }
    }
}