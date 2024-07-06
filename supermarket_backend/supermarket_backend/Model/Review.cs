using System.ComponentModel.DataAnnotations.Schema;

namespace supermarket_backend.Model
{
    public class Review
    {
        public int Id { get; set; }
        [ForeignKey(nameof(UserId))]
        public int UserId { get; set; }
        public int Rate { get; set; }
        public string? Description { get; set; }
        public int RowDelete { get; set; } = 0;
    }
}
