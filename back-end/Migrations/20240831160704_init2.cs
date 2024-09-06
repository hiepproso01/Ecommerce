using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace back_end.Migrations
{
    /// <inheritdoc />
    public partial class init2 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_DONHANG_TAIKHOAN_TAIKHOANIDTaiKhoan",
                table: "DONHANG");

            migrationBuilder.DropForeignKey(
                name: "FK_GIOHANG_TAIKHOAN_TAIKHOANIDTaiKhoan",
                table: "GIOHANG");

            migrationBuilder.DropColumn(
                name: "DiaChi",
                table: "TAIKHOAN");

            migrationBuilder.DropColumn(
                name: "MatKhau",
                table: "TAIKHOAN");

            migrationBuilder.DropColumn(
                name: "MatKhauMaHoa",
                table: "TAIKHOAN");

            migrationBuilder.DropColumn(
                name: "PhanQuyen",
                table: "TAIKHOAN");

            migrationBuilder.RenameColumn(
                name: "TenDangNhap",
                table: "TAIKHOAN",
                newName: "Address");

            migrationBuilder.RenameColumn(
                name: "SoDienThoai",
                table: "TAIKHOAN",
                newName: "AccessFailedCount");

            migrationBuilder.AlterColumn<string>(
                name: "Email",
                table: "TAIKHOAN",
                type: "nvarchar(max)",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)");

            migrationBuilder.AddColumn<string>(
                name: "ConcurrencyStamp",
                table: "TAIKHOAN",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "EmailConfirmed",
                table: "TAIKHOAN",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<string>(
                name: "Id",
                table: "TAIKHOAN",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "LockoutEnabled",
                table: "TAIKHOAN",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<DateTimeOffset>(
                name: "LockoutEnd",
                table: "TAIKHOAN",
                type: "datetimeoffset",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "NormalizedEmail",
                table: "TAIKHOAN",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "NormalizedUserName",
                table: "TAIKHOAN",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "PasswordHash",
                table: "TAIKHOAN",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "PhoneNumber",
                table: "TAIKHOAN",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "PhoneNumberConfirmed",
                table: "TAIKHOAN",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<string>(
                name: "SecurityStamp",
                table: "TAIKHOAN",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "TwoFactorEnabled",
                table: "TAIKHOAN",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<string>(
                name: "UserName",
                table: "TAIKHOAN",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AlterColumn<int>(
                name: "TAIKHOANIDTaiKhoan",
                table: "GIOHANG",
                type: "int",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AlterColumn<int>(
                name: "TAIKHOANIDTaiKhoan",
                table: "DONHANG",
                type: "int",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AddForeignKey(
                name: "FK_DONHANG_TAIKHOAN_TAIKHOANIDTaiKhoan",
                table: "DONHANG",
                column: "TAIKHOANIDTaiKhoan",
                principalTable: "TAIKHOAN",
                principalColumn: "IDTaiKhoan");

            migrationBuilder.AddForeignKey(
                name: "FK_GIOHANG_TAIKHOAN_TAIKHOANIDTaiKhoan",
                table: "GIOHANG",
                column: "TAIKHOANIDTaiKhoan",
                principalTable: "TAIKHOAN",
                principalColumn: "IDTaiKhoan");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_DONHANG_TAIKHOAN_TAIKHOANIDTaiKhoan",
                table: "DONHANG");

            migrationBuilder.DropForeignKey(
                name: "FK_GIOHANG_TAIKHOAN_TAIKHOANIDTaiKhoan",
                table: "GIOHANG");

            migrationBuilder.DropColumn(
                name: "ConcurrencyStamp",
                table: "TAIKHOAN");

            migrationBuilder.DropColumn(
                name: "EmailConfirmed",
                table: "TAIKHOAN");

            migrationBuilder.DropColumn(
                name: "Id",
                table: "TAIKHOAN");

            migrationBuilder.DropColumn(
                name: "LockoutEnabled",
                table: "TAIKHOAN");

            migrationBuilder.DropColumn(
                name: "LockoutEnd",
                table: "TAIKHOAN");

            migrationBuilder.DropColumn(
                name: "NormalizedEmail",
                table: "TAIKHOAN");

            migrationBuilder.DropColumn(
                name: "NormalizedUserName",
                table: "TAIKHOAN");

            migrationBuilder.DropColumn(
                name: "PasswordHash",
                table: "TAIKHOAN");

            migrationBuilder.DropColumn(
                name: "PhoneNumber",
                table: "TAIKHOAN");

            migrationBuilder.DropColumn(
                name: "PhoneNumberConfirmed",
                table: "TAIKHOAN");

            migrationBuilder.DropColumn(
                name: "SecurityStamp",
                table: "TAIKHOAN");

            migrationBuilder.DropColumn(
                name: "TwoFactorEnabled",
                table: "TAIKHOAN");

            migrationBuilder.DropColumn(
                name: "UserName",
                table: "TAIKHOAN");

            migrationBuilder.RenameColumn(
                name: "Address",
                table: "TAIKHOAN",
                newName: "TenDangNhap");

            migrationBuilder.RenameColumn(
                name: "AccessFailedCount",
                table: "TAIKHOAN",
                newName: "SoDienThoai");

            migrationBuilder.AlterColumn<string>(
                name: "Email",
                table: "TAIKHOAN",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "nvarchar(max)",
                oldNullable: true);

            migrationBuilder.AddColumn<string>(
                name: "DiaChi",
                table: "TAIKHOAN",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "MatKhau",
                table: "TAIKHOAN",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "MatKhauMaHoa",
                table: "TAIKHOAN",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "PhanQuyen",
                table: "TAIKHOAN",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AlterColumn<int>(
                name: "TAIKHOANIDTaiKhoan",
                table: "GIOHANG",
                type: "int",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.AlterColumn<int>(
                name: "TAIKHOANIDTaiKhoan",
                table: "DONHANG",
                type: "int",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_DONHANG_TAIKHOAN_TAIKHOANIDTaiKhoan",
                table: "DONHANG",
                column: "TAIKHOANIDTaiKhoan",
                principalTable: "TAIKHOAN",
                principalColumn: "IDTaiKhoan",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_GIOHANG_TAIKHOAN_TAIKHOANIDTaiKhoan",
                table: "GIOHANG",
                column: "TAIKHOANIDTaiKhoan",
                principalTable: "TAIKHOAN",
                principalColumn: "IDTaiKhoan",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
