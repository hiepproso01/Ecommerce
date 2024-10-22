using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using back_end.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using back_end.Data;
using back_end.DTOs;
using Microsoft.EntityFrameworkCore;
namespace back_end.Controllers
{ 
    [Route("api/phanhoi")]
    [ApiController]
    public class PHANHOIController : Controller
    {
        private readonly ApplicationDBContext _context;

        public PHANHOIController(ApplicationDBContext context)
        {
            _context = context;
        }
     [HttpGet("GetAll")]
     public async Task<ActionResult<IEnumerable<PHANHOIDetailDTO>>> GetPHANHOI()
        {
            return await _context.PHANHOI
            .Select(phanhoi => new PHANHOIDetailDTO
            {
                IDPhanHoi = phanhoi.IDPhanHoi,
                IDNguoiDung = phanhoi.IDNguoiDung,
                TenNguoiDung = phanhoi.TenNguoiDung,
                Email = phanhoi.Email,
                NoiDung = phanhoi.NoiDung,
                HinhAnhPhanHoi = phanhoi.HinhAnhPhanHoi,
            })
            .ToListAsync();
        }
         [HttpGet("GetByID/{id}")]
     public async Task<ActionResult<PHANHOIDetailDTO>> GetPHANHOIByID(string id)
        {
           var phanhoi = await _context.PHANHOI
            .Select(phanhoi => new PHANHOIDetailDTO
            {
                IDPhanHoi = phanhoi.IDPhanHoi,
                IDNguoiDung = phanhoi.IDNguoiDung,
                TenNguoiDung = phanhoi.TenNguoiDung,
                Email = phanhoi.Email,
                NoiDung = phanhoi.NoiDung,
                HinhAnhPhanHoi = phanhoi.HinhAnhPhanHoi,
            })
            .FirstOrDefaultAsync(phanhoi => phanhoi.IDPhanHoi == id);
            if(phanhoi == null)
            {
                return NotFound();
            }
            return Ok(phanhoi );
        }
        [HttpPost("Create")]
        public async Task<ActionResult<PHANHOIDetailDTO>> CreatePHANHOI(PHANHOIDetailDTO phanhoidetail)
        {
           
            
            var newPHANHOI = new PHANHOI
            {
                 IDPhanHoi = phanhoidetail.IDPhanHoi,
                IDNguoiDung = phanhoidetail.IDNguoiDung,
                TenNguoiDung = phanhoidetail.TenNguoiDung,
                Email = phanhoidetail.Email,
                NoiDung = phanhoidetail.NoiDung,
                HinhAnhPhanHoi = phanhoidetail.HinhAnhPhanHoi,
            };
            _context.PHANHOI.Add(newPHANHOI);
            await _context.SaveChangesAsync();
            var result = new PHANHOIDetailDTO
            {
                IDPhanHoi = newPHANHOI.IDPhanHoi,
                IDNguoiDung = newPHANHOI.IDNguoiDung,
                TenNguoiDung = newPHANHOI.TenNguoiDung,
                Email = newPHANHOI.Email,
                NoiDung = newPHANHOI.NoiDung,
                HinhAnhPhanHoi =newPHANHOI.HinhAnhPhanHoi,
            };
            return CreatedAtAction(nameof(GetPHANHOIByID), new { id = result.IDPhanHoi }, result);
        }
         [HttpDelete("Delete/{id}")]

        public async Task<IActionResult> DeletePHANHOI(string id)
        {
            var phanhoi = await _context.PHANHOI.FindAsync(id);
            if (phanhoi == null)
            {
                return NotFound();
            }

            _context.PHANHOI.Remove(phanhoi);
            await _context.SaveChangesAsync();

            return NoContent();
        }
        // [HttpPost("Image")]
        // public async Task<ActionResult<string>> Image(IFormFile file)
        // {
        //     try
        //     {
        //         if (file == null || file.Length == 0)
        //             return BadRequest("File is empty");

        //         var fileName = Guid.NewGuid().ToString() + Path.GetExtension(file.FileName);
        //         var filePath = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "hinhAnh", fileName);

        //         // Đảm bảo thư mục tồn tại
        //         Directory.CreateDirectory(Path.GetDirectoryName(filePath));

        //         using (var stream = new FileStream(filePath, FileMode.Create))
        //         {
        //             await file.CopyToAsync(stream);
        //         }

        //         var url = $"/hinhAnh/{fileName}";
        //         return Ok(url);
        //     }
        //     catch (Exception ex)
        //     {
        //         // Log lỗi
        //         Console.WriteLine($"Error in UploadImage: {ex.Message}");
        //         return StatusCode(500, $"Internal server error: {ex.Message}");
        //     }
        // }
         [HttpGet("hinhAnh/{fileName}")]
        public IActionResult GetImage(string fileName)
        {
            var imagePath = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "hinhAnh", fileName);

            if (!System.IO.File.Exists(imagePath))
            {
                return NotFound("Image not found");
            }

            var imageFileStream = System.IO.File.OpenRead(imagePath);
            return File(imageFileStream, "image/jpeg"); // Adjust content type if needed
        }
            [HttpPost("UploadImageFeedback")]
        public async Task<ActionResult<string>> UploadImage(IFormFile file)
        {
            try
            {
                if (file == null || file.Length == 0)
                    return BadRequest("File is empty");

                var fileName = Guid.NewGuid().ToString() + Path.GetExtension(file.FileName);
                var filePath = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "hinhAnh", fileName);

                // Đảm bảo thư mục tồn tại
                Directory.CreateDirectory(Path.GetDirectoryName(filePath));

                using (var stream = new FileStream(filePath, FileMode.Create))
                {
                    await file.CopyToAsync(stream);
                }

                var url = $"/hinhAnh/{fileName}";
                return Ok(url);
            }
            catch (Exception ex)
            {
                // Log lỗi
                Console.WriteLine($"Error in UploadImage: {ex.Message}");
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }
                private bool PHANHOIExists(string id)
        {
            return _context.PHANHOI.Any(e => e.IDPhanHoi== id);
        }
    }
}