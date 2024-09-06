using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;

namespace back_end.Models
{
    public class ADMIN : IdentityUser
    {
    
    public int IDAdmin { get; set; }
    public required string TenAdmin { get; set; }
    public required string Position { get; set; }
   
    }
}