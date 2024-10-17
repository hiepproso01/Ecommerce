using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using back_end.Models;
using back_end.Data;
using Microsoft.AspNetCore.Identity;

namespace back_end.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CHITIETDONHANGController : Controller
    {
        private readonly ApplicationDBContext _context;

        public CHITIETDONHANGController(ApplicationDBContext context)
        {
            _context = context;
        }

        [HttpGet("GetAll")]
        public async Task<ActionResult<IEnumerable<CHITIETDONHANG>>> GetCHITIETDONHANG()
        {
            // return await _context.CHITIETDONHANG.Include(od => od.DONHANG)
            //                               .ToListAsync();
             return await _context.CHITIETDONHANG.ToListAsync();
        }
        [HttpGet("GetbyId/{id}")]
        public async Task<ActionResult<CHITIETDONHANG>> GetCHITIETDONHANGById(string id)
        {
            // var orderDetail = await _context.CHITIETDONHANG.Include(od => od.SANPHAM)
            //                                              .Include(od => od.DONHANG)
            //                                              .FirstOrDefaultAsync(od => od.IDChiTietDonHang == id);
             var orderDetail = await _context.CHITIETDONHANG.FirstOrDefaultAsync(od => od.IDChiTietDonHang == id);
            if (orderDetail == null)
            {
                return NotFound();
            }
            return orderDetail;
        }
        [HttpPost("Payment")]
        public async Task<ActionResult<IEnumerable<CHITIETDONHANG>>> Payment([FromBody] List<CHITIETDONHANG> chiTietDonHangList)
        {
            if (chiTietDonHangList == null || !chiTietDonHangList.Any())
            {
                return BadRequest("Danh sách chi tiết đơn hàng không được để trống.");
            }

            foreach (var chiTietDonHang in chiTietDonHangList)
            {
                // Tạo ID mới cho mỗi chi tiết đơn hàng nếu chưa có
                if (string.IsNullOrEmpty(chiTietDonHang.IDChiTietDonHang))
                {
                    chiTietDonHang.IDChiTietDonHang = Guid.NewGuid().ToString();
                }
                
                _context.CHITIETDONHANG.Add(chiTietDonHang);
            }

            await _context.SaveChangesAsync();

            return Ok(chiTietDonHangList);
        }
        [HttpPut("Update/{id}")]
        public async Task<IActionResult> UpdateCHITIETDONHANG(string id, CHITIETDONHANG CHITIETDONHANG)
        {
            if (id != CHITIETDONHANG.IDChiTietDonHang)
            {
                return BadRequest();
            }
            _context.Entry(CHITIETDONHANG).State = EntityState.Modified;
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!CHITIETDONHANGExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }
            return NoContent();
        }
        [HttpDelete("Delete/{id}")]
        public async Task<IActionResult> DeleteCHITIETDONHANG(string id)
        {
            var orderDetail = await _context.CHITIETDONHANG.FindAsync(id);
            if (orderDetail == null)
            {
                return NotFound();
            }
            _context.CHITIETDONHANG.Remove(orderDetail);
            await _context.SaveChangesAsync();
            return NoContent();
        }
        private bool CHITIETDONHANGExists(string id)
        {

            return _context.CHITIETDONHANG.Any(e => e.IDChiTietDonHang == id);



        }

        // [HttpPost("Create")]
        // public async Task<ActionResult<IEnumerable<CHITIETDONHANG>>> CreateCHITIETDONHANG([FromBody] List<CHITIETDONHANG> chiTietDonHangList)
        // {
        //     if (chiTietDonHangList == null || !chiTietDonHangList.Any())
        //     {
        //         return BadRequest("Danh sách chi tiết đơn hàng không được để trống.");
        //     }

           
        //     var newChiTietDonHangList = new List<CHITIETDONHANG>();

        //     foreach (var chiTietDonHang in chiTietDonHangList)
        //     {
        //         var newChiTietDonHang = new CHITIETDONHANG
        //         {
        //             IDChiTietDonHang =chiTietDonHang.IDChiTietDonHang,
        //             // IDDonHang = chiTietDonHang.IDDonHang,
        //             IDSanPham = chiTietDonHang.IDSanPham,
        //             TenSanPham = chiTietDonHang.TenSanPham,
        //             SoLuong = chiTietDonHang.SoLuong,
        //             DonGia = chiTietDonHang.DonGia,
        //             // Thêm các thuộc tính khác nếu cần
        //         };
        //         newChiTietDonHangList.Add(newChiTietDonHang);
        //         _context.CHITIETDONHANG.Add(newChiTietDonHang);
        //     }

        //     decimal tongTien = chiTietDonHangList.Sum(ct => 
        //         ct.SoLuong * decimal.Parse(ct.DonGia.ToString()));

        //     var donHang = new DONHANG
        //     {
        //         // IDDonHang = idDonHang,
        //         IDTaiKhoan = chiTietDonHangList.First().IDNguoiDung,
        //         NgayDatHang = DateTime.Now,
        //         TongTien = tongTien,
        //         CHITIETDONHANG = newChiTietDonHangList
        //     };
        //     _context.DONHANG.Add(donHang);

        //     await _context.SaveChangesAsync();

        //     return CreatedAtAction(nameof(GetCHITIETDONHANG), new { id = chiTietDonHangList.First().IDChiTietDonHang }, newChiTietDonHangList);
        // }
    }
}
