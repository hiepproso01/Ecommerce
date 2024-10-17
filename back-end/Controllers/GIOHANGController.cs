using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using back_end.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using back_end.Models;

namespace back_end.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class GIOHANGController : ControllerBase
    {
        private readonly ApplicationDBContext _context;

        public GIOHANGController(ApplicationDBContext context)
        {
            _context = context;
        }

        [HttpGet("GetAll")]
        public async Task<ActionResult<IEnumerable<GIOHANG>>> GetGIOHANG()
        {
            return await _context.GIOHANG
                .Include(g => g.ChiTietGioHang)
                .ToListAsync();
        }

        [HttpGet("GetById/{id}")]
        public async Task<ActionResult<GIOHANG>> GetGIOHANGById(string id)
        {
            var gioHang = await _context.GIOHANG
                .Include(g => g.ChiTietGioHang)
                .FirstOrDefaultAsync(g => g.IDGioHang == id);

            if (gioHang == null)
            {
                return NotFound();
            }

            return gioHang;
        }

        [HttpPost("AddToCart")]
        public async Task<ActionResult> AddToCart(CHITIETGIOHANG chiTietGioHang)
        {
            var gioHang = await _context.GIOHANG
                .Include(g => g.ChiTietGioHang)
                .FirstOrDefaultAsync(g => g.IDGioHang == chiTietGioHang.IDChiTietGioHang);

            if (gioHang == null)
            {
                gioHang = new GIOHANG
                {
                    // IDGioHang = chiTietGioHang.IDChiTietGioHang,
                    ChiTietGioHang = new List<CHITIETGIOHANG>()
                };
                _context.GIOHANG.Add(gioHang);
            }

            var existingItem = gioHang.ChiTietGioHang
                .FirstOrDefault(c => c.IDSanPham == chiTietGioHang.IDSanPham);

            if (existingItem != null)
            {
                existingItem.SoLuong += chiTietGioHang.SoLuong;
            }
            else
            {
                gioHang.ChiTietGioHang.Add(chiTietGioHang);
            }

            await _context.SaveChangesAsync();

            return Ok(gioHang);
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
