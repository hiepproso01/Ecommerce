using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using back_end.Data;
using back_end.DTOs;
using back_end.Models;
using System.IO;
using System.Security.Cryptography;
using System.Text;

namespace back_end.Controllers
{
    [Route("api/nhomdanhmuc")]
    [ApiController]
    public class NHOMDANHMUCController : ControllerBase
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
                    HinhAnhNhomDanhMuc = nhom.HinhAnhNhomDanhMuc // Trả về byte[]
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
                    HinhAnhNhomDanhMuc = nhom.HinhAnhNhomDanhMuc // Trả về byte[]
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
                HinhAnhNhomDanhMuc = nhomDetail.HinhAnhNhomDanhMuc // Bây giờ là URL hoặc đường dẫn
            };
            _context.NHOMDANHMUC.Add(newNHOMDANHMUC);
            await _context.SaveChangesAsync();

            var result = new NHOMDANHMUCDetailDTO
            {
                IDNhomDanhMuc = newNHOMDANHMUC.IDNhomDanhMuc,
                TenNhomDanhMuc = newNHOMDANHMUC.TenNhomDanhMuc,
                HinhAnhNhomDanhMuc = newNHOMDANHMUC.HinhAnhNhomDanhMuc // Trả về byte[]
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

            // Chuyển đổi chuỗi hình ảnh sang byte[]
            if (nhomDetailDTO.HinhAnhNhomDanhMuc != null)
            {
                nhom.HinhAnhNhomDanhMuc = nhomDetailDTO.HinhAnhNhomDanhMuc; // Lưu ảnh dưới dạng nhị phân
            }

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

        // Upload image
        [HttpPost("UploadImage")]
        public async Task<ActionResult<string>> UploadImage(IFormFile file)
        {
            try
            {
                if (file == null || file.Length == 0)
                    return BadRequest("File is empty");

                var fileName = Guid.NewGuid().ToString() + Path.GetExtension(file.FileName);
                var filePath = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "images", fileName);

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
            var imagePath = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "images", fileName);

            if (!System.IO.File.Exists(imagePath))
            {
                return NotFound("Image not found");
            }

            var imageFileStream = System.IO.File.OpenRead(imagePath);
            return File(imageFileStream, "image/jpeg"); // Adjust content type if needed
        }
    }
}
