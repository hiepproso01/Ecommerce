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
                // SoLuongBan = sanpham.SoLuongBan,
                MoTa = sanpham.MoTa,
                GiaNhap = sanpham.GiaNhap,
                GiaBan = sanpham.GiaBan,
                TenDanhMuc = sanpham.TenDanhMuc,
                TenNhaCungCap = sanpham.TenNhaCungCap,
                HinhAnh = sanpham.HinhAnh,
                IDDanhMuc = sanpham.IDDanhMuc,
                IDNhaCungCap = sanpham.IDNhaCungCap,
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
                // SoLuongBan = sanpham.SoLuongBan,
                MoTa = sanpham.MoTa,
                GiaNhap = sanpham.GiaNhap,
                GiaBan = sanpham.GiaBan,
                TenDanhMuc = sanpham.TenDanhMuc,
                TenNhaCungCap = sanpham.TenNhaCungCap,
                HinhAnh = sanpham.HinhAnh,
                IDDanhMuc = sanpham.IDDanhMuc,
                IDNhaCungCap = sanpham.IDNhaCungCap,
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
        public async Task<ActionResult<SANPHAMDetailDTO>> CreateSANPHAM(SANPHAMDTO sanphamdetail)
        {
            byte[] imageBytes = null;

            
            var newSANPHAM = new SANPHAM
            {
                IDSanPham = sanphamdetail.IDSanPham,
                TenSanPham = sanphamdetail.TenSanPham,
                DonViTinh = sanphamdetail.DonViTinh,
                SoLuongNhap = sanphamdetail.SoLuongNhap,
                // SoLuongBan = sanphamdetail.SoLuongBan,
                MoTa = sanphamdetail.MoTa,
                GiaNhap = sanphamdetail.GiaNhap,
                GiaBan = sanphamdetail.GiaBan,
                IDDanhMuc = sanphamdetail.IDDanhMuc,
                TenDanhMuc = sanphamdetail.TenDanhMuc,
                IDNhaCungCap = sanphamdetail.IDNhaCungCap,
                TenNhaCungCap = sanphamdetail.TenNhaCungCap,
                HinhAnh = sanphamdetail.HinhAnh,
            };
            _context.SANPHAM.Add(newSANPHAM);
            await _context.SaveChangesAsync();
           var result = new SANPHAMDetailDTO
           {
                IDSanPham = newSANPHAM.IDSanPham,
                TenSanPham = newSANPHAM.TenSanPham,
                DonViTinh = newSANPHAM.DonViTinh,
                SoLuongNhap = newSANPHAM.SoLuongNhap,
                // SoLuongBan = newSANPHAM.SoLuongBan,
                MoTa = newSANPHAM.MoTa,
                GiaNhap = newSANPHAM.GiaNhap,
                GiaBan = newSANPHAM.GiaBan.ToString(),
                TenDanhMuc = newSANPHAM.TenDanhMuc,
                IDDanhMuc = newSANPHAM.IDDanhMuc,
                IDNhaCungCap = newSANPHAM.IDNhaCungCap,
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
            // sanpham.SoLuongBan = sanphamdetailDTO.SoLuongBan;
            sanpham.MoTa = sanphamdetailDTO.MoTa;
            sanpham.GiaNhap = sanphamdetailDTO.GiaNhap;
            sanpham.GiaBan = sanphamdetailDTO.GiaBan.ToString();
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
           [HttpPost("UploadImageProduct")]
        public async Task<ActionResult<string>> UploadImage(IFormFile file)
        {
            try
            {
                if (file == null || file.Length == 0)
                    return BadRequest("File is empty");

                var fileName = Guid.NewGuid().ToString() + Path.GetExtension(file.FileName);
                var filePath = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "imageProduct", fileName);

                // Đảm bảo thư mục tồn tại
                Directory.CreateDirectory(Path.GetDirectoryName(filePath));

                using (var stream = new FileStream(filePath, FileMode.Create))
                {
                    await file.CopyToAsync(stream);
                }

                var url = $"/images/{fileName}";
                return Ok(url);
            }
            catch (Exception ex)
            {
                // Log lỗi
                Console.WriteLine($"Error in UploadImage: {ex.Message}");
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        // GET: api/nhomdanhmuc/getimage/{fileName}
        [HttpGet("images/{fileName}")]
        public IActionResult GetImage(string fileName)
        {
            var imagePath = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "imageProduct", fileName);

            if (!System.IO.File.Exists(imagePath))
            {
                return NotFound("Image not found");
            }

            var imageFileStream = System.IO.File.OpenRead(imagePath);
            return File(imageFileStream, "image/jpeg"); // Adjust content type if needed
        }
        private bool SANPHAMExists(string id)
        {
            return _context.SANPHAM.Any(e => e.IDSanPham == id);
        }
        [HttpGet("GetByDanhMuc/{idDanhMuc}")]
public IActionResult GetByDanhMuc(string idDanhMuc)
        {
            var products = _context.SANPHAM.Where(sp => sp.IDDanhMuc == idDanhMuc).ToList();
            return Ok(products);
        }

    }
}