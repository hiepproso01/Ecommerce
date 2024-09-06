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
using back_end.Models; // Thêm dòng này để import DANHMUCSANPHAM

namespace back_end.Controllers
{
    [Route("api/danhmucsp")]
    [ApiController]
        public class DANHMUCSPController : Controller
    {
        private readonly ApplicationDBContext _context;
        public DANHMUCSPController(ApplicationDBContext context)
        {
            _context = context;
        }
        // GET: api/CategoryProducts/GetAll
        [HttpGet("GetAll")]
        public async Task<ActionResult<IEnumerable<DANHMUCSPDetailDTO>>> GetDANHMUCSP()
        {
            return await _context.DANHMUCSANPHAM
            .Select(danhmuc => new DANHMUCSPDetailDTO
            {
                IDDanhMuc = danhmuc.IDDanhMuc,
                TenDanhMuc = danhmuc.TenDanhMuc,
                SoLuongSanPham = danhmuc.SoLuongSanPham
            })
            .ToListAsync();
           
        }
        // GET: api/CategoryProducts/GetById/5
        [HttpGet("GetByID/{id}")]
        public async Task<ActionResult<DANHMUCSPDetailDTO>> GetDANHMUCSPByID(string id)
        {
            var danhmucsp = await _context.DANHMUCSANPHAM
                .Select(danhmuc => new DANHMUCSPDetailDTO
                {
                    IDDanhMuc = danhmuc.IDDanhMuc,
                    TenDanhMuc = danhmuc.TenDanhMuc,
                    SoLuongSanPham = danhmuc.SoLuongSanPham
                    
                })
                .FirstOrDefaultAsync(danhmuc => danhmuc.IDDanhMuc == id);

            if (danhmucsp == null)
            {
                return NotFound();
            }

            return Ok(danhmucsp);
        }
        private string GenerateCustomID()
        {
            return "DM" + new Random().Next(1000, 9999).ToString(); // Ví dụ định dạng ID: THN1234
        }
        // POST: api/CategoryProducts/Create
        [HttpPost("Create")]
        public async Task<ActionResult<DANHMUCSPDetailDTO>> CreateDANHMUCSP(DANHMUCSPDetailDTO danhmucspdetail)
        {
            // var newIDDANHMUC = GenerateCustomID();
            var newDANHMUCSP = new DANHMUCSANPHAM
            {
                IDDanhMuc = danhmucspdetail.IDDanhMuc,
                TenDanhMuc = danhmucspdetail.TenDanhMuc,
                SoLuongSanPham = danhmucspdetail.SoLuongSanPham
            };
            _context.DANHMUCSANPHAM.Add(newDANHMUCSP);
            await _context.SaveChangesAsync();
            var result = new DANHMUCSPDetailDTO
            {
                IDDanhMuc = newDANHMUCSP.IDDanhMuc,
                TenDanhMuc = newDANHMUCSP.TenDanhMuc,
                SoLuongSanPham = newDANHMUCSP.SoLuongSanPham
            };
            return CreatedAtAction(nameof(GetDANHMUCSPByID), new { id = result.IDDanhMuc }, result);
        }
        // PUT: api/CategoryProducts/Update/5
        [HttpPut("Update/{id}")]
        public async Task<IActionResult> UpdateDANHMUCSP(string id, DANHMUCSPDetailDTO danhmucspdetailDTO)
        {
            if (id != danhmucspdetailDTO.IDDanhMuc)
            {
                return BadRequest();
            }

            var danhmucsp = await _context.DANHMUCSANPHAM.FindAsync(id);
            if (danhmucsp == null)
            {
                return NotFound();
            }

            danhmucsp.TenDanhMuc = danhmucspdetailDTO.TenDanhMuc;
            danhmucsp.SoLuongSanPham = danhmucspdetailDTO.SoLuongSanPham;
            _context.Entry(danhmucsp).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!DANHMUCSPExists(id))
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

        // DELETE: api/CategoryProducts/Delete/5
        [HttpDelete("Delete/{id}")]

        public async Task<IActionResult> DeleteDANHMUCSP(string id)
        {
            var danhmucsp = await _context.DANHMUCSANPHAM.FindAsync(id);
            if (danhmucsp == null)
            {
                return NotFound();
            }

            _context.DANHMUCSANPHAM.Remove(danhmucsp);
            await _context.SaveChangesAsync();

            return NoContent();
        }
        // Helper method to check if a CategoryProduct exists by ID
        private bool DANHMUCSPExists(string id)
        {
            return _context.DANHMUCSANPHAM.Any(e => e.IDDanhMuc == id);
        }
    }
}