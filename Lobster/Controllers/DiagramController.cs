using System;
using System.Collections.Generic;
using Lobster.Models;
using Lobster.Services;
using Microsoft.AspNetCore.Mvc;

namespace Lobster.Controllers
{
    [Route("api/[controller]")]
    public class DiagramController : Controller
    {
        private IDiagramService _diagramService;

        public DiagramController(IDiagramService diagramService)
        {
            _diagramService = diagramService;
        }

        [HttpGet]
        public IEnumerable<Diagram> GetDiagram()
        {
            var diagramModel = _diagramService.GetImageMapModel();
            var models = CreateProcessMapSvgModels(diagramModel);
            return models;
        }

        private List<Diagram> CreateProcessMapSvgModels(Models.ImageMaps.ImageMapModel imageMapModel)
        {
            var models = new List<Diagram>();
            foreach (var elRow in imageMapModel.Element)
            {
                if (!elRow.Active)
                    continue;

                var coords = elRow.Points.Split(',');
                if (coords == null || coords.Length == 0)
                    continue;

                var x = Convert.ToInt32(coords[0]);
                var y = Convert.ToInt32(coords[1]);
                var x2 = Convert.ToInt32(coords[2]);
                var y2 = Convert.ToInt32(coords[3]);
                var w = x2 - x;
                var h = y2 - y;

                var svgModel = new Diagram
                {
                    Key = elRow.Key,
                    X = x,
                    Y = y,
                    W = w,
                    H = h,
                };
                models.Add(svgModel);
            }

            return models;
        }
    }
}