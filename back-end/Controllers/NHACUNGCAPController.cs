using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using back_end.DTOs;
using back_end.Models;
using back_end.Data;
using Microsoft.EntityFrameworkCore;
namespace back_end.Controllers
{
    [Route("api/nhacungcap")]
    [ApiController]
    public class NHACUNGCAPController : Controller
    {
         private readonly ApplicationDBContext _context;
        public NHACUNGCAPController(ApplicationDBContext context)
        {
           _context = context;
        }

        [HttpGet("GetAll")]
        public async Task<ActionResult<IEnumerable<NHACUNGCAPDetailDTO>>> GetNHACUNGCAP()
        {
            return await _context.NHACUNGCAP
            .Select(nhacungcap => new NHACUNGCAPDetailDTO
            {
                IDNhaCungCap = nhacungcap.IDNhaCungCap,
                TenNhaCungCap = nhacungcap.TenNhaCungCap,
            }).ToListAsync();
        }
        // GET: api/nhacungcap/GetById/5
        [HttpGet("GetbyID/{id}")]
        public async Task<ActionResult<NHACUNGCAPDetailDTO>> GetNHACUNGCAPByID(string id)
        {
            var nhacungcap = await _context.NHACUNGCAP
            .Select(nhacungcap => new NHACUNGCAPDetailDTO
            {
                IDNhaCungCap = nhacungcap.IDNhaCungCap,
                TenNhaCungCap = nhacungcap.TenNhaCungCap,
            }).FirstOrDefaultAsync();
            if (nhacungcap == null)
            {
                return NotFound();
            }
            return Ok(nhacungcap);
        }
        // POST: api/nhacungcap/Create
        [HttpPost("Create")]
        public async Task<ActionResult<NHACUNGCAPDetailDTO>> CreateNHACUNGCAP(NHACUNGCAPDetailDTO nhacungcapdetail)
        {
            var newNHACUNGCAP = new NHACUNGCAP
            {
                IDNhaCungCap = nhacungcapdetail.IDNhaCungCap,
                TenNhaCungCap = nhacungcapdetail.TenNhaCungCap,
            };
            _context.NHACUNGCAP.Add(newNHACUNGCAP);
            await _context.SaveChangesAsync();
            var result = new NHACUNGCAPDetailDTO
            {
                IDNhaCungCap = newNHACUNGCAP.IDNhaCungCap,
                TenNhaCungCap = newNHACUNGCAP.TenNhaCungCap,
            };
            return CreatedAtAction(nameof(GetNHACUNGCAPByID), new { id = result.IDNhaCungCap }, result);
        }
        // PUT: api/nhacungcap/Update/5
        [HttpPut("Update/{id}")]
        public async Task<IActionResult> UpdateNHACUNGCAP(string id, NHACUNGCAPDetailDTO nhacungcapdetailDTO)
        {
            if (id != nhacungcapdetailDTO.IDNhaCungCap)
            {
                return BadRequest();
            }
            var nhacungcap = await _context.NHACUNGCAP.FindAsync(id);
            if (nhacungcap == null)
            {
                return NotFound();
            }
            nhacungcap.TenNhaCungCap = nhacungcapdetailDTO.TenNhaCungCap;
            _context.Entry(nhacungcap).State = EntityState.Modified;
           try{
            await _context.SaveChangesAsync();
           }
           catch (DbUpdateConcurrencyException)
           {
            if (!NHACUNGCAPExists(id))
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
        // DELETE: api/nhacungcap/Delete/5
        [HttpDelete("Delete/{id}")]
        public async Task<IActionResult> DeleteNHACUNGCAP(string id)
        {
            var nhacungcap = await _context.NHACUNGCAP.FindAsync(id);
            if (nhacungcap == null)
            {
                return NotFound();
            }
            _context.NHACUNGCAP.Remove(nhacungcap);
            await _context.SaveChangesAsync();
            return NoContent();
        }
        private bool NHACUNGCAPExists(string id)
        {
            return _context.NHACUNGCAP.Any(e => e.IDNhaCungCap == id);
        }
    }
}