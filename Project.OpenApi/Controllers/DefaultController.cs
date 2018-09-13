using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Results;
using Project.Infrastructure.FrameworkCore.ApplicationService;
using Project.Infrastructure.FrameworkCore.WebMvc.Controllers.Results;
using Project.Infrastructure.FrameworkCore.WebMvc.Models;
using Project.OpenApi.App_Start;
using Project.OpenApi.Models;


namespace Project.OpenApi.Controllers
{


    public class DefaultController : ApiController
    {


        [SelfAuthorAttribute]
        public GetResponse PostWithOutToken(GetRequest request)
        {
            return new GetResponse() { Value1 = request.Value1 };
        }


        [SelfAuthorAttribute]
        public WebAPIResponse<GetResponse> PostWithToken(GetRequest request)
        {
            return new WebAPIResponse<GetResponse>(new GetResponse() { Value1 = "成功顶顶顶顶顶顶顶顶顶顶大" });
        }


        public GetResponse tttttt1(GetRequest request)
        {
            return new GetResponse()
            {
                Value1 = "22",
                Value2 = "333'"
            };
        }

        [SelfAuthorAttribute]
        public WebAPIResponse<GetResponse> tttttt2(GetRequest request)
        {
            return new WebAPIResponse<GetResponse>()
            {
                Success = true,
                Result = new GetResponse()
                {
                    Value1 = "11111111",
                    Value2 = "22222222222",
                    List = new List<PostRequest>() { new PostRequest()
                    {
                        Value1 = "xxxxxx1111",
                        Value2 = "xxxxxxxx2222222"
                    } }
                }

            };
        }


    }


    public class GetRequest : AuthRequest
    {
        public string Value1 { get; set; }

        public string Value2 { get; set; }

        #region Implementation of IAuthRequest

        public string Token { get; set; }

        #endregion
    }

    [Serializable]
    public class GetResponse
    {
        public string Value1 { get; set; }

        public string Value2 { get; set; }


        public List<PostRequest> List{ get; set; }
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
