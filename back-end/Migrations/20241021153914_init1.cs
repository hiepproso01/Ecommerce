using System;
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
            migrationBuilder.CreateTable(
                name: "PHANHOI",
                columns: table => new
                {
                    IDPhanHoi = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    IDNguoiDung = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    TenNguoiDung = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Email = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    NoiDung = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    HinhAnhPhanHoi = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    NgayPhanHoi = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PHANHOI", x => x.IDPhanHoi);
                    table.ForeignKey(
                        name: "FK_PHANHOI_AspNetUsers_IDNguoiDung",
                        column: x => x.IDNguoiDung,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_PHANHOI_IDNguoiDung",
                table: "PHANHOI",
                column: "IDNguoiDung");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "PHANHOI");
        }
    }
}
