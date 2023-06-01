using System.ComponentModel.DataAnnotations;

namespace ApplicationForm.Models;

public class Application
{
    public int Id { get; set; }
    
    [Required]
    [StringLength(50)] 
    public string Name { get; set; } = default!;
    
    [Required]
    [StringLength(50)] 
    public string Surname { get; set; } = default!;
    
    [Required] 
    public DateOnly BirthdayDate { get; set; }
    
    public EducationType Education { get; set; } = default!;

    [Required]
    [Display(Name = "Education")]
    public int EducationId { get; set; }
}