using Microsoft.EntityFrameworkCore;

namespace ApplicationForm.Models;

public class ApplicationDbContext : DbContext
{
    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        optionsBuilder.UseSqlServer(
            "Server=localhost\\MSSQLSERVER01;Database=MovieSystem;Trusted_Connection=True;TrustServerCertificate=True;");
        base.OnConfiguring(optionsBuilder);
    }
}