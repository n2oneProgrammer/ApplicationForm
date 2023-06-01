using System.Diagnostics;
using Microsoft.AspNetCore.Mvc;
using ApplicationForm.Models;
using Microsoft.AspNetCore.Mvc.Rendering;

namespace ApplicationForm.Controllers;

public class HomeController : Controller
{
    private readonly ApplicationDbContext _context;

    public HomeController(ApplicationDbContext context)
    {
        _context = context;
    }

    public IActionResult Index()
    {
        ViewData["EducationId"] = new SelectList(_context.EducationTypes, "Id", "Name");
        return View();
    }

    [HttpPost]
    [ValidateAntiForgeryToken]
    public async Task<IActionResult> Create(ViewModel.ApplicationForm application)
    {
        if (application.BirthdayDate.ToDateTime(new TimeOnly(0, 0)) >= DateTime.Today)
        {
            ModelState.AddModelError("BirthdayDate",
                "Please enter the correct date");
        }
        if (!ModelState.IsValid)
        {
            ViewData["EducationId"] = new SelectList(_context.EducationTypes, "Id", "Name", application.EducationId);
            return View("Index", application);
        }

        _context.Add(new Application(application));
        await _context.SaveChangesAsync();
        return RedirectToAction(nameof(Index));
    }

    [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
    public IActionResult Error()
    {
        return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
    }
}