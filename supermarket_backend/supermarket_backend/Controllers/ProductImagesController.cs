using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using supermarket_backend.Model;
using System;
using System.IO;
using Microsoft.AspNetCore.Authorization;

namespace supermarket_backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductImagesController : ControllerBase
    {
        private readonly SuperMarketDBContext _context;

        public ProductImagesController(SuperMarketDBContext context)
        {
            _context = context;
        }

        // GET: api/ProductImages
        [HttpGet("{id}")]
        public async Task<ActionResult<IEnumerable<ProductImage>>> GetProductImages(int id)
        {
            var productImages = await _context.ProductImages
                .Where(pi => pi.RowDelete == 0 && pi.Main == 0 && pi.ProductId == id)
                .ToListAsync();

            if (productImages == null || productImages.Count == 0)
            {
                return NotFound();
            }

            return productImages;
        }


        [HttpGet("main/{productId}")]
        public async Task<ActionResult<ProductImage>> GetMainProductImage(int productId)
        {
            var mainProductImage = await _context.ProductImages
                .FirstOrDefaultAsync(pi => pi.ProductId == productId && pi.Main == 1 && pi.RowDelete == 0);

            if (mainProductImage == null)
            {
                return NotFound();
            }

            return mainProductImage;
        }


        // PUT: api/ProductImages/5
        [HttpPut("{id}")]
        [Authorize(Roles = UserRoles.Admin)]
        public async Task<IActionResult> PutProductImage(int id, ProductImage productImage)
        {
            if (id != productImage.Id)
            {
                return BadRequest();
            }

            _context.Entry(productImage).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ProductImageExists(id))
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

        // POST: api/ProductImages/{productId}
        [HttpPost("{productId}")]
        [Authorize(Roles = UserRoles.Admin)]
        public async Task<ActionResult> PostProductImage(int productId, [FromForm] IFormFile mainImage, [FromForm] List<IFormFile> images)
        {
            var product = await _context.Products.FindAsync(productId);
            if (product == null)
            {
                return NotFound(new { message = "Product not found" });
            }

            if (mainImage == null)
            {
                return BadRequest(new { message = "Main image is required" });
            }

            using (var transaction = await _context.Database.BeginTransactionAsync())
            {
                try
                {
                    var mainProductImage = new ProductImage
                    {
                        ProductId = productId,
                        UrlImage = await SaveImageAndGetUrl(mainImage),
                        Main = 1,
                        RowDelete = 0
                    };

                    _context.ProductImages.Add(mainProductImage);
                    await _context.SaveChangesAsync();

                    foreach (var imageFile in images)
                    {
                        if (imageFile != null)
                        {
                            var productImage = new ProductImage
                            {
                                ProductId = productId,
                                UrlImage = await SaveImageAndGetUrl(imageFile),
                                Main = 0,
                                RowDelete = 0
                            };

                            _context.ProductImages.Add(productImage);
                        }
                    }

                    await _context.SaveChangesAsync();
                    await transaction.CommitAsync();

                    return Ok(new { message = "Images uploaded successfully" });
                }
                catch (Exception ex)
                {
                    await transaction.RollbackAsync();
                    return StatusCode(StatusCodes.Status500InternalServerError, new { message = "Internal server error: " + ex.Message });
                }
            }
        }


        private async Task<string> SaveImageAndGetUrl(IFormFile file)
        {
            if (file == null || file.Length == 0)
                throw new ArgumentException("Invalid file");

            var uploadsFolder = @"C:\Users\TC Grizzly\Desktop\SPFinal1\SuperMarket1\supermarket_frontend\src\assets\Images";
            if (!Directory.Exists(uploadsFolder))
            {
                Directory.CreateDirectory(uploadsFolder);
            }

            var uniqueFileName = Guid.NewGuid().ToString() + "_" + Path.GetFileName(file.FileName);
            var filePath = Path.Combine(uploadsFolder, uniqueFileName);

            using (var fileStream = new FileStream(filePath, FileMode.Create))
            {
                await file.CopyToAsync(fileStream);
            }

            // Return the relative path from the frontend perspective
            return "/assets/Images/" + uniqueFileName;
        }


        // DELETE: api/ProductImages/5
        [HttpDelete("{id}")]
        [Authorize(Roles = UserRoles.Admin)]
        public async Task<IActionResult> DeleteProductImage(int id)
        {
            if (_context.ProductImages == null)
            {
                return NotFound();
            }
            var productImage = await _context.ProductImages.FirstOrDefaultAsync(pi => pi.Id == id && pi.RowDelete == 0);
            if (productImage == null)
            {
                return NotFound();
            }

            productImage.RowDelete = 1;
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool ProductImageExists(int id)
        {
            return _context.ProductImages.Any(e => e.Id == id && e.RowDelete == 0);
        }
    }
}
