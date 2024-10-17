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

    [Route("api/[controller]")]
    [ApiController]
    public class NGUOIDUNGController : ControllerBase
    {
        private readonly ApplicationDBContext _context;
        private readonly UserManager<NGUOIDUNG> _userManager;
        private readonly SignInManager<NGUOIDUNG> _signInManager;
        private readonly RoleManager<IdentityRole> _roleManager;
        private readonly IConfiguration _configuration;
 protected string GetCurrentUserId()
    {
        return User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
    }
        public NGUOIDUNGController(ApplicationDBContext context, UserManager<NGUOIDUNG> userManager, SignInManager<NGUOIDUNG> signInManager, RoleManager<IdentityRole> roleManager, IConfiguration configuration)
        {
            _context = context;
            _userManager = userManager;
            _signInManager = signInManager;
            _roleManager = roleManager;
            _configuration = configuration;
        }
        [HttpGet("GetAll")]
        public async Task<ActionResult<IEnumerable<NGUOIDUNG>>> GetAdmin()
        {
            return await _context.NGUOIDUNG.ToListAsync();
        }
        [HttpPost("GetbyId/{id}")]
        public async Task<ActionResult<NGUOIDUNG>> GetAdminById(string id)
        {
            var admin = await _context.NGUOIDUNG.FindAsync(id);
            if (admin == null)
            {
                return NotFound();
            }
            return admin;
        }
        // Thêm phương thức này vào cuối của lớp NGUOIDUNGController
private string GenerateUniqueCartId()
{
    return Guid.NewGuid().ToString().Substring(0, 20);
}
// private string GenerateUniquePaymentId()
// {
//     return Guid.NewGuid().ToString().Substring(0, 20);
// }
       [HttpPost("Register")]
public async Task<IActionResult> Register([FromBody] DANGKYADMIN dangKyAdmin)
{
    if(ModelState.IsValid)
    {
        var user = new NGUOIDUNG
        {
            UserName = dangKyAdmin.UserName,
            TenNguoiDung = dangKyAdmin.TenNguoiDung,
            // Password = dangKyAdmin.Password,
            Email = dangKyAdmin.Email,
            Role = dangKyAdmin.Role,
            PhoneNumber = dangKyAdmin.PhoneNumber,
            Address = dangKyAdmin.Address,
            IDGioHang = GenerateUniqueCartId(),
            // IDDonHang = GenerateUniquePaymentId()
        };
        var result = await _userManager.CreateAsync(user, dangKyAdmin.Password);
        if (result.Succeeded)
        {
           
           
            if (await _roleManager.RoleExistsAsync("Admin") )
            {
                await _userManager.AddToRoleAsync(user, "Admin");
            }
            else
            {
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
public async Task<IActionResult> Login([FromBody] DANGNHAPADMIN dangNhapAdmin)
{
    if (ModelState.IsValid)
    {
        var result = await _signInManager.PasswordSignInAsync(dangNhapAdmin.UserName, dangNhapAdmin.Password, dangNhapAdmin.RememberMe, lockoutOnFailure: false);

        if (result.Succeeded)
        {
            var user = await _userManager.FindByNameAsync(dangNhapAdmin.UserName);
            var token = GenerateJwtToken(user);
            var roles = await _userManager.GetRolesAsync(user);
           
    
            return Ok(new { user, token, roles, message = "Đăng nhập thành công." });
        }

        return Unauthorized(new { message = "Đăng nhập thất bại." });
    }
    return BadRequest(ModelState); // Ensure a return value in all code paths
}
    
        private string GenerateJwtToken(NGUOIDUNG user)
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

        [HttpPut("Update/{id}")]
        public async Task<IActionResult> UpdateAdmin(int id, NGUOIDUNG admin)
        {
            if (id != admin.IDNguoiDung)
            {
                return BadRequest();
            }
                _context.Entry(admin).State = EntityState.Modified;
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ADMINExists(id))
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
        public async Task<IActionResult> DeleteAdmin(int id)
        {
            var admin = await _context.NGUOIDUNG.FindAsync(id);
            if (admin == null)
            {
                return NotFound();
            }
            _context.NGUOIDUNG.Remove(admin);
            await _context.SaveChangesAsync();
            return NoContent();
        }

        private bool ADMINExists(int id)
        {
            return _context.NGUOIDUNG.Any(e => e.IDNguoiDung == id);
        }
    }
}