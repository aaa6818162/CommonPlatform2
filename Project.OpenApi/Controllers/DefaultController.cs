using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Results;


namespace Project.OpenApi.Controllers
{
    public class DefaultController : ApiController
    {


        [System.Web.Http.HttpGet]
        public string Get(string value)
        {
            return value;
        }

        [System.Web.Http.HttpPost]
        public JsonResult<GetResponse> Get2(string Value1, string Value2)
        {
            return Json( new GetResponse()
            {
                Value1 = Value1,
                Value2 = Value2
            });
        }

        ///// <summary>
        ///// 有问题不支持
        ///// </summary>
        ///// <param name="request"></param>
        ///// <returns></returns>
        //[HttpGet]
        //public GetResponse Get(GetRequest request)
        //{
        //    return new GetResponse()
        //    {
        //        Value1 = request.Value1,
        //        Value2 = request.Value2
        //    };
        //}


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
