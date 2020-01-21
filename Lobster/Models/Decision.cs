using System.ComponentModel.DataAnnotations;

namespace Lobster.Models
{
    public class Decision
    {
        [Key]
        public int Id { get; set; }

        /// <summary>
        /// Text displayed as the question
        /// </summary>
        [Required]
        public string Title { get; set; }

        /// <summary>
        /// Id of the next question if answer is true -- if null, end
        /// </summary>
        public int? ResultTrueId { get; set; }

        /// <summary>
        /// Id of the next question if answer is false -- if null, end
        /// </summary>
        public int? ResultFalseId { get; set; }

        /// <summary>
        /// The selected option
        /// </summary>
        public bool? Result { get; set; }
    }
}
