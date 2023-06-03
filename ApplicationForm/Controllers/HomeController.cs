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

        LinkedList<byte[]> files = new LinkedList<byte[]>();
        if (application.File != null)
        {
            using (var memoryStream = new MemoryStream())
            {
                foreach (var file in application.File)
                {
                    await file.CopyToAsync(memoryStream);
                    // Upload the file if less than 2 MB
                    if (memoryStream.Length < 2097152)
                    {
                        files.AddLast(memoryStream.ToArray());
                    }
                    else
                    {
                        ModelState.AddModelError("File", "The file is too large.");
                    }
                }
            }
        }

        if (!ModelState.IsValid)
        {
            ViewData["EducationId"] = new SelectList(_context.EducationTypes, "Id", "Name", application.EducationId);
            return View("Index", application);
        }

        Application app = new Application(application);
        _context.Add(app);
        await _context.SaveChangesAsync();
        Console.WriteLine("?");
        Console.WriteLine(app.Id);
        Console.WriteLine(files.Count);
        foreach (var file in files)
        {
            AttachedFile attachedFile = new AttachedFile()
            {
                Id = 0,
                ApplicationId = app.Id,
                File = file
            };
            _context.Add(attachedFile);
        }

        await _context.SaveChangesAsync();
        return RedirectToAction(nameof(Index));
    }

    [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
    public IActionResult Error()
    {
        return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
    }
}