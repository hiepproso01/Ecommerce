using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using back_end.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using back_end.DTOs;
using back_end.Models; 

namespace back_end.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class GIOHANGController : Controller
    {
         private readonly ApplicationDBContext _context;

        public GIOHANGController(ApplicationDBContext context)
        {
            _context = context;
        }

        [HttpGet("GetAll")]
    public async Task<ActionResult<IEnumerable<GIOHANG>>> GetGIOHANG()
    {
        return await _context.GIOHANG.Include(o => o.CHITIETGIOHANG).ToListAsync();
    }
        [HttpGet("GetbyId/{id}")]
    public async Task<ActionResult<GIOHANG>> GetGIOHANGById(string id)
    {
        var order = await _context.GIOHANG.Include(o => o.CHITIETGIOHANG)
                                         .FirstOrDefaultAsync(o => o.IDGioHang == id);
        if (order == null)
        {
            return NotFound();
        }
        return order;
    }
    // [HttpPost("Create")]
    //  public async Task<ActionResult<GIOHANG>> CreateGIOHANG(GIOHANG giohang)
    // {
    //     _context.GIOHANG.Add(giohang);
    //     await _context.SaveChangesAsync();
    //     return CreatedAtAction(nameof(GetGIOHANGById), new { id = giohang.IDGioHang }, giohang);
    // }
      [HttpPost("AddToCart")]
        public async Task<ActionResult<CHITIETGIOHANG>> AddToCart(CHITIETGIOHANG chiTietGioHang)
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

            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(GetGIOHANGById), new { id = chiTietGioHang.IDChiTietGioHang }, chiTietGioHang);
        }

     [HttpPut("Update/{id}")]
    public async Task<IActionResult> UpdateGIOHANG(string id, GIOHANG giohang)
    {
        if (id != giohang.IDGioHang)
        {
            return BadRequest();
        }
        _context.Entry(giohang).State = EntityState.Modified;
        try
        {
            await _context.SaveChangesAsync();
        }
        catch (DbUpdateConcurrencyException)
        {
            if (!GIOHANGExists(id))
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
    public async Task<IActionResult> DeleteGIOHANG(string id)
    {
        var giohang = await _context.GIOHANG.FindAsync(id);
        if (giohang == null)
        {
            return NotFound();
        }
        _context.GIOHANG.Remove(giohang);
        await _context.SaveChangesAsync();
        return NoContent();
    }
     private bool GIOHANGExists(string id)
    {
        return _context.GIOHANG.Any(e => e.IDGioHang == id);
    }
    }
}