using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using back_end.Models;
using back_end.Data;
using back_end.DTOs;

namespace back_end.Controllers
{
    [Route("api/donhang")]
    [ApiController]
    public class DONHANGController : Controller
    {
      private readonly ApplicationDBContext _context;

        public DONHANGController(ApplicationDBContext context)
        {
            _context = context;
        }
         [HttpGet("GetAll")]
    public async Task<ActionResult<IEnumerable<DONHANG>>> GetDONHANG()
    {
        return await _context.DONHANG.Include(o => o.CHITIETDONHANG).ToListAsync();
    }
       
         [HttpGet("GetbyId/{id}")]
    public async Task<ActionResult<DONHANG>> GetDONHANGById(string id)
    {
        var order = await _context.DONHANG.Include(o => o.CHITIETDONHANG)
                                         .FirstOrDefaultAsync(o => o.IDDonHang == id);
        if (order == null)
        {
            return NotFound();
        }
        return order;
    }
      [HttpPost("Create")]
    public async Task<ActionResult<DONHANG>> CreateDONHANG(DONHANG donhang)
    {
        _context.DONHANG.Add(donhang);
        await _context.SaveChangesAsync();
        return CreatedAtAction(nameof(GetDONHANGById), new { id = donhang.IDDonHang }, donhang);
    }
     [HttpPut("Update/{id}")]
    public async Task<IActionResult> UpdateDONHANG(string id, DONHANG donhang)
    {
        if (id != donhang.IDDonHang)
        {
            return BadRequest();
        }
        _context.Entry(donhang).State = EntityState.Modified;
        try
        {
            await _context.SaveChangesAsync();
        }
        catch (DbUpdateConcurrencyException)
        {
            if (!DONHANGExists(id))
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
    public async Task<IActionResult> DeleteDONHANG(string id)
    {
        var donhang = await _context.DONHANG.FindAsync(id);
        if (donhang == null)
        {
            return NotFound();
        }
        _context.DONHANG.Remove(donhang);
        await _context.SaveChangesAsync();
        return NoContent();
    }
     private bool DONHANGExists(string id)
    {
        return _context.DONHANG.Any(e => e.IDDonHang == id);
    }


    }
}