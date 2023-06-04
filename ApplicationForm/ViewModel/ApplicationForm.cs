using System.ComponentModel.DataAnnotations;

namespace ApplicationForm.ViewModel;

public class ApplicationForm
{
    [Required]
    [StringLength(50)]
    [Display(Name = "Imię")]
    public string Name { get; set; } = default!;

    [Required]
    [StringLength(50)]
    [Display(Name = "Nazwisko")]
    public string Surname { get; set; } = default!;

    [Required]
    [StringLength(50)]
    [EmailAddress]
    [Display(Name = "Adres Email")]
    public string Email { get; set; } = default!;

    [Required(ErrorMessage = "The Birthday Date field is required.")]
    [Display(Name = "Data Urodzenia")]
    public DateOnly BirthdayDate { get; set; }

    [Required]
    [Display(Name = "Edukacja")]
    public int EducationId { get; set; }

    [Required] public List<IFormFile> File { get; set; } = new List<IFormFile>();
    [Required] public List<String> CompanyNames { get; set; } = new List<string>();
    [Required] public List<DateOnly> InternshipStarts { get; set; } = new List<DateOnly>();
    [Required] public List<DateOnly> InternshipEnds { get; set; } = new List<DateOnly>();
}