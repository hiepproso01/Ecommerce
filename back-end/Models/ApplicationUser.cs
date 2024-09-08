using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;

namespace back_end.Models
{
    public class ApplicationUser:IdentityUser
    {
        public string UserType { get; set; }
        public string TenNguoiDung { get; set; }
        public string Position { get; set; }
    }
}