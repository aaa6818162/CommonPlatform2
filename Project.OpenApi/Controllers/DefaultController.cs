using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Results;

using Project.Infrastructure.FrameworkCore.WebMvc.Controllers.Results;
using Project.Infrastructure.FrameworkCore.WebMvc.Models;


namespace Project.OpenApi.Controllers
{
    

    public class DefaultController : ApiController
    {


        [System.Web.Http.HttpGet]
        public string Get(string value)
        {
            return value;
        }

        [Route("customers/2/orders")]
        public JsonResult<GetResponse> Get2(string Value1, string Value2)
        {
            return Json(new GetResponse() {Value1 = Value1});
        }



        [Route("customers/1/orders")]
        public GetResponse Get2(GetRequest request )
        {
            return new GetResponse() { Value1 = request.Value1 };
        }



        [Route("customers/post/orders")]
        public GetResponse Post(GetRequest request)
        {
            return new GetResponse() { Value1 = request.Value1 };
        }



        ////[HttpPost]
        ////public string Post([FromBody]string value)
        ////{
        ////    return value;
        ////}


        //[HttpPost]
        //public string Post(string value)
        //{
        //    return value;
        //}





        //[HttpPost]
        //public PostResponse Post(PostRequest request)
        //{
        //    return new PostResponse()
        //    {
        //        Value1 = request.Value1,
        //        Value2 = request.Value2
        //    };
        //}



    }


    public class GetRequest
    {
        public string Value1 { get; set; }

        public string Value2 { get; set; }
    }

    [Serializable]
    public class GetResponse
    {
        public string Value1 { get; set; }

        public string Value2 { get; set; }
    }



    public class PostRequest
    {
        public string Value1 { get; set; }

        public string Value2 { get; set; }
    }

    public class PostResponse
    {
        public string Value1 { get; set; }

        public string Value2 { get; set; }
    }


}
