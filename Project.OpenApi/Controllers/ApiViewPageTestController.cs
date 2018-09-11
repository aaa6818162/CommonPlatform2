using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Web;
using System.Web.Mvc;
using Cake.AutoRest;

namespace Project.OpenApi.Controllers
{
    public class ApiViewPageTestController : Controller
    {
        // GET: ApiViewPageTest
        public  ActionResult Index()
        {
            

            return View();
        }


       
    }
}