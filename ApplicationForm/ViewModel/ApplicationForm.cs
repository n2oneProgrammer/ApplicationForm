using System.ComponentModel.DataAnnotations;

namespace ApplicationForm.ViewModel;

public class ApplicationForm
{
    [Required] [StringLength(50)] public string Name { get; set; } = default!;

    [Required] [StringLength(50)] public string Surname { get; set; } = default!;

    [Required]
    [StringLength(50)]
    [EmailAddress]
    public string Email { get; set; } = default!;

    [Required(ErrorMessage = "The Birthday Date field is required.")]
    [Display(Name = "Birthday Date")]
    public DateOnly BirthdayDate { get; set; }

    [Required]
    [Display(Name = "Education")]
    public int EducationId { get; set; }

    [Required] public List<IFormFile> File { get; set; }
}