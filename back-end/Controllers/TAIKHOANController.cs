using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity;
using back_end.Models;
using back_end.Data;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using back_end.DTOs;
using Microsoft.AspNetCore.Authorization;

namespace back_end.Controllers
{
    [Route("api/taikhoan")]
    [ApiController]
    public class TAIKHOANController : ControllerBase
    {
        private readonly ApplicationDBContext _context;
        private readonly UserManager<TAIKHOAN> _userManager;
        private readonly SignInManager<TAIKHOAN> _signInManager;
        private readonly RoleManager<IdentityRole> _roleManager;
        private readonly IConfiguration _configuration;

        public TAIKHOANController(ApplicationDBContext context, UserManager<TAIKHOAN> userManager,SignInManager<TAIKHOAN> signInManager,RoleManager<IdentityRole> roleManager,IConfiguration configuration)
        {
             _context = context;
            _userManager = userManager;
            _signInManager = signInManager;
            _roleManager = roleManager;
            _configuration = configuration;
        }

        [HttpGet("GetAll")]
        public async Task<ActionResult<IEnumerable<TAIKHOAN>>> GetTAIKHOAN()
        {
            return await _context.TAIKHOAN.ToListAsync();
        }

        [HttpGet("GetByID/{id}")]
        public async Task<ActionResult<TAIKHOAN>> GetTAIKHOANByID(int id)
        {
            var nguoidung = await _context.TAIKHOAN.FindAsync(id);
            if(nguoidung == null)
            {
                return NotFound();
            }
            return nguoidung;
        }

        [HttpPost("Create")]
        public async Task<ActionResult> CreateTAIKHOAN([FromBody] DANGKYNGUOIDUNG dangKyNguoiDung)
        {
           if(ModelState.IsValid)
           {
            var user = new TAIKHOAN
            {
                UserName = dangKyNguoiDung.UserName,
                TenNguoiDung = dangKyNguoiDung.TenNguoiDung,
                Email = dangKyNguoiDung.Email,
                PhoneNumber = dangKyNguoiDung.PhoneNumber,
                Address = dangKyNguoiDung.Address,

            };
            var result = await _userManager.CreateAsync(user, dangKyNguoiDung.Password);
           if(result.Succeeded)
            {
               if(await _roleManager.RoleExistsAsync("NguoiDung"))
               {
                await _userManager.AddToRoleAsync(user, "NguoiDung");
               }else{
                return BadRequest("One or more roles do not exist.");
               }
                await _signInManager.SignInAsync(user, isPersistent: false);
               return Ok(new { message = "Đăng ký thành công." });
            }
            
           return BadRequest(result.Errors);   
        }
        return BadRequest(ModelState);
}

        [HttpPost("Login")]
        public async Task<IActionResult> Login([FromBody] DANGNHAPNGUOIDUNG dangNhapNguoiDung)
        {
            if(ModelState.IsValid)
            {
                var result = await _signInManager.PasswordSignInAsync(dangNhapNguoiDung.UserName, dangNhapNguoiDung.Password, dangNhapNguoiDung.RememberMe, lockoutOnFailure: false);
                if(result.Succeeded)
                {
                    var user = await _userManager.FindByNameAsync(dangNhapNguoiDung.UserName);
                    var token = GenerateJwtToken(user);
                    return Ok(new { user, token, message = "Đăng nhập thành công." });
                }
                return Unauthorized(new { message = "Đăng nhập thất bại." });
            }
            return BadRequest(ModelState);
        }
         private string GenerateJwtToken(TAIKHOAN user)
{
    var tokenHandler = new JwtSecurityTokenHandler();
    var key = Encoding.ASCII.GetBytes(_configuration["Jwt:Key"]);
    var tokenDescriptor = new SecurityTokenDescriptor
    {
        Subject = new ClaimsIdentity(new Claim[]
        {
            new Claim(ClaimTypes.Name, user.UserName) // Ensure this property exists in ADMIN class
        }),
        Expires = DateTime.UtcNow.AddHours(1),
        Issuer = _configuration["Jwt:Issuer"],
        Audience = _configuration["Jwt:Issuer"],
        SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
    };
    var token = tokenHandler.CreateToken(tokenDescriptor);
    return tokenHandler.WriteToken(token);
}
[Authorize(Roles = "NguoiDung")]
[HttpPut("Update/{id}")]
public async Task<IActionResult> UpdateNguoiDung(int id, TAIKHOAN nguoiDung)
{
    if (id != nguoiDung.IDTaiKhoan)
    {
        return BadRequest();
    }
    _context.Entry(nguoiDung).State = EntityState.Modified;
        try
    {
        await _context.SaveChangesAsync();
       
    }
    catch (DbUpdateConcurrencyException)
    {
        if (!NguoiDungExists(id))
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
        public async Task<IActionResult> DeleteNguoiDung(int id)
        {
            var nguoidung = await _context.TAIKHOAN.FindAsync(id);
            if (nguoidung == null)
            {
                return NotFound();
            }
            _context.TAIKHOAN.Remove(nguoidung);
            await _context.SaveChangesAsync();
            return NoContent();
        }
 private bool NguoiDungExists(int id)
        {
            return _context.TAIKHOAN.Any(e => e.IDTaiKhoan == id);
        }
}
}
