using System;
using System.Collections.Generic;
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
            return await _context.CHITIETGIOHANG
                                          .Include(od => od.GIOHANG)
                                          .ToListAsync();
    }

       [HttpGet("GetbyId/{id}")]
    public async Task<ActionResult<CHITIETGIOHANG>> GetCHITIETGIOHANGById(int id)
    {
        var orderDetail = await _context.CHITIETGIOHANG
                                                     .Include(od => od.GIOHANG)
                                                     .FirstOrDefaultAsync(od =>od.IDChiTietGioHang == id);
        if (orderDetail == null)
        {
            return NotFound();
        }
        return orderDetail;
    }
     [HttpPost("Create")]
    public async Task<ActionResult<CHITIETGIOHANG>> CreateCHITIETGIOHANG(CHITIETGIOHANG CHITIETGIOHANG)
    {
        _context.CHITIETGIOHANG.Add(CHITIETGIOHANG);
        await _context.SaveChangesAsync();
        return CreatedAtAction(nameof(GetCHITIETGIOHANGById), new { id = CHITIETGIOHANG.IDChiTietGioHang }, CHITIETGIOHANG);
    }
     [HttpPut("Update/{id}")]
    public async Task<IActionResult> UpdateCHITIETGIOHANG(int id, CHITIETGIOHANG CHITIETGIOHANG)
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
     [HttpDelete("Delete/{id}")]
    public async Task<IActionResult> DeleteCHITIETGIOHANG(int id)
    {
        var order = await _context.CHITIETGIOHANG.FindAsync(id);
        if (order == null)
        {
            return NotFound();
        }
        _context.CHITIETGIOHANG.Remove(order);
        await _context.SaveChangesAsync();
        return NoContent();
    }

    private bool CHITIETGIOHANGExists(int id)
    {
        return _context.CHITIETGIOHANG.Any(e => e.IDChiTietGioHang == id);
    }
    }
}