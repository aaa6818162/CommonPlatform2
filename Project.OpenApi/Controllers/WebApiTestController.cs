//using System;
//using System.Collections.Generic;
//using System.Linq;
//using System.Net.Http;
//using System.Net.Http.Headers;
//using System.Web;
//using System.Web.Mvc;
//using Newtonsoft.Json;

//namespace Project.OpenApi.Controllers
//{
//    /// <summary>
//    /// 参考文档https://www.cnblogs.com/wangjiming/p/8378108.html#2-1.2
//    /// </summary>
//    public class WebApiTestController : Controller
//    {

//        public string url = "http://localhost:33806";

//        // GET: WebApiTest
//        public ActionResult Index()
//        {
//            var httpClient = new HttpClient();
//            var responseJson2 = httpClient.GetStringAsync(url+"/api/Default/Get?value=111").Result;
//            var result = JsonConvert.DeserializeObject<string>(responseJson2);

//            return View();
//        }


//        public ActionResult Index2()
//        {
//            var httpClient = new HttpClient();

//            HttpContent httpContent = new StringContent(JsonConvert.SerializeObject(new PostRequest()
//            {
//                Value2 = "2",
//                Value1 = "1"
//            }));
//            httpContent.Headers.ContentType = new MediaTypeHeaderValue("application/json");

//            var responseJson2 = httpClient.GetStringAsync(url + "/api/Default/Get?Value1=1&Value2=3").Result;
//            var result = JsonConvert.DeserializeObject<GetResponse>(responseJson2);
//            return View();
//        }


//        public ActionResult Index3()
//        {


//            HttpContent httpContent = new StringContent("{\"\":\"111\"}");
//            httpContent.Headers.ContentType = new MediaTypeHeaderValue("application/x-www-form-urlencoded");

//            var httpClient = new HttpClient();
//            var responseJson = httpClient.PostAsync(url+ "/api/Default/Post?value=111", httpContent).Result.Content.ReadAsAsync<string>();

//            return View();
//        }


//        public ActionResult Index4()
//        {
//            HttpContent httpContent = new StringContent(JsonConvert.SerializeObject(new PostRequest()
//            {
//                Value2 = "2",
//                Value1 = "1"
//            }));
//            httpContent.Headers.ContentType = new MediaTypeHeaderValue("application/json");

//            var httpClient = new HttpClient();
//            var responseJson = httpClient.PostAsync(url + "/api/Default/Post", httpContent).Result.Content.ReadAsAsync<PostResponse>();

//            return View();
//        }


//        public ActionResult Index5()
//        {

//            //只能对应  public PostResponse Post(PostRequest request)

//            HttpContent httpContent = new StringContent("{\"\":\"111\"}");
//            httpContent.Headers.ContentType = new MediaTypeHeaderValue("application/json");

//            var httpClient = new HttpClient();
//            var responseJson = httpClient.PostAsync(url + "/api/Default/Post", httpContent).Result.Content.ReadAsAsync<string>();

//            return View();
//        }


//    }
//}