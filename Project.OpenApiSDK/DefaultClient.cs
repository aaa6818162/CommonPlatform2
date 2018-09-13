using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Project.OpenApiSDK.Tool;

namespace Project.OpenApiSDK
{
    public partial class DefaultClient
    {
        partial void PrepareRequest(System.Net.Http.HttpClient client, System.Net.Http.HttpRequestMessage request, System.Text.StringBuilder urlBuilder)
        {
            var timestamp = (DateTime.Now.ToUniversalTime() - new DateTime(1970, 1, 1)).TotalMilliseconds.ToString();
            var nonce = Guid.NewGuid().ToString();

            var data = request.Content.ReadAsStringAsync().Result;

            request.Headers.Add("timestamp", timestamp); //发起请求时的时间戳（单位：毫秒）
            request.Headers.Add("nonce", nonce); //nonce（随机数)
            request.Headers.Add("signature", SignHelper.Sign(data, "")); //当前请求内容的数字签名
        }


    }
}
