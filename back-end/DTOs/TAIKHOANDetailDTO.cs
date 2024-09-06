using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace back_end.DTOs
{
    public class TAIKHOANDetailDTO
    {
        public int IDTaiKhoan { get; set; }
        public string TenDangNhap { get; set; }
        public string MatKhau { get; set; }
        public string Email { get; set; }
        public int SoDienThoai { get; set; }
        public string MatKhauMaHoa { get; set; }
        public string TenNguoiDung { get; set; }
        public string DiaChi { get; set; }
    }
}