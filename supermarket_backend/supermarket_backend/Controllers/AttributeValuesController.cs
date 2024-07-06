using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using supermarket_backend.Model;

namespace supermarket_backend.Controllers
{
    [Route("api/products/{productId}/attributes")]
    [ApiController]
    public class AttributeValuesController : ControllerBase
    {
        private readonly SuperMarketDBContext _context;

        public AttributeValuesController(SuperMarketDBContext context)
        {
            _context = context;
        }

        // GET: api/products/{productId}/attributes
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Attribute_Value>>> GetAttributeValues(int productId)
        {
            var productExists = await _context.Products.AnyAsync(p => p.Id == productId && p.RowDelete == 0);
            if (!productExists)
            {
                return NotFound("Product not found");
            }

            var attributeValues = await _context.Attribute_Values
                .Where(a => a.ProductId == productId && a.RowDelete == 0)
                .ToListAsync();

            return attributeValues;
        }

        // GET: api/products/{productId}/attributes/first
        [HttpGet("first")]
        public async Task<ActionResult<Attribute_Value>> GetFirstAttributeValue(int productId)
        {
            var productExists = await _context.Products.AnyAsync(p => p.Id == productId && p.RowDelete == 0);
            if (!productExists)
            {
                return NotFound("Product not found");
            }

            var firstAttributeValue = await _context.Attribute_Values
                .Where(a => a.ProductId == productId && a.RowDelete == 0)
                .FirstOrDefaultAsync();

            if (firstAttributeValue == null)
            {
                return NotFound("Attribute value not found");
            }

            return firstAttributeValue;
        }


        // GET: api/products/{productId}/attributes/{id}
        [HttpGet("{id}")]
        public async Task<ActionResult<Attribute_Value>> GetAttributeValue(int productId, int id)
        {
            var productExists = await _context.Products.AnyAsync(p => p.Id == productId && p.RowDelete == 0);
            if (!productExists)
            {
                return NotFound("Product not found");
            }

            var attributeValue = await _context.Attribute_Values
                .FirstOrDefaultAsync(a => a.ProductId == productId && a.Id == id && a.RowDelete == 0);

            if (attributeValue == null)
            {
                return NotFound("Attribute value not found");
            }

            return attributeValue;
        }

        // GET: api/products/{productId}/attributes/{attributeId}
        [HttpGet("list/{attributeId}")]
        public async Task<ActionResult<IEnumerable<Attribute_Value>>> GetAttributeValuesByProductAttribute(int productId, int attributeId)
        {
            var productExists = await _context.Products.AnyAsync(p => p.Id == productId && p.RowDelete == 0);
            if (!productExists)
            {
                return NotFound("Product not found");
            }

            var attributeValues = await _context.Attribute_Values
                .Where(a => a.ProductId == productId && a.AttributeId == attributeId && a.RowDelete == 0)
                .ToListAsync();

            if (attributeValues == null || attributeValues.Count == 0)
            {
                return NotFound("No attribute values found");
            }

            return attributeValues;
        }

        // PUT: api/products/{productId}/attributes/updateQuantity
        [HttpPut("{attributeId}/{attributeValueId}/updateQuantity/{quantity}")]
        public async Task<IActionResult> UpdateQuantity(int productId, int attributeId, int attributeValueId, int quantity)
        {
            var productExists = await _context.Products.AnyAsync(p => p.Id == productId && p.RowDelete == 0);
            if (!productExists)
            {
                return NotFound("Product not found");
            }

            var attributeValue = await _context.Attribute_Values
                .FirstOrDefaultAsync(a => a.ProductId == productId && a.AttributeId == attributeId && a.Id == attributeValueId && a.RowDelete == 0);

            if (attributeValue == null)
            {
                return NotFound("Attribute value not found");
            }

            attributeValue.Quantity = attributeValue.Quantity -  quantity;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!AttributeValueExists(attributeValueId))
                {
                    return NotFound("Attribute value not found");
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }



        // PUT: api/products/{productId}/attributes/{id}
        [HttpPut("{id}")]
        [Authorize(Roles = UserRoles.Admin)]
        public async Task<IActionResult> PutAttributeValue(int productId, int id, Attribute_Value attribute_value)
        {
            if (id != attribute_value.Id || productId != attribute_value.ProductId)
            {
                return BadRequest("Invalid IDs provided");
            }

            var productExists = await _context.Products.AnyAsync(p => p.Id == productId && p.RowDelete == 0);
            if (!productExists)
            {
                return NotFound("Product not found");
            }

            var existingAttributeValue = await _context.Attribute_Values.FirstOrDefaultAsync(av => av.Id == id && av.ProductId == productId && av.RowDelete == 0);
            if (existingAttributeValue == null)
            {
                return NotFound("Attribute value not found");
            }

            _context.Entry(existingAttributeValue).CurrentValues.SetValues(attribute_value);

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!AttributeValueExists(id))
                {
                    return NotFound("Attribute value not found");
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/products/{productId}/attributes
        [HttpPost]
        [Authorize(Roles = UserRoles.Admin)]
        public async Task<ActionResult<Attribute_Value>> PostAttributeValue(int productId, Attribute_Value attribute_value)
        {
            var productExists = await _context.Products.AnyAsync(p => p.Id == productId && p.RowDelete == 0);
            if (!productExists)
            {
                return NotFound("Product not found");
            }

            // Ensure RowDelete is set to 0
            attribute_value.RowDelete = 0;
            attribute_value.ProductId = productId;

            _context.Attribute_Values.Add(attribute_value);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetAttributeValue), new { productId = productId, id = attribute_value.Id }, attribute_value);
        }

        // DELETE: api/products/{productId}/attributes/{id}
        [HttpDelete("{id}")]
        [Authorize(Roles = UserRoles.Admin)]
        public async Task<IActionResult> DeleteAttributeValue(int productId, int id)
        {
            var productExists = await _context.Products.AnyAsync(p => p.Id == productId && p.RowDelete == 0);
            if (!productExists)
            {
                return NotFound("Product not found");
            }

            var attribute_value = await _context.Attribute_Values.FirstOrDefaultAsync(av => av.Id == id && av.ProductId == productId && av.RowDelete == 0);
            if (attribute_value == null)
            {
                return NotFound("Attribute value not found");
            }

            // Set RowDelete to 1 instead of deleting the record
            attribute_value.RowDelete = 1;
            _context.Entry(attribute_value).State = EntityState.Modified;
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool AttributeValueExists(int id)
        {
            return _context.Attribute_Values.Any(e => e.Id == id && e.RowDelete == 0);
        }
    }
}
