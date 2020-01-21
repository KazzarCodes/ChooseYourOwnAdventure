using Lobster.Models.ImageMaps;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Lobster.Services
{
    public interface IDiagramService
    {
        ImageMapModel GetImageMapModel();
    }
}
