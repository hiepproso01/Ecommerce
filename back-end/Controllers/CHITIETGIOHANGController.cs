using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using back_end.Models;
using back_end.Data;

namespace back_end.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CHITIETGIOHANGController : Controller
    {
        private readonly ApplicationDBContext _context;

        public CHITIETGIOHANGController(ApplicationDBContext context)
        {
            _context = context;
        }

        [HttpGet("GetAll")]
        public async Task<ActionResult<IEnumerable<CHITIETGIOHANG>>> GetCHITIETGIOHANG()
        {
            return await _context.CHITIETGIOHANG.ToListAsync();
        }

        [HttpGet("GetbyId/{id}")]
        public async Task<ActionResult<CHITIETGIOHANG>> GetCHITIETGIOHANGById(string id)
        {
            var orderDetail = await _context.CHITIETGIOHANG.FirstOrDefaultAsync(od => od.IDChiTietGioHang == id);
    
            if (orderDetail == null)
            {
                return NotFound();
            }
    
            return orderDetail;
        }

        // Modify this method to accept a list of products
       [HttpPost("AddToCart")]
public async Task<ActionResult<IEnumerable<CHITIETGIOHANG>>> AddToCart([FromBody] List<CHITIETGIOHANG> chiTietGioHangList)
{
    if (chiTietGioHangList == null || !chiTietGioHangList.Any())
    {
        return BadRequest("Danh sách sản phẩm không được để trống.");
    }

    foreach (var chiTietGioHang in chiTietGioHangList)
    {
        // Kiểm tra xem sản phẩm đã tồn tại trong giỏ hàng chưa
        var existingItem = await _context.CHITIETGIOHANG
            .FirstOrDefaultAsync(c => c.IDGioHang == chiTietGioHang.IDGioHang && c.IDSanPham == chiTietGioHang.IDSanPham);

        if (existingItem != null)
        {
            // Nếu sản phẩm đã có trong giỏ, tăng số lượng
            existingItem.SoLuong += chiTietGioHang.SoLuong;
            _context.Entry(existingItem).State = EntityState.Modified;
        }
        else
        {
            // Nếu sản phẩm chưa có, thêm sản phẩm mới vào giỏ hàng
            _context.CHITIETGIOHANG.Add(chiTietGioHang);
        }
    }

    await _context.SaveChangesAsync();
    return CreatedAtAction(nameof(GetCHITIETGIOHANG), null, chiTietGioHangList);
}

        [HttpPut("Update/{id}")]
        public async Task<IActionResult> UpdateCHITIETGIOHANG(string id, CHITIETGIOHANG CHITIETGIOHANG)
        {
            if (id != CHITIETGIOHANG.IDChiTietGioHang)
            {
                return BadRequest();
            }
            _context.Entry(CHITIETGIOHANG).State = EntityState.Modified;
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!CHITIETGIOHANGExists(id))
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

        [HttpDelete("Delete/{idSanPham}")]
        public async Task<IActionResult> DeleteCHITIETGIOHANG(string idSanPham)
        {
            var chiTietGioHang = await _context.CHITIETGIOHANG
                .FirstOrDefaultAsync(c => c.IDSanPham == idSanPham);

            if (chiTietGioHang == null)
            {
                return NotFound($"Không tìm thấy sản phẩm có ID {idSanPham} trong giỏ hàng.");
            }

            _context.CHITIETGIOHANG.Remove(chiTietGioHang);
            await _context.SaveChangesAsync();

            return NoContent();
        }

[HttpDelete("DeleteAllForUser/{userId}")]
public async Task<IActionResult> DeleteAllForUser(string userId)
{
    try
    {
        var cartItems = await _context.CHITIETGIOHANG
            .Where(c => c.IDNguoiDung == userId)
            .ToListAsync();

        if (!cartItems.Any())
        {
            return NotFound($"Không tìm thấy sản phẩm trong giỏ hàng cho người dùng có ID {userId}.");
        }

        _context.CHITIETGIOHANG.RemoveRange(cartItems);
        await _context.SaveChangesAsync();

        return Ok($"Đã xóa tất cả {cartItems.Count} sản phẩm trong giỏ hàng của người dùng.");
    }
    catch (Exception ex)
    {
        return StatusCode(500, $"Lỗi server: {ex.Message}");
    }
}
        private bool CHITIETGIOHANGExists(string id)
        {
            return _context.CHITIETGIOHANG.Any(e => e.IDChiTietGioHang == id);
        }
    }
}
