using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Web;
using System.Web.Mvc;
using Newtonsoft.Json;

namespace Project.OpenApiTest.Controllers
{
    public class AccountController : Controller
    {
        // GET: Account
        public ActionResult Index()
        {

            var httpClient = new HttpClient();
            var responseJson2 =  httpClient.GetStringAsync("/").Result;
            var result = JsonConvert.DeserializeObject<string>(responseJson2);
         

            return View();
        }


        public ActionResult Login()
        {

            HttpContent httpContent = new StringContent(JsonConvert.SerializeObject(""));
            httpContent.Headers.ContentType = new MediaTypeHeaderValue("application/json");

            var httpClient = new HttpClient();
            var responseJson =  httpClient.PostAsync("", httpContent).Result.Content.ReadAsAsync<string>();


            return View();
        }


    }
}