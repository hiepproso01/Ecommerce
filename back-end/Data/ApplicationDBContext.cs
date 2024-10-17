using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using back_end.Models;

namespace back_end.Data
{
    public class ApplicationDBContext : IdentityDbContext<NGUOIDUNG>
    {
        public ApplicationDBContext(DbContextOptions<ApplicationDBContext> options) : base(options)
        {

        }

        public DbSet<DANHMUCSANPHAM> DANHMUCSANPHAM { get; set; }
        public DbSet<NHACUNGCAP> NHACUNGCAP { get; set; }
        public DbSet<SANPHAM> SANPHAM { get; set; }
        public DbSet<TAIKHOAN> TAIKHOAN { get; set; }
        public DbSet<NGUOIDUNG> NGUOIDUNG { get; set; }
        public DbSet<DONHANG> DONHANG { get; set; }
        public DbSet<CHITIETDONHANG> CHITIETDONHANG { get; set; }
        public DbSet<GIOHANG> GIOHANG { get; set; }
        public DbSet<NHOMDANHMUC> NHOMDANHMUC { get; set; }
        public DbSet<CHITIETGIOHANG> CHITIETGIOHANG { get; set; }
    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        // modelBuilder.Entity<DANHMUCSANPHAM>().HasNoKey();
        modelBuilder.Entity<DANHMUCSANPHAM>()
        .HasKey(d => d.IDDanhMuc);
        base.OnModelCreating(modelBuilder);
        modelBuilder.Entity<NHACUNGCAP>()
        .HasKey(n => n.IDNhaCungCap);
         base.OnModelCreating(modelBuilder);
        modelBuilder.Entity<NHOMDANHMUC>()
        .HasKey(n => n.IDNhomDanhMuc);
        base.OnModelCreating(modelBuilder);
        modelBuilder.Entity<SANPHAM>()
        .HasKey(s => s.IDSanPham);
        base.OnModelCreating(modelBuilder);
        modelBuilder.Entity<TAIKHOAN>()
        .HasKey(t => t.IDTaiKhoan);
        base.OnModelCreating(modelBuilder);
        modelBuilder.Entity<NGUOIDUNG>()
        .HasKey(a => a.IDNguoiDung);
        base.OnModelCreating(modelBuilder);
        modelBuilder.Entity<DONHANG>()
        .HasKey(d => d.IDDonHang);
        base.OnModelCreating(modelBuilder);
        modelBuilder.Entity<CHITIETDONHANG>()
        .HasKey(c => c.IDChiTietDonHang);
        base.OnModelCreating(modelBuilder);
        modelBuilder.Entity<GIOHANG>()
        .HasKey(g => g.IDGioHang);
        base.OnModelCreating(modelBuilder);
        modelBuilder.Entity<CHITIETGIOHANG>()
        .HasKey(c => c.IDChiTietGioHang);
        base.OnModelCreating(modelBuilder);
         modelBuilder.Entity<GIOHANG>()
                .HasOne<NGUOIDUNG>()  // Chỉ định bảng liên kết là TAIKHOAN
                .WithMany()  // Không cần Navigation Property
                .HasForeignKey(g => g.IDNguoiDung)  // Chỉ định IDTaiKhoan là khóa ngoại
                .OnDelete(DeleteBehavior.Cascade);  // Xóa GIOHANG khi TAIKHOAN bị xóa
     base.OnModelCreating(modelBuilder);
         modelBuilder.Entity<DONHANG>()
                .HasOne<NGUOIDUNG>()  // Chỉ định bảng liên kết là TAIKHOAN
                .WithMany()  // Không cần Navigation Property
                .HasForeignKey(g => g.IDNguoiDung)  // Chỉ định IDTaiKhoan là khóa ngoại
                .OnDelete(DeleteBehavior.Cascade);  // Xóa GIOHANG khi TAIKHOAN bị xóa
         base.OnModelCreating(modelBuilder);
         modelBuilder.Entity<CHITIETDONHANG>()
                .HasOne<SANPHAM>()  // Chỉ định bảng liên kết là TAIKHOAN
                .WithMany()  // Không cần Navigation Property
                .HasForeignKey(g => g.IDSanPham)  // Chỉ định IDTaiKhoan là khóa ngoại
                .OnDelete(DeleteBehavior.Cascade);  // Xóa GIOHANG khi TAIKHOAN bị xóa
                 base.OnModelCreating(modelBuilder);
        base.OnModelCreating(modelBuilder);
         modelBuilder.Entity<CHITIETGIOHANG>()
                .HasOne<SANPHAM>()  // Chỉ định bảng liên kết là TAIKHOAN
                .WithMany()  // Không cần Navigation Property
                .HasForeignKey(g => g.IDSanPham)  // Chỉ định IDTaiKhoan là khóa ngoại
                .OnDelete(DeleteBehavior.Cascade);  // Xóa GIOHANG khi TAIKHOAN bị xóa
        base.OnModelCreating(modelBuilder);
         modelBuilder.Entity<SANPHAM>()
                .HasOne<DANHMUCSANPHAM>()  // Chỉ định bảng liên kết là TAIKHOAN
                .WithMany()  // Không cần Navigation Property
                .HasForeignKey(g => g.IDDanhMuc)  // Chỉ định IDTaiKhoan là khóa ngoại
                .OnDelete(DeleteBehavior.Cascade);  // Xóa GIOHANG khi TAIKHOAN bị xóa
        base.OnModelCreating(modelBuilder);
         modelBuilder.Entity<SANPHAM>()
                .HasOne<NHACUNGCAP>()  // Chỉ định bảng liên kết là TAIKHOAN
                .WithMany()  // Không cần Navigation Property
                .HasForeignKey(g => g.IDNhaCungCap)  // Chỉ định IDTaiKhoan là khóa ngoại
                .OnDelete(DeleteBehavior.Cascade);  // Xóa GIOHANG khi TAIKHOAN bị xóa

      base.OnModelCreating(modelBuilder);
modelBuilder.Entity<DANHMUCSANPHAM>()
    .HasOne<NHOMDANHMUC>()  // Chỉ định bảng liên kết là NHOMDANHMUC
    .WithMany()  // Không cần Navigation Property
    .HasForeignKey(g => g.IDNhomDanhMuc)  // Chỉ định IDNhomDanhMuc là khóa ngoại
    .OnDelete(DeleteBehavior.Restrict);  // Không cho phép xóa cascade khi NHOMDANHMUC bị xóa
// modelBuilder.Entity<CHITIETDONHANG>()
//     .HasOne(c => c.DONHANG)
//     .WithMany(d => d.CHITIETDONHANG)
//     .HasForeignKey(c => c.IDDonHang)
//     .HasPrincipalKey(d => d.IDDonHang);
   }
    
         }
}