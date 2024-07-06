using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.CodeAnalysis;
using Microsoft.EntityFrameworkCore;
using supermarket_backend.Model;

namespace supermarket_backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductsController : ControllerBase
    {
        private readonly SuperMarketDBContext _context;

        public ProductsController(SuperMarketDBContext context)
        {
            _context = context;
        }

        // GET: api/Products
        [HttpGet("all")] // Route này đại diện cho tất cả các sản phẩm
        public async Task<ActionResult<IEnumerable<Product>>> GetProducts()
        {
            if (_context.Products == null)
            {
                return NotFound();
            }
            return await _context.Products.Where(p => p.RowDelete == 0).ToListAsync();
        }

        // GET: api/Products/featured
        [HttpGet("featured")]
        public async Task<ActionResult<IEnumerable<Product>>> GetFeatureProducts()
        {
            if (_context.Products == null)
            {
                return NotFound();
            }
            return await _context.Products.Where(p => p.FetureProduct == 1 && p.RowDelete == 0).ToListAsync();
        }

        // GET: api/Products/GetByCategory/{categoryId}
        [HttpGet("GetByCategory/{categoryId}")]
        public async Task<ActionResult<IEnumerable<Product>>> GetProductsByCategoryId(int categoryId)
        {
            var products = await _context.Products
                .Where(p => p.CategoryId == categoryId && p.RowDelete == 0)
                .ToListAsync();

            if (products == null)
            {
                return NotFound();
            }

            return products;
        }

        [HttpGet("search")]
        public async Task<ActionResult<IEnumerable<Product>>> GetProductsByKeyAndPrice([FromQuery] string search, [FromQuery] int priceSort)
        {
            string sql = @"SELECT TOP 1 p.Id, p.Name, av.PriceOut, av.ProductId AS IDProduct, av.Id AS AVId, p.BrandId, p.CategoryId, p.Description, p.FetureProduct, av.Name AS AVName, av.PriceIn, av.Quantity,p.RowDelete, av.RowDelete AS DeleteRow
                        FROM Products AS p
                        INNER JOIN Attribute_Values AS av ON p.Id = av.ProductId
                        WHERE p.RowDelete = 0";

            if (!string.IsNullOrEmpty(search))
            {
                sql += $" AND p.Name LIKE '%{search}%'";
            }

            if (priceSort == 1)
            {
                sql += " AND av.PriceOut >= 0 AND av.PriceOut <= 100000";
            }
            else if (priceSort == 2)
            {
                sql += " AND av.PriceOut > 100000 AND av.PriceOut <= 500000";
            }
            else if (priceSort == 3)
            {
                sql += " AND av.PriceOut > 500000";
            }


            var products = await _context.Products.FromSqlRaw(sql).ToListAsync();

            return Ok(products);
        }

        // GET: api/Products/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Product>> GetProduct(int id)
        {
            if (_context.Products == null)
            {
                return NotFound();
            }
            var product = await _context.Products.FirstOrDefaultAsync(p => p.Id == id && p.RowDelete == 0);

            if (product == null)
            {
                return NotFound();
            }

            return product;
        }

        // PUT: api/Products/5
        [HttpPut("{id}")]
        [Authorize(Roles = UserRoles.Admin)]
        public async Task<IActionResult> PutProduct(int id, Product product)
        {
            if (id != product.Id)
            {
                return BadRequest();
            }

            _context.Entry(product).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ProductExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Products
        [HttpPost]
        [Authorize(Roles = UserRoles.Admin)]
        public async Task<ActionResult<Product>> PostProduct(Product product)
        {
            if (_context.Products == null)
            {
                return Problem("Entity set 'SuperMarketDBContext.Products' is null.");
            }
            _context.Products.Add(product);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetProduct", new { id = product.Id }, product);
        }

        // DELETE: api/Products/5
        [HttpDelete("{id}")]
        [Authorize(Roles = UserRoles.Admin)]
        public async Task<IActionResult> DeleteProduct(int id)
        {
            if (_context.Products == null)
            {
                return NotFound();
            }
            var product = await _context.Products.FirstOrDefaultAsync(p => p.Id == id && p.RowDelete == 0);
            if (product == null)
            {
                return NotFound();
            }

            product.RowDelete = 1;
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool ProductExists(int id)
        {
            return _context.Products.Any(e => e.Id == id && e.RowDelete == 0);
        }
    }
}

