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
    public class ApplicationDBContext : IdentityDbContext<ADMIN>
    {
        public ApplicationDBContext(DbContextOptions<ApplicationDBContext> options) : base(options)
        {

        }

        public DbSet<DANHMUCSANPHAM> DANHMUCSANPHAM { get; set; }
        public DbSet<NHACUNGCAP> NHACUNGCAP { get; set; }
        public DbSet<SANPHAM> SANPHAM { get; set; }
        public DbSet<TAIKHOAN> TAIKHOAN { get; set; }
        public DbSet<ADMIN> ADMIN { get; set; }
        public DbSet<DONHANG> DONHANG { get; set; }
        public DbSet<CHITIETDONHANG> CHITIETDONHANG { get; set; }
        public DbSet<GIOHANG> GIOHANG { get; set; }
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
        modelBuilder.Entity<SANPHAM>()
        .HasKey(s => s.IDSanPham);
        base.OnModelCreating(modelBuilder);
        modelBuilder.Entity<TAIKHOAN>()
        .HasKey(t => t.IDTaiKhoan);
        base.OnModelCreating(modelBuilder);
        modelBuilder.Entity<ADMIN>()
        .HasKey(a => a.IDAdmin);
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
    }
         }
}