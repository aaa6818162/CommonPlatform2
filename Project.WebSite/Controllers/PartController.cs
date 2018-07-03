using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Project.WebSite.Controllers
{
    public class PartController : NoAuthorizeController
    {
        // GET: Part
        public ActionResult TopHead()
        {
            return View();
        }
    }
}