using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace supermarket_backend.Migrations.SuperMarketDB
{
    public partial class MigrationV2 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "ProductId",
                table: "Attribute_Values",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_Attribute_Values_ProductId",
                table: "Attribute_Values",
                column: "ProductId");

            migrationBuilder.AddForeignKey(
                name: "FK_Attribute_Values_Products_ProductId",
                table: "Attribute_Values",
                column: "ProductId",
                principalTable: "Products",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Attribute_Values_Products_ProductId",
                table: "Attribute_Values");

            migrationBuilder.DropIndex(
                name: "IX_Attribute_Values_ProductId",
                table: "Attribute_Values");

            migrationBuilder.DropColumn(
                name: "ProductId",
                table: "Attribute_Values");
        }
    }
}
