using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Project.OpenApiTest.Controllers
{
    public class NoAuthorController : Controller
    {
        // GET: NoAuthor
        public ActionResult Index()
        {
            return View();
        }
    }
}