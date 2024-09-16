using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;

namespace back_end.Models
{
    public class NGUOIDUNG : IdentityUser
    {
    
    public int IDNguoiDung { get; set; }
    public required string TenNguoiDung { get; set; }
    
    [DefaultValue("NguoiDung")]
    public required string Role { get; set; } 
    public string Address { get; set; }
    public string PhoneNumber { get; set; }
   
    }
}