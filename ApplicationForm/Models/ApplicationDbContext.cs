using Microsoft.EntityFrameworkCore;

namespace ApplicationForm.Models;

public class ApplicationDbContext : DbContext
{
    public DbSet<Application> Applications { get; set; }
    public DbSet<AttachedFile> AttachedFiles { get; set; }
    public DbSet<EducationType> EducationTypes { get; set; }
    public DbSet<Internship> Internships { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        optionsBuilder.UseSqlServer(
            "Server=localhost\\MSSQLSERVER01;Database=ApplicationFromDb;Trusted_Connection=True;TrustServerCertificate=True;");
        base.OnConfiguring(optionsBuilder);
    }
}