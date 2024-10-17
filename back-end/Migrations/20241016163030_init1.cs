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
            migrationBuilder.AlterColumn<string>(
                name: "IDDonHang",
                table: "CHITIETDONHANG",
                type: "nvarchar(20)",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)");

            migrationBuilder.CreateIndex(
                name: "IX_CHITIETDONHANG_IDDonHang",
                table: "CHITIETDONHANG",
                column: "IDDonHang");

            migrationBuilder.AddForeignKey(
                name: "FK_CHITIETDONHANG_DONHANG_IDDonHang",
                table: "CHITIETDONHANG",
                column: "IDDonHang",
                principalTable: "DONHANG",
                principalColumn: "IDDonHang",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_CHITIETDONHANG_DONHANG_IDDonHang",
                table: "CHITIETDONHANG");

            migrationBuilder.DropIndex(
                name: "IX_CHITIETDONHANG_IDDonHang",
                table: "CHITIETDONHANG");

            migrationBuilder.AlterColumn<string>(
                name: "IDDonHang",
                table: "CHITIETDONHANG",
                type: "nvarchar(max)",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(20)");
        }
    }
}
