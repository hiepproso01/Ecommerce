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
    [Route("api/sanpham")]
    [ApiController]
    public class SANPHAMController : Controller
    {
           private readonly ApplicationDBContext _context;

        public SANPHAMController(ApplicationDBContext context)
        {
             _context = context;
        }
        [HttpGet("GetAll")]
        public async Task<ActionResult<IEnumerable<SANPHAMDetailDTO>>> GetSANPHAM()
        {
            return await _context.SANPHAM
            .Select(sanpham => new SANPHAMDetailDTO
            {
                IDSanPham = sanpham.IDSanPham,
                TenSanPham = sanpham.TenSanPham,
                DonViTinh = sanpham.DonViTinh,
                SoLuongNhap = sanpham.SoLuongNhap,
                SoLuongBan = sanpham.SoLuongBan,
                MoTa = sanpham.MoTa,
                GiaNhap = sanpham.GiaNhap,
                GiaBan = sanpham.GiaBan,
                TenDanhMuc = sanpham.TenDanhMuc,
                TenNhaCungCap = sanpham.TenNhaCungCap,
                HinhAnh = sanpham.HinhAnh
            })
            .ToListAsync();
        }
        [HttpGet("GetById/{id}")]
        public async Task<ActionResult<SANPHAMDetailDTO>> GetSANPHAMById(string id)
        {
            var sanpham = await _context.SANPHAM
            .Select(sanpham => new SANPHAMDetailDTO
            {
                IDSanPham = sanpham.IDSanPham,
                TenSanPham = sanpham.TenSanPham,
                DonViTinh = sanpham.DonViTinh,
                SoLuongNhap = sanpham.SoLuongNhap,
                SoLuongBan = sanpham.SoLuongBan,
                MoTa = sanpham.MoTa,
                GiaNhap = sanpham.GiaNhap,
                GiaBan = sanpham.GiaBan,
                TenDanhMuc = sanpham.TenDanhMuc,
                TenNhaCungCap = sanpham.TenNhaCungCap,
                HinhAnh = sanpham.HinhAnh

            })
            .FirstOrDefaultAsync(sanpham => sanpham.IDSanPham == id);
            if (sanpham == null)
            {
                return NotFound();
            }
            return Ok(sanpham);
        }
        // POST: api/SANPHAM/Create
        [HttpPost("Create")]
        public async Task<ActionResult<SANPHAMDetailDTO>> CreateSANPHAM(SANPHAMDetailDTO sanphamdetail)
        {
            var newSANPHAM = new SANPHAM
            {
                IDSanPham = sanphamdetail.IDSanPham,
                TenSanPham = sanphamdetail.TenSanPham,
                DonViTinh = sanphamdetail.DonViTinh,
                SoLuongNhap = sanphamdetail.SoLuongNhap,
                SoLuongBan = sanphamdetail.SoLuongBan,
                MoTa = sanphamdetail.MoTa,
                GiaNhap = sanphamdetail.GiaNhap,
                GiaBan = sanphamdetail.GiaBan,
                TenDanhMuc = sanphamdetail.TenDanhMuc,
                TenNhaCungCap = sanphamdetail.TenNhaCungCap,
                HinhAnh = sanphamdetail.HinhAnh
            };
            _context.SANPHAM.Add(newSANPHAM);
            await _context.SaveChangesAsync();
           var result = new SANPHAMDetailDTO
           {
                IDSanPham = newSANPHAM.IDSanPham,
                TenSanPham = newSANPHAM.TenSanPham,
                DonViTinh = newSANPHAM.DonViTinh,
                SoLuongNhap = newSANPHAM.SoLuongNhap,
                SoLuongBan = newSANPHAM.SoLuongBan,
                MoTa = newSANPHAM.MoTa,
                GiaNhap = newSANPHAM.GiaNhap,
                GiaBan = newSANPHAM.GiaBan,
                TenDanhMuc = newSANPHAM.TenDanhMuc,
                TenNhaCungCap = newSANPHAM.TenNhaCungCap,
                HinhAnh = newSANPHAM.HinhAnh
            };
           return CreatedAtAction(nameof(GetSANPHAMById), new { id = result.IDSanPham }, result);
        }
        // PUT: api/SANPHAM/Update/5
        [HttpPut("Update/{id}")]
        public async Task<IActionResult> UpdateSANPHAM(string id, SANPHAMDetailDTO sanphamdetailDTO)
        {
            if (id != sanphamdetailDTO.IDSanPham)
            {
                return BadRequest();
            }
            var sanpham = await _context.SANPHAM.FindAsync(id);
            if (sanpham == null)
            {
                return NotFound();
            }
            sanpham.TenSanPham = sanphamdetailDTO.TenSanPham;
            sanpham.DonViTinh = sanphamdetailDTO.DonViTinh;
            sanpham.SoLuongNhap = sanphamdetailDTO.SoLuongNhap;
            sanpham.SoLuongBan = sanphamdetailDTO.SoLuongBan;
            sanpham.MoTa = sanphamdetailDTO.MoTa;
            sanpham.GiaNhap = sanphamdetailDTO.GiaNhap;
            sanpham.GiaBan = sanphamdetailDTO.GiaBan;
            sanpham.TenDanhMuc = sanphamdetailDTO.TenDanhMuc;
            sanpham.TenNhaCungCap = sanphamdetailDTO.TenNhaCungCap;
            sanpham.HinhAnh = sanphamdetailDTO.HinhAnh;
            _context.Entry(sanpham).State = EntityState.Modified;
           try{
            await _context.SaveChangesAsync();
           }
           catch (DbUpdateConcurrencyException)
           {
            if (!SANPHAMExists(id))
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
        // DELETE: api/SANPHAM/Delete/5
        [HttpDelete("Delete/{id}")]
        public async Task<IActionResult> DeleteSANPHAM(string id)
        {
            var sanpham = await _context.SANPHAM.FindAsync(id);
            if (sanpham == null)
            {
                return NotFound();
            }
            _context.SANPHAM.Remove(sanpham);
            await _context.SaveChangesAsync();
            return NoContent();
        }
        private bool SANPHAMExists(string id)
        {
            return _context.SANPHAM.Any(e => e.IDSanPham == id);
        }
    }
}