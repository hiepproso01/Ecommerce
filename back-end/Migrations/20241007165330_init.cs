using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace back_end.Migrations
{
    /// <inheritdoc />
    public partial class init : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "AspNetRoles",
                columns: table => new
                {
                    Id = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    Name = table.Column<string>(type: "nvarchar(256)", maxLength: 256, nullable: true),
                    NormalizedName = table.Column<string>(type: "nvarchar(256)", maxLength: 256, nullable: true),
                    ConcurrencyStamp = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AspNetRoles", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "AspNetUsers",
                columns: table => new
                {
                    Id = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    IDNguoiDung = table.Column<int>(type: "int", nullable: false),
                    TenNguoiDung = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Role = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Address = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    PhoneNumber = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    UserName = table.Column<string>(type: "nvarchar(256)", maxLength: 256, nullable: true),
                    NormalizedUserName = table.Column<string>(type: "nvarchar(256)", maxLength: 256, nullable: true),
                    Email = table.Column<string>(type: "nvarchar(256)", maxLength: 256, nullable: true),
                    NormalizedEmail = table.Column<string>(type: "nvarchar(256)", maxLength: 256, nullable: true),
                    EmailConfirmed = table.Column<bool>(type: "bit", nullable: false),
                    PasswordHash = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    SecurityStamp = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ConcurrencyStamp = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    PhoneNumberConfirmed = table.Column<bool>(type: "bit", nullable: false),
                    TwoFactorEnabled = table.Column<bool>(type: "bit", nullable: false),
                    LockoutEnd = table.Column<DateTimeOffset>(type: "datetimeoffset", nullable: true),
                    LockoutEnabled = table.Column<bool>(type: "bit", nullable: false),
                    AccessFailedCount = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AspNetUsers", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "NHACUNGCAP",
                columns: table => new
                {
                    IDNhaCungCap = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    TenNhaCungCap = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_NHACUNGCAP", x => x.IDNhaCungCap);
                });

            migrationBuilder.CreateTable(
                name: "NHOMDANHMUC",
                columns: table => new
                {
                    IDNhomDanhMuc = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    TenNhomDanhMuc = table.Column<string>(type: "nvarchar(450)", maxLength: 450, nullable: false),
                    HinhAnhNhomDanhMuc = table.Column<string>(type: "nvarchar(1000)", maxLength: 1000, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_NHOMDANHMUC", x => x.IDNhomDanhMuc);
                });

            migrationBuilder.CreateTable(
                name: "TAIKHOAN",
                columns: table => new
                {
                    IDTaiKhoan = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    TenNguoiDung = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Address = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Id = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    UserName = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    NormalizedUserName = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Email = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    NormalizedEmail = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    EmailConfirmed = table.Column<bool>(type: "bit", nullable: false),
                    PasswordHash = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    SecurityStamp = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ConcurrencyStamp = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    PhoneNumber = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    PhoneNumberConfirmed = table.Column<bool>(type: "bit", nullable: false),
                    TwoFactorEnabled = table.Column<bool>(type: "bit", nullable: false),
                    LockoutEnd = table.Column<DateTimeOffset>(type: "datetimeoffset", nullable: true),
                    LockoutEnabled = table.Column<bool>(type: "bit", nullable: false),
                    AccessFailedCount = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TAIKHOAN", x => x.IDTaiKhoan);
                });

            migrationBuilder.CreateTable(
                name: "AspNetRoleClaims",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    RoleId = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    ClaimType = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ClaimValue = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AspNetRoleClaims", x => x.Id);
                    table.ForeignKey(
                        name: "FK_AspNetRoleClaims_AspNetRoles_RoleId",
                        column: x => x.RoleId,
                        principalTable: "AspNetRoles",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "AspNetUserClaims",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    UserId = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    ClaimType = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ClaimValue = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AspNetUserClaims", x => x.Id);
                    table.ForeignKey(
                        name: "FK_AspNetUserClaims_AspNetUsers_UserId",
                        column: x => x.UserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "AspNetUserLogins",
                columns: table => new
                {
                    LoginProvider = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    ProviderKey = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    ProviderDisplayName = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    UserId = table.Column<string>(type: "nvarchar(450)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AspNetUserLogins", x => new { x.LoginProvider, x.ProviderKey });
                    table.ForeignKey(
                        name: "FK_AspNetUserLogins_AspNetUsers_UserId",
                        column: x => x.UserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "AspNetUserRoles",
                columns: table => new
                {
                    UserId = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    RoleId = table.Column<string>(type: "nvarchar(450)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AspNetUserRoles", x => new { x.UserId, x.RoleId });
                    table.ForeignKey(
                        name: "FK_AspNetUserRoles_AspNetRoles_RoleId",
                        column: x => x.RoleId,
                        principalTable: "AspNetRoles",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_AspNetUserRoles_AspNetUsers_UserId",
                        column: x => x.UserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "AspNetUserTokens",
                columns: table => new
                {
                    UserId = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    LoginProvider = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    Name = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    Value = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AspNetUserTokens", x => new { x.UserId, x.LoginProvider, x.Name });
                    table.ForeignKey(
                        name: "FK_AspNetUserTokens_AspNetUsers_UserId",
                        column: x => x.UserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "DANHMUCSANPHAM",
                columns: table => new
                {
                    IDDanhMuc = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    TenDanhMuc = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    SoLuongSanPham = table.Column<int>(type: "int", nullable: false),
                    IDNhomDanhMuc = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    TenNhomDanhMuc = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    HinhAnhDanhMuc = table.Column<string>(type: "nvarchar(1000)", maxLength: 1000, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_DANHMUCSANPHAM", x => x.IDDanhMuc);
                    table.ForeignKey(
                        name: "FK_DANHMUCSANPHAM_NHOMDANHMUC_IDNhomDanhMuc",
                        column: x => x.IDNhomDanhMuc,
                        principalTable: "NHOMDANHMUC",
                        principalColumn: "IDNhomDanhMuc",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "DONHANG",
                columns: table => new
                {
                    IDDonHang = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    IDTaiKhoan = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    NgayDatHang = table.Column<DateTime>(type: "datetime2", nullable: false),
                    TongTien = table.Column<decimal>(type: "decimal(18,2)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_DONHANG", x => x.IDDonHang);
                    table.ForeignKey(
                        name: "FK_DONHANG_TAIKHOAN_IDTaiKhoan",
                        column: x => x.IDTaiKhoan,
                        principalTable: "TAIKHOAN",
                        principalColumn: "IDTaiKhoan",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "GIOHANG",
                columns: table => new
                {
                    IDGioHang = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    IDTaiKhoan = table.Column<string>(type: "nvarchar(450)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_GIOHANG", x => x.IDGioHang);
                    table.ForeignKey(
                        name: "FK_GIOHANG_TAIKHOAN_IDTaiKhoan",
                        column: x => x.IDTaiKhoan,
                        principalTable: "TAIKHOAN",
                        principalColumn: "IDTaiKhoan",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "SANPHAM",
                columns: table => new
                {
                    IDSanPham = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    TenSanPham = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    DonViTinh = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    SoLuongNhap = table.Column<int>(type: "int", nullable: false),
                    MoTa = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    GiaNhap = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    GiaBan = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    IDDanhMuc = table.Column<string>(type: "nvarchar(450)", maxLength: 450, nullable: false),
                    TenDanhMuc = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    IDNhaCungCap = table.Column<string>(type: "nvarchar(450)", maxLength: 450, nullable: false),
                    TenNhaCungCap = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    HinhAnh = table.Column<string>(type: "nvarchar(1000)", maxLength: 1000, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_SANPHAM", x => x.IDSanPham);
                    table.ForeignKey(
                        name: "FK_SANPHAM_DANHMUCSANPHAM_IDDanhMuc",
                        column: x => x.IDDanhMuc,
                        principalTable: "DANHMUCSANPHAM",
                        principalColumn: "IDDanhMuc",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_SANPHAM_NHACUNGCAP_IDNhaCungCap",
                        column: x => x.IDNhaCungCap,
                        principalTable: "NHACUNGCAP",
                        principalColumn: "IDNhaCungCap",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "CHITIETDONHANG",
                columns: table => new
                {
                    IDChiTietDonHang = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    IDDonHang = table.Column<string>(type: "nvarchar(450)", maxLength: 450, nullable: false),
                    IDSanPham = table.Column<string>(type: "nvarchar(450)", maxLength: 450, nullable: false),
                    SoLuong = table.Column<int>(type: "int", nullable: false),
                    DonGia = table.Column<double>(type: "float", nullable: false),
                    ThanhTien = table.Column<double>(type: "float", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CHITIETDONHANG", x => x.IDChiTietDonHang);
                    table.ForeignKey(
                        name: "FK_CHITIETDONHANG_DONHANG_IDDonHang",
                        column: x => x.IDDonHang,
                        principalTable: "DONHANG",
                        principalColumn: "IDDonHang",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_CHITIETDONHANG_SANPHAM_IDSanPham",
                        column: x => x.IDSanPham,
                        principalTable: "SANPHAM",
                        principalColumn: "IDSanPham",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "CHITIETGIOHANG",
                columns: table => new
                {
                    IDChiTietGioHang = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    IDGioHang = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    IDSanPham = table.Column<string>(type: "nvarchar(450)", maxLength: 450, nullable: false),
                    SoLuong = table.Column<int>(type: "int", nullable: false),
                    DonGia = table.Column<double>(type: "float", nullable: false),
                    ThanhTien = table.Column<double>(type: "float", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CHITIETGIOHANG", x => x.IDChiTietGioHang);
                    table.ForeignKey(
                        name: "FK_CHITIETGIOHANG_GIOHANG_IDGioHang",
                        column: x => x.IDGioHang,
                        principalTable: "GIOHANG",
                        principalColumn: "IDGioHang",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_CHITIETGIOHANG_SANPHAM_IDSanPham",
                        column: x => x.IDSanPham,
                        principalTable: "SANPHAM",
                        principalColumn: "IDSanPham",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_AspNetRoleClaims_RoleId",
                table: "AspNetRoleClaims",
                column: "RoleId");

            migrationBuilder.CreateIndex(
                name: "RoleNameIndex",
                table: "AspNetRoles",
                column: "NormalizedName",
                unique: true,
                filter: "[NormalizedName] IS NOT NULL");

            migrationBuilder.CreateIndex(
                name: "IX_AspNetUserClaims_UserId",
                table: "AspNetUserClaims",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_AspNetUserLogins_UserId",
                table: "AspNetUserLogins",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_AspNetUserRoles_RoleId",
                table: "AspNetUserRoles",
                column: "RoleId");

            migrationBuilder.CreateIndex(
                name: "EmailIndex",
                table: "AspNetUsers",
                column: "NormalizedEmail");

            migrationBuilder.CreateIndex(
                name: "UserNameIndex",
                table: "AspNetUsers",
                column: "NormalizedUserName",
                unique: true,
                filter: "[NormalizedUserName] IS NOT NULL");

            migrationBuilder.CreateIndex(
                name: "IX_CHITIETDONHANG_IDDonHang",
                table: "CHITIETDONHANG",
                column: "IDDonHang");

            migrationBuilder.CreateIndex(
                name: "IX_CHITIETDONHANG_IDSanPham",
                table: "CHITIETDONHANG",
                column: "IDSanPham");

            migrationBuilder.CreateIndex(
                name: "IX_CHITIETGIOHANG_IDGioHang",
                table: "CHITIETGIOHANG",
                column: "IDGioHang");

            migrationBuilder.CreateIndex(
                name: "IX_CHITIETGIOHANG_IDSanPham",
                table: "CHITIETGIOHANG",
                column: "IDSanPham");

            migrationBuilder.CreateIndex(
                name: "IX_DANHMUCSANPHAM_IDNhomDanhMuc",
                table: "DANHMUCSANPHAM",
                column: "IDNhomDanhMuc");

            migrationBuilder.CreateIndex(
                name: "IX_DONHANG_IDTaiKhoan",
                table: "DONHANG",
                column: "IDTaiKhoan");

            migrationBuilder.CreateIndex(
                name: "IX_GIOHANG_IDTaiKhoan",
                table: "GIOHANG",
                column: "IDTaiKhoan");

            migrationBuilder.CreateIndex(
                name: "IX_SANPHAM_IDDanhMuc",
                table: "SANPHAM",
                column: "IDDanhMuc");

            migrationBuilder.CreateIndex(
                name: "IX_SANPHAM_IDNhaCungCap",
                table: "SANPHAM",
                column: "IDNhaCungCap");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "AspNetRoleClaims");

            migrationBuilder.DropTable(
                name: "AspNetUserClaims");

            migrationBuilder.DropTable(
                name: "AspNetUserLogins");

            migrationBuilder.DropTable(
                name: "AspNetUserRoles");

            migrationBuilder.DropTable(
                name: "AspNetUserTokens");

            migrationBuilder.DropTable(
                name: "CHITIETDONHANG");

            migrationBuilder.DropTable(
                name: "CHITIETGIOHANG");

            migrationBuilder.DropTable(
                name: "AspNetRoles");

            migrationBuilder.DropTable(
                name: "AspNetUsers");

            migrationBuilder.DropTable(
                name: "DONHANG");

            migrationBuilder.DropTable(
                name: "GIOHANG");

            migrationBuilder.DropTable(
                name: "SANPHAM");

            migrationBuilder.DropTable(
                name: "TAIKHOAN");

            migrationBuilder.DropTable(
                name: "DANHMUCSANPHAM");

            migrationBuilder.DropTable(
                name: "NHACUNGCAP");

            migrationBuilder.DropTable(
                name: "NHOMDANHMUC");
        }
    }
}
