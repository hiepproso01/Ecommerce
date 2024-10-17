using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace back_end.Migrations
{
    /// <inheritdoc />
    public partial class init6 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_CHITIETDONHANG_DONHANG_IDDonHang",
                table: "CHITIETDONHANG");

            migrationBuilder.DropIndex(
                name: "IX_CHITIETDONHANG_IDDonHang",
                table: "CHITIETDONHANG");

            migrationBuilder.DropColumn(
                name: "IDDonHang",
                table: "CHITIETDONHANG");

            migrationBuilder.AddColumn<string>(
                name: "DONHANGIDDonHang",
                table: "CHITIETDONHANG",
                type: "nvarchar(20)",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_CHITIETDONHANG_DONHANGIDDonHang",
                table: "CHITIETDONHANG",
                column: "DONHANGIDDonHang");

            migrationBuilder.AddForeignKey(
                name: "FK_CHITIETDONHANG_DONHANG_DONHANGIDDonHang",
                table: "CHITIETDONHANG",
                column: "DONHANGIDDonHang",
                principalTable: "DONHANG",
                principalColumn: "IDDonHang");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_CHITIETDONHANG_DONHANG_DONHANGIDDonHang",
                table: "CHITIETDONHANG");

            migrationBuilder.DropIndex(
                name: "IX_CHITIETDONHANG_DONHANGIDDonHang",
                table: "CHITIETDONHANG");

            migrationBuilder.DropColumn(
                name: "DONHANGIDDonHang",
                table: "CHITIETDONHANG");

            migrationBuilder.AddColumn<string>(
                name: "IDDonHang",
                table: "CHITIETDONHANG",
                type: "nvarchar(20)",
                nullable: false,
                defaultValue: "");

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
    }
}
