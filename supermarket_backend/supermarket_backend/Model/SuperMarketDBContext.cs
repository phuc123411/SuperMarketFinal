using Microsoft.EntityFrameworkCore;

namespace supermarket_backend.Model
{
    public class SuperMarketDBContext : DbContext
    {
        public SuperMarketDBContext(DbContextOptions<SuperMarketDBContext> options)
        : base(options)
        {
        }

        public DbSet<Attribute> Attributes { get; set; }
        public DbSet<Attribute_Product> Attribute_Products { get; set; }
        public DbSet<Attribute_Value> Attribute_Values { get; set; }
        public DbSet<Brand> Brands { get; set; }
        public DbSet<Category> Categories { get; set; }
        public DbSet<Order> Orders { get; set; }
        public DbSet<Order_Detail> Order_Details { get; set; }
        public DbSet<Product> Products { get; set; }
        public DbSet<ProductImage> ProductImages { get; set; }
        public DbSet<Review> Reviews { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
        }
    }
}
