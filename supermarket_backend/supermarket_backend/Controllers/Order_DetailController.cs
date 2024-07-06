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
    public class Order_DetailController : ControllerBase
    {
        private readonly SuperMarketDBContext _context;

        public Order_DetailController(SuperMarketDBContext context)
        {
            _context = context;
        }

        // GET: api/Order_Detail
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Order_Detail>>> GetOrder_Details()
        {
            if (_context.Order_Details == null)
            {
                return NotFound();
            }
            return await _context.Order_Details.Where(od => od.RowDelete == 0).ToListAsync();
        }

        // GET: api/Order_Detail/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Order_Detail>> GetOrder_Detail(int id)
        {
            if (_context.Order_Details == null)
            {
                return NotFound();
            }
            var order_Detail = await _context.Order_Details.Where(od => od.RowDelete == 0 && od.Id == id).FirstOrDefaultAsync();

            if (order_Detail == null)
            {
                return NotFound();
            }

            return order_Detail;
        }

        // PUT: api/Order_Detail/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        [Authorize(Roles = UserRoles.Admin)]
        public async Task<IActionResult> PutOrder_Detail(int id, Order_Detail order_Detail)
        {
            if (id != order_Detail.Id)
            {
                return BadRequest();
            }

            _context.Entry(order_Detail).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!Order_DetailExists(id))
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

        // POST: api/Order_Detail
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        [Authorize(Roles = UserRoles.Employee)]
        public async Task<ActionResult<Order_Detail>> PostOrder_Detail(Order_Detail order_Detail)
        {
            if (_context.Order_Details == null || !ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            // Ensure RowDelete is set to 0
            order_Detail.RowDelete = 0;

            _context.Order_Details.Add(order_Detail);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetOrder_Detail", new { id = order_Detail.Id }, order_Detail);
        }

        // DELETE: api/Order_Detail/5
        [HttpDelete("{id}")]
        [Authorize(Roles = UserRoles.Admin)]
        public async Task<IActionResult> DeleteOrder_Detail(int id)
        {
            if (_context.Order_Details == null)
            {
                return NotFound();
            }
            var order_Detail = await _context.Order_Details.FindAsync(id);
            if (order_Detail == null)
            {
                return NotFound();
            }

            // Set RowDelete to 1 instead of deleting the record
            order_Detail.RowDelete = 1;
            _context.Entry(order_Detail).State = EntityState.Modified;
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool Order_DetailExists(int id)
        {
            return (_context.Order_Details?.Any(e => e.Id == id && e.RowDelete == 0)).GetValueOrDefault();
        }
    }
}
