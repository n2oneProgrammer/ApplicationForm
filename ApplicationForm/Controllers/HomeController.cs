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

    public IActionResult Thanks()
    {
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

        if (application.CompanyNames.Count == application.InternshipStarts.Count &&
            application.InternshipStarts.Count == application.InternshipEnds.Count)
        {
            int countInternship = application.CompanyNames.Count;
            if (countInternship <= 20)
            {
                for (int i = 0; i < countInternship; i++)
                {
                    Console.WriteLine(i);
                    if (application.CompanyNames[i].Length == 0 || application.CompanyNames[i].Length > 100)
                    {
                        ModelState.AddModelError("InternshipCompanyName" + i,
                            "Company Name is not correct");
                        Console.WriteLine("CompanyName");
                    }

                    if (application.InternshipStarts[i].ToDateTime(new TimeOnly(0, 0)) >= DateTime.Today)
                    {
                        ModelState.AddModelError("InternshipInternshipStarts" + i,
                            "Internship Start is not correct");
                        Console.WriteLine("Start");
                    }

                    if (application.InternshipEnds[i].ToDateTime(new TimeOnly(0, 0)) >= DateTime.Today ||
                        application.InternshipEnds[i] <= application.InternshipStarts[i]
                       )
                    {
                        ModelState.AddModelError("InternshipInternshipEnds" + i,
                            "Internship End is not correct");
                        Console.WriteLine("End");
                    }
                }
            }
            else
            {
                ModelState.AddModelError("Internship",
                    "Count of Internship should be less then 20");
            }
        }
        else
        {
            ModelState.AddModelError("Internship", "Name, Start, End intern should be complete in every Internship");
        }

        if (!ModelState.IsValid)
        {
            ViewData["EducationId"] = new SelectList(_context.EducationTypes, "Id", "Name", application.EducationId);
            return View("Index", application);
        }

        Application app = new Application(application);
        _context.Add(app);
        await _context.SaveChangesAsync();
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
        await SaveInternShipList(application, app.Id);

        return RedirectToAction(nameof(Thanks));
    }

    async Task SaveInternShipList(ViewModel.ApplicationForm application, int applicationId)
    {
        int countInternship = application.CompanyNames.Count;
        for (int i = 0; i < countInternship; i++)
        {
            Internship internship = new Internship()
            {
                Id = 0,
                ApplicationId = applicationId,
                CompanyName = application.CompanyNames[i],
                StartDate = application.InternshipStarts[i],
                EndDate = application.InternshipEnds[i],
            };
            _context.Add(internship);
        }

        await _context.SaveChangesAsync();
    }

    [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
    public IActionResult Error()
    {
        return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
    }
}