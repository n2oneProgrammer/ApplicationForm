using System.ComponentModel.DataAnnotations;

namespace ApplicationForm.Models;

public class AttachedFile
{
    public int Id { get; set; }
    
    [Required]
    public int ApplicationId { get; set; }

    [Required]
    public byte[] File { get; set; } = default!;
}