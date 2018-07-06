using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Project.BusinessWebSite.Controllers
{
    public class PartialController : Controller
    {
        // GET: Home
        public ActionResult MenuPartial()
        {
            return View();
        }
    }
}