using System.ComponentModel.DataAnnotations;

namespace ApplicationForm.Models;

public class Application
{
    public int Id { get; set; }

    [Required] [StringLength(50)] public string Name { get; set; } = default!;

    [Required] [StringLength(50)] public string Surname { get; set; } = default!;

    [Required]
    [StringLength(50)]
    [EmailAddress]
    public string Email { get; set; } = default!;

    [Required] public DateOnly BirthdayDate { get; set; }

    public EducationType Education { get; set; } = default!;

    [Required]
    [Display(Name = "Education")]
    public int EducationId { get; set; }

    public Application(ViewModel.ApplicationForm form)
    {
        this.Id = 0;
        this.Name = form.Name;
        this.Surname = form.Surname;
        this.Email = form.Email;
        this.BirthdayDate = form.BirthdayDate;
        this.EducationId = form.EducationId;
    }

    public Application()
    {
    }
}