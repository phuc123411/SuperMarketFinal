using System.ComponentModel.DataAnnotations.Schema;

namespace supermarket_backend.Model
{
    public class Product
    {
        public int Id { get; set; }
        public string? Name { get; set; }
        public string? Description { get; set; }
        public int FetureProduct {  get; set; }
        public int BrandId { get; set; }
        public int CategoryId { get; set; }
        [ForeignKey(nameof(BrandId))]
        public Brand? Brand { get; set; }
        [ForeignKey(nameof(CategoryId))]
        public Category? Category { get; set; }
        public ICollection<Attribute_Product>? Attribute_Products { get; set; }
        public ICollection<ProductImage>? ProductImages { get; set; }
        public ICollection<Order_Detail>? Order_Details { get; set; }
        public int RowDelete { get; set; } = 0;
    }
}
