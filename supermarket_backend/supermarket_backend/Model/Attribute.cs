namespace supermarket_backend.Model
{
    public class Attribute
    {
        public int Id { get; set; }
        public string? Name { get; set; }
        public ICollection<Attribute_Product>? Attribute_Products { get; set; }
        public ICollection<Attribute_Value>? Attribute_Values { get; set; }
        public int RowDelete { get; set; } = 0;
    }
}
