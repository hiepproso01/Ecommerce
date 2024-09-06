using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace back_end.DTOs
{
    public class DANGKYADMIN
    {
        public string UserName { get; set; }
        public string Password { get; set; }
        public string Email { get; set; }
        public string TenAdmin { get; set; }
        public string Position { get; set; }
        public string PhoneNumber { get; set; }
    }
}