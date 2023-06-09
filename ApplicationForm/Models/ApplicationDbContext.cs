﻿using Microsoft.EntityFrameworkCore;

namespace ApplicationForm.Models;

public class ApplicationDbContext : DbContext
{
    private readonly string _connectionString =
        "Server=localhost\\MSSQLSERVER01;Database=ApplicationFormDB;Trusted_Connection=True;TrustServerCertificate=True;";

    public DbSet<Application> Applications { get; set; }
    public DbSet<AttachedFile> AttachedFiles { get; set; }
    public DbSet<EducationType> EducationTypes { get; set; }
    public DbSet<Internship> Internships { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<EducationType>().HasData(
            new EducationType
            {
                Id = 1,
                Name = "Podstawowe"
            },
            new EducationType
            {
                Id = 2,
                Name = "Średnie"
            },
            new EducationType
            {
                Id = 3,
                Name = "Wyższe"
            });
        base.OnModelCreating(modelBuilder);
    }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        optionsBuilder.UseSqlServer(_connectionString);
        base.OnConfiguring(optionsBuilder);
    }
}