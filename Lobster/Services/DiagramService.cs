using Lobster.Models.ImageMaps;
using System.IO;

namespace Lobster.Services
{
    public class DiagramService : IDiagramService
    {
        private Stream GetImageMapXmlStream()
        {
            var resName = string.Format("Lobster.Resources.diagram.xml");
            var stream = typeof(DiagramService).Assembly.GetManifestResourceStream(resName);
            return stream;
        }

        public ImageMapModel GetImageMapModel()
        {
            var imageMapModel = new ImageMapModel();
            using (var stream = GetImageMapXmlStream())
            {
                imageMapModel.ReadXml(stream);
            }
            return imageMapModel;
        }
    }
}
