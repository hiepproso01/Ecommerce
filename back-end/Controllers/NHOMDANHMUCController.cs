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
    [Route("api/nhomdanhmuc")]
    [ApiController]
    public class NHOMDANHMUCController : Controller
    {
        private readonly ApplicationDBContext _context;

        public NHOMDANHMUCController(ApplicationDBContext context)
        {
            _context = context;
        }

        // GET: api/nhomdanhmuc/getall
        [HttpGet("GetAll")]
        public async Task<ActionResult<IEnumerable<NHOMDANHMUCDetailDTO>>> GetNHOMDANHMUC()
        {
            return await _context.NHOMDANHMUC
            .Select(nhom => new NHOMDANHMUCDetailDTO
            {
                IDNhomDanhMuc = nhom.IDNhomDanhMuc,
                TenNhomDanhMuc = nhom.TenNhomDanhMuc,
                HinhAnhNhomDanhMuc = nhom.HinhAnhNhomDanhMuc
            })
            .ToListAsync();
        }

        // GET: api/nhomdanhmuc/getbyid/5
        [HttpGet("GetById/{id}")]
        public async Task<ActionResult<NHOMDANHMUCDetailDTO>> GetNHOMDANHMUCByID(string id)
        {
            var nhom = await _context.NHOMDANHMUC
                .Select(nhom => new NHOMDANHMUCDetailDTO
                {
                   IDNhomDanhMuc = nhom.IDNhomDanhMuc,
                    TenNhomDanhMuc = nhom.TenNhomDanhMuc,
                    HinhAnhNhomDanhMuc = nhom.HinhAnhNhomDanhMuc
                })
                .FirstOrDefaultAsync(nhom => nhom.IDNhomDanhMuc == id);

            if (nhom == null)
            {
                return NotFound();
            }

            return Ok(nhom);
        }

        // POST: api/nhomdanhmuc/create
        [HttpPost("Create")]
        public async Task<ActionResult<NHOMDANHMUCDetailDTO>> CreateNHOMDANHMUC(NHOMDANHMUCDetailDTO nhomDetail)
        {
            var newNHOMDANHMUC = new NHOMDANHMUC
            {
                IDNhomDanhMuc = nhomDetail.IDNhomDanhMuc,
                TenNhomDanhMuc = nhomDetail.TenNhomDanhMuc,
                HinhAnhNhomDanhMuc = nhomDetail.HinhAnhNhomDanhMuc
            };
            _context.NHOMDANHMUC.Add(newNHOMDANHMUC);
            await _context.SaveChangesAsync();

            var result = new NHOMDANHMUCDetailDTO
            {
                IDNhomDanhMuc = newNHOMDANHMUC.IDNhomDanhMuc,
                TenNhomDanhMuc = newNHOMDANHMUC.TenNhomDanhMuc,
                HinhAnhNhomDanhMuc = newNHOMDANHMUC.HinhAnhNhomDanhMuc
            };

            return CreatedAtAction(nameof(GetNHOMDANHMUCByID), new { id = result.IDNhomDanhMuc }, result);
        }

        // PUT: api/nhomdanhmuc/update/5
        [HttpPut("Update/{id}")]
        public async Task<IActionResult> UpdateNHOMDANHMUC(string id, NHOMDANHMUCDetailDTO nhomDetailDTO)
        {
            if (id != nhomDetailDTO.IDNhomDanhMuc)
            {
                return BadRequest();
            }

            var nhom = await _context.NHOMDANHMUC.FindAsync(id);
            if (nhom == null)
            {
                return NotFound();
            }

            nhom.TenNhomDanhMuc = nhomDetailDTO.TenNhomDanhMuc;
            nhom.HinhAnhNhomDanhMuc = nhomDetailDTO.HinhAnhNhomDanhMuc; 
            _context.Entry(nhom).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!NHOMDANHMUCExists(id))
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

        // DELETE: api/nhomdanhmuc/delete/5
        [HttpDelete("Delete/{id}")]
        public async Task<IActionResult> DeleteNHOMDANHMUC(string id)
        {
            var nhom = await _context.NHOMDANHMUC.FindAsync(id);
            if (nhom == null)
            {
                return NotFound();
            }

            _context.NHOMDANHMUC.Remove(nhom);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        // Helper method to check if a NHOMDANHMUC exists by ID
        private bool NHOMDANHMUCExists(string id)
        {
            return _context.NHOMDANHMUC.Any(e => e.IDNhomDanhMuc == id);
        }
    }
}
