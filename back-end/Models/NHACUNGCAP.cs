using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace back_end.Models
{
    public class NHACUNGCAP
    {
        
        public string TenNhaCungCap { get; set; }
        [Key]
        public string IDNhaCungCap { get; set; }
      
        
    }
}