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
    [Route("api/[controller]")]
    [ApiController]
    public class AttributesController : ControllerBase
    {
        private readonly SuperMarketDBContext _context;

        public AttributesController(SuperMarketDBContext context)
        {
            _context = context;
        }

        // GET: api/Attributes
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Model.Attribute>>> GetAttributes()
        {
            if (_context.Attributes == null)
            {
                return NotFound();
            }
            return await _context.Attributes.Where(a => a.RowDelete == 0).ToListAsync();
        }

        // GET: api/Attributes/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Model.Attribute>> GetAttribute(int id)
        {
            if (_context.Attributes == null)
            {
                return NotFound();
            }

            var attribute = await _context.Attributes.Where(a => a.RowDelete == 0 && a.Id == id).FirstOrDefaultAsync();

            if (attribute == null)
            {
                return NotFound();
            }

            return attribute;
        }

        [HttpGet("product/{productId}/attributes")]
        public async Task<ActionResult<IEnumerable<Model.Attribute>>> GetAttributesByProductId(int productId)
        {
            var attributes = await _context.Attributes
                .Where(a => a.RowDelete == 0 && a.Attribute_Products.Any(ap => ap.ProductId == productId))
                .ToListAsync();

            if (attributes == null || attributes.Count == 0)
            {
                return NotFound();
            }

            return attributes;
        }


        // PUT: api/Attributes/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        [Authorize(Roles = UserRoles.Admin)]
        public async Task<IActionResult> PutAttribute(int id, Model.Attribute attribute)
        {
            if (id != attribute.Id)
            {
                return BadRequest();
            }

            _context.Entry(attribute).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!AttributeExists(id))
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

        // POST: api/Attributes
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        [Authorize(Roles = UserRoles.Admin)]
        public async Task<ActionResult<Model.Attribute>> PostAttribute(Model.Attribute attribute)
        {
            if (_context.Attributes == null)
            {
                return Problem("Entity set 'SuperMarketDBContext.Attributes'  is null.");
            }

            // Ensure RowDelete is set to 0
            attribute.RowDelete = 0;

            _context.Attributes.Add(attribute);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetAttribute", new { id = attribute.Id }, attribute);
        }

        // DELETE: api/Attributes/5
        [HttpDelete("{id}")]
        [Authorize(Roles = UserRoles.Admin)]
        public async Task<IActionResult> DeleteAttribute(int id)
        {
            if (_context.Attributes == null)
            {
                return NotFound();
            }
            var attribute = await _context.Attributes.FindAsync(id);
            if (attribute == null)
            {
                return NotFound();
            }

            // Set RowDelete to 1 instead of deleting the record
            attribute.RowDelete = 1;
            _context.Entry(attribute).State = EntityState.Modified;
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool AttributeExists(int id)
        {
            return (_context.Attributes?.Any(e => e.Id == id && e.RowDelete == 0)).GetValueOrDefault();
        }
    }
}
