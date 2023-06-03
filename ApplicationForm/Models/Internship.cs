using System.ComponentModel.DataAnnotations;

namespace ApplicationForm.Models;

public class Internship
{
    public int Id { get; set; }
    
    [Required]
    public int ApplicationId { get; set; }

    [Required] 
    [StringLength(100)] 
    public string CompanyName { get; set; } = default!;
    
    [Required]
    public DateOnly StartDate { get; set; }
    
    [Required]
    public DateOnly EndDate { get; set; }
}