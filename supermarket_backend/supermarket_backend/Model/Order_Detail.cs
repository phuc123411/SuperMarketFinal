using System.ComponentModel.DataAnnotations.Schema;

namespace supermarket_backend.Model
{
    public class Order_Detail
    {
        public int Id { get; set; }
        public int OrderId { get; set; }
        public int AttributeId { get; set; }
        public int AttributeValueId { get; set; }
        public int ProductId { get; set; }
        public decimal UnitPrice { get; set; }
        public string? Description { get; set; }
        [ForeignKey(nameof(OrderId))]
        public Order? Order { get; set; }
        [ForeignKey(nameof(ProductId))]
        public Product? Product { get; set; }
        public int Quantity { get; set; }
        public int RowDelete { get; set; } = 0;
    }
}
