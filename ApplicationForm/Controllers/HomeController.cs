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
    public async Task<IActionResult> Create([Bind("Id,Name,Surname,BirthdayDate,EducationId")] Application application)
    {
        if (ModelState.IsValid)
        {
            _context.Add(application);
            await _context.SaveChangesAsync();
            return RedirectToAction(nameof(Index));
        }

        ViewData["EducationId"] = new SelectList(_context.EducationTypes, "Id", "Name", application.EducationId);
        return View("Index", application);
    }

    [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
    public IActionResult Error()
    {
        return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
    }
}