using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;

namespace back_end.Models
{
    public class DONHANGRequestDTO:IdentityUser
    {
      public DONHANG DonHang { get; set; }
    }
}