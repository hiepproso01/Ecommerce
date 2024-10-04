using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace back_end.Migrations
{
    /// <inheritdoc />
    public partial class init1 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_DANHMUCSANPHAM_NHOMDANHMUC_NhomDanhMucIDNhomDanhMuc",
                table: "DANHMUCSANPHAM");

            migrationBuilder.DropIndex(
                name: "IX_DANHMUCSANPHAM_NhomDanhMucIDNhomDanhMuc",
                table: "DANHMUCSANPHAM");

            migrationBuilder.DropColumn(
                name: "NhomDanhMucIDNhomDanhMuc",
                table: "DANHMUCSANPHAM");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "NhomDanhMucIDNhomDanhMuc",
                table: "DANHMUCSANPHAM",
                type: "nvarchar(450)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.CreateIndex(
                name: "IX_DANHMUCSANPHAM_NhomDanhMucIDNhomDanhMuc",
                table: "DANHMUCSANPHAM",
                column: "NhomDanhMucIDNhomDanhMuc");

            migrationBuilder.AddForeignKey(
                name: "FK_DANHMUCSANPHAM_NHOMDANHMUC_NhomDanhMucIDNhomDanhMuc",
                table: "DANHMUCSANPHAM",
                column: "NhomDanhMucIDNhomDanhMuc",
                principalTable: "NHOMDANHMUC",
                principalColumn: "IDNhomDanhMuc",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
