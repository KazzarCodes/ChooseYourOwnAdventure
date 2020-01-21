using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Lobster.Models;

namespace Lobster.Data
{
    public class LobsterContext : DbContext
    {
        public LobsterContext (DbContextOptions<LobsterContext> options)
            : base(options)
        {
        }

        public DbSet<Decision> Decision { get; set; }
    }
}
