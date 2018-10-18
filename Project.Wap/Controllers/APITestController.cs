using System;
using System.Web;
using System.Web.Mvc;
using System.Web.Security;
using Newtonsoft.Json;
using Project.Application.Service.AccountManager;
using Project.Infrastructure.FrameworkCore.Logging;
using Project.Infrastructure.FrameworkCore.ToolKit;
using Project.Infrastructure.FrameworkCore.WebMvc.Controllers.Results;
using Project.Infrastructure.FrameworkCore.WebMvc.Models;

namespace Project.Wap.Controllers
{
    public class APITestController : Controller
    {

        #region
        public ActionResult Test()
        {
            return View();
        }

        public ActionResult VueTest()
        {
            return View();
        }


        #endregion







    }
}