// using back_end.Data;
// using Microsoft.AspNetCore.Identity;
// using Microsoft.EntityFrameworkCore;
// using back_end.Models;
// var builder = WebApplication.CreateBuilder(args);

// // Add services to the container.
// builder.Services.AddControllers();
// builder.Services.AddEndpointsApiExplorer();
// builder.Services.AddSwaggerGen();

// // Cấu hình CORS
// builder.Services.AddCors(options =>
// {
//     options.AddPolicy("AllowAllOrigins",
//         builder =>
//         {
//             builder.AllowAnyOrigin()
//                    .AllowAnyHeader()
//                    .AllowAnyMethod();
//         });
// });

// // Cấu hình DbContext
// builder.Services.AddDbContext<ApplicationDBContext>(options =>
//     options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

// // Cấu hình Identity cho ADMIN
// builder.Services.AddIdentity<ADMIN, IdentityRole>()
//     .AddEntityFrameworkStores<ApplicationDBContext>()
//     .AddDefaultTokenProviders();

// // Cấu hình phân quyền
// builder.Services.AddAuthorization(options =>
// {
//     options.AddPolicy("Admin", policy => policy.RequireRole("Admin"));
//     options.AddPolicy("NguoiDung", policy => policy.RequireRole("NguoiDung"));
// });

// var app = builder.Build();
// // Gọi phương thức tạo vai trò tại đây
// using (var scope = app.Services.CreateScope())
// {
//     var serviceProvider = scope.ServiceProvider;
//     await CreateRoles(serviceProvider);
// }
// async Task CreateRoles(IServiceProvider serviceProvider)
// {
//     var roleManager = serviceProvider.GetRequiredService<RoleManager<IdentityRole>>();

//     // Tạo vai trò Admin nếu chưa tồn tại
//     if (!await roleManager.RoleExistsAsync("Admin"))
//     {
//         await roleManager.CreateAsync(new IdentityRole("Admin"));
//     }

//     // Tạo vai trò NguoiDung nếu chưa tồn tại
//     if (!await roleManager.RoleExistsAsync("NguoiDung"))
//     {
//         await roleManager.CreateAsync(new IdentityRole("NguoiDung"));
//     }
// }

// // Configure the HTTP request pipeline.
// if (app.Environment.IsDevelopment())
// {
//     app.UseSwagger();
//     app.UseSwaggerUI();
// }

// app.UseHttpsRedirection();
// app.UseAuthentication(); // Đảm bảo gọi trước UseAuthorization
// app.UseAuthorization();

// // Sử dụng CORS
// app.UseCors("AllowAllOrigins");

// app.MapControllers();

// app.Run();
using back_end.Data;
using back_end.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// Cấu hình CORS
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAllOrigins",
        builder =>
        {
            builder.AllowAnyOrigin()
                   .AllowAnyHeader()
                   .AllowAnyMethod();
        });
});

// Cấu hình DbContext
builder.Services.AddDbContext<ApplicationDBContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

// Cấu hình Identity cho NGUOIDUNG
builder.Services.AddIdentity<NGUOIDUNG, IdentityRole>()
    .AddEntityFrameworkStores<ApplicationDBContext>()
    .AddDefaultTokenProviders();


    builder.Services.AddScoped<UserManager<NGUOIDUNG>>();

builder.Services.AddScoped<SignInManager<NGUOIDUNG>>();


// Cấu hình phân quyền
builder.Services.AddAuthorization(options =>
{
    options.AddPolicy("Admin", policy => policy.RequireRole("Admin"));
    options.AddPolicy("NguoiDung", policy => policy.RequireRole("NguoiDung"));
});

var app = builder.Build();

// Tạo vai trò và tài khoản admin thủ công
using (var scope = app.Services.CreateScope())
{
    var serviceProvider = scope.ServiceProvider;
    await CreateRoles(serviceProvider);
    await CreateAdminAccount(serviceProvider); // Tạo tài khoản ADMIN
}

async Task CreateRoles(IServiceProvider serviceProvider)
{
    var roleManager = serviceProvider.GetRequiredService<RoleManager<IdentityRole>>();

    // Tạo vai trò Admin nếu chưa tồn tại
    if (!await roleManager.RoleExistsAsync("Admin"))
    {
        await roleManager.CreateAsync(new IdentityRole("Admin"));
    }

    // Tạo vai trò NguoiDung nếu chưa tồn tại
    if (!await roleManager.RoleExistsAsync("NguoiDung"))
    {
        await roleManager.CreateAsync(new IdentityRole("NguoiDung"));
    }
}

async Task CreateAdminAccount(IServiceProvider serviceProvider)
{
    var userManager = serviceProvider.GetRequiredService<UserManager<NGUOIDUNG>>();

    // Kiểm tra xem tài khoản ADMIN có tồn tại không
    string adminEmail = "admin@gmail.com";
    string adminPassword = "Admin@123";
    string adminUserName = "admin";

    var adminUser = await userManager.FindByNameAsync(adminUserName);
    if (adminUser == null)
    {
        var admin = new NGUOIDUNG
        {
            UserName = adminUserName,
            Email = adminEmail,
            TenNguoiDung = "Admin",
            Role = "Admin",
            PhoneNumber = "0123456789"
        };

        var createAdminResult = await userManager.CreateAsync(admin, adminPassword);

        if (createAdminResult.Succeeded)
        {
            await userManager.AddToRoleAsync(admin, "Admin");
        }
        else
        {
            // Xử lý lỗi nếu có
            throw new Exception("Lỗi khi tạo tài khoản Admin: " + string.Join(", ", createAdminResult.Errors.Select(e => e.Description)));
        }
    }
}

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.UseAuthentication(); // Đảm bảo gọi trước UseAuthorization
app.UseAuthorization();

// Sử dụng CORS
app.UseCors("AllowAllOrigins");

app.MapControllers();

app.Run();
