using System.ComponentModel.DataAnnotations.Schema;

namespace supermarket_backend.Model
{
    public class Attribute_Product
    {
        public int Id {get; set;}
        public int ProductId {get; set;}
        public int AttributeId {get; set;}
        [ForeignKey(nameof(ProductId))]
        public Product? Product { get; set; }
        [ForeignKey(nameof(AttributeId))]
        public Attribute? Attribute { get; set; }
        public int RowDelete { get; set; } = 0;
    }
}
