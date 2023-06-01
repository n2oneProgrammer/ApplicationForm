using System.ComponentModel.DataAnnotations;

namespace ApplicationForm.Models;

public class AttachedFile
{
    public int Id { get; set; }
    
    [Required]
    public int ApplicationId { get; set; }

    [Required]
    [StringLength(50)]
    public string Description { get; set; } = default!;

    [Required]
    public byte[] File { get; set; } = default!;
}