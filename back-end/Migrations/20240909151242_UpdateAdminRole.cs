using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace back_end.Migrations
{
    /// <inheritdoc />
    public partial class UpdateAdminRole : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "TenAdmin",
                table: "AspNetUsers",
                newName: "TenNguoiDung");

            migrationBuilder.RenameColumn(
                name: "Position",
                table: "AspNetUsers",
                newName: "Role");

            migrationBuilder.RenameColumn(
                name: "IDAdmin",
                table: "AspNetUsers",
                newName: "IDNguoiDung");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "TenNguoiDung",
                table: "AspNetUsers",
                newName: "TenAdmin");

            migrationBuilder.RenameColumn(
                name: "Role",
                table: "AspNetUsers",
                newName: "Position");

            migrationBuilder.RenameColumn(
                name: "IDNguoiDung",
                table: "AspNetUsers",
                newName: "IDAdmin");
        }
    }
}
