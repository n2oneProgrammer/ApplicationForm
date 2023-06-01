using System.ComponentModel.DataAnnotations;

namespace ApplicationForm.Models;

public class EducationType
{
    public int Id { get; set; }
    
    [Required]
    [StringLength(50)]
    public string Name { get; set; } = default!;
}