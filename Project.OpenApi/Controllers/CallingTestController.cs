//using System;
//using System.Collections.Generic;
//using System.Linq;
//using System.Net.Http;
//using System.Net.Http.Headers;
//using System.Web;
//using System.Web.Mvc;
//using Newtonsoft.Json;
//using Project.Application.Service.Common;
//using Project.Application.Service.OrderManager.Request;

//namespace Project.OpenApi.Controllers
//{
//    public class CallingTestController : Controller
//    {

//        public string url = "http://localhost:33806";

//        // GET: CallingTest
//        public ActionResult Index()
//        {
//            var postData = new ProcessRequest()
//            {
//                Service = "Order",
//                Method = "Test",
//                Dto = "111111"
//            };


//            HttpContent httpContent = new StringContent(JsonConvert.SerializeObject(postData));
//            httpContent.Headers.ContentType = new MediaTypeHeaderValue("application/json");
//            httpContent.Headers.Add("Token","22222222222");

//          var httpClient = new HttpClient();
//            var responseJson = httpClient.PostAsync(url + "/api/Calling/Index", httpContent).Result.Content.ReadAsAsync<ProcessResult>();

//            return View();
//        }


//        // GET: CallingTest
//        public ActionResult Index2()
//        {
//            var postData = new ProcessRequest()
//            {
//                Service = "Order",
//                Method = "Test2",
//                Dto = JsonConvert.SerializeObject(new AddOrderRequest() { TicketCodes = "xxxxxxxxxxx"})
//            };


//            HttpContent httpContent = new StringContent(JsonConvert.SerializeObject(postData));
//            httpContent.Headers.ContentType = new MediaTypeHeaderValue("application/json");


//            var httpClient = new HttpClient();
//            var responseJson = httpClient.PostAsync(url + "/api/Calling/Index", httpContent).Result.Content.ReadAsAsync<ProcessResult>().Result;

//            return View();
//        }


//        // GET: CallingTest
//        public ActionResult Index3()
//        {
//            var postData = new ProcessRequest()
//            {
//                Service = "Order",
//                Method = "Test3",
//                Dto = "111111"
//            };


//            HttpContent httpContent = new StringContent(JsonConvert.SerializeObject(postData));
//            httpContent.Headers.ContentType = new MediaTypeHeaderValue("application/json");

//            var httpClient = new HttpClient();
//            var responseJson = httpClient.PostAsync(url + "/api/Calling/Index", httpContent).Result.Content.ReadAsAsync<ProcessResult>().Result;

//            return View();
//        }


//    }
//}