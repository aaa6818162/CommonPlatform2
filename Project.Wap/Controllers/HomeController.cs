﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Project.Wap.Controllers
{
    public class HomeController : Controller
    {
        // GET: Home
        public ActionResult Index(string echostr)
        {
            return Content(echostr);
        }
    }
}