using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Lobster.Data;
using Lobster.Models;

namespace Lobster.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DecisionsController : ControllerBase
    {
        private readonly LobsterContext _context;
        private readonly IDataRepository<Decision> _repo;

        public DecisionsController(LobsterContext context, IDataRepository<Decision> repo)
        {
            _context = context;
            _repo = repo;
        }

        // GET: api/Decisions
        [HttpGet]
        public IEnumerable<Decision> GetDecisions()
        {
            var results = _context.Decision.OrderBy(p => p.Id);
            return results;
        }

        // GET: api/Decisions/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetDecision([FromRoute] int id)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var decision = await _context.Decision.FindAsync(id);

            if (decision == null)
                return NotFound();

            return Ok(decision);
        }

        // PUT: api/Decisions
        [HttpPut("{id}")]
        public async Task<IActionResult> SaveResult([FromRoute] int id, [FromBody] Decision decision)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            _context.Entry(decision).State = EntityState.Modified;

            try
            {
                _repo.Update(decision);
                var save = await _repo.SaveAsync(decision);
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!DecisionExists(id))
                    return NotFound();
                else
                    throw;
            }

            return NoContent();
        }

        // PUT: api/Decisions
        [HttpPut]
        public async Task<IActionResult> ClearResults()
        {
            try
            {
                var recordsToUpdate = _context.Decision.Where(p => p.Result != null);

                foreach (var record in recordsToUpdate)
                {
                    record.Result = null;
                }

                await _context.SaveChangesAsync();

                return NoContent();
            }
            catch (DbUpdateConcurrencyException)
            {
                throw;
            }
        }

        private bool DecisionExists(int id)
        {
            return _context.Decision.Any(e => e.Id == id);
        }
    }
}
