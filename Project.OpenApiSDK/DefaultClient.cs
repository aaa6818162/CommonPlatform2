using System;
using System.Collections.Generic;
using System.Configuration;
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


            string privateKey = @"<RSAKeyValue><Modulus>zGvTs1OYFxYqP7tkQjizKyTgHLXeBrwc0i3/LxY+U/eznD6XEyRa/Jv4Jy4KKrZ3hzhiQ2/AfxNtesfCYdEPD4lhdVoAkIY+QwiBHTNhobYiSvW3sBWCe01jK0J3xIkoIREgnEvXQlBdhp0VTxkARu1vPlsZ5UxKJc9825fBCnU=</Modulus><Exponent>AQAB</Exponent><P>+deM9PAF3HaW5CwDMaxGDGP2jZl/YDIZ3MAnG3drnXC8Yo0evWADThCqCE5OJrd31fOL69c+DcLW4urkDSrwjw==</P><Q>0XWuTUnUXzMTLkXZTtBDMxhJGwHQodi6iDlbD41iu4CsdBSbwJawA4REmxx9Yrcz1icjeZIIICEjSO6nKsyOuw==</Q><DP>iDnlm7A8Iedvgt4Up8L9NshSqQanEzZ+L4V+TVWiEehkb3/u4Oc3Jhuj+n9n0Wh8KOZwxplINoykSno0+pENNQ==</DP><DQ>sm6ypmqPfO3QmCmunkIyDNPSayxXo5gyBxv9I7mI8zwBLP3lVOHJXaWOoChb8/0nLna29LhfLaetHFMZmw8ZQw==</DQ><InverseQ>S50U467kwk7OwGIU1ySH2gdMIAMpHl+JRiPnJYrz5ijqjNnx4ETNvp88orQWhAFBCOxyfaqdSU4zevGmf4dE/w==</InverseQ><D>OS1z0nXwVYzKlnb4zRkE7G1tDjrEdofJW/SnqukC2AOxxmMvaJhDpuKNX5AeIeJVvonD2m74ndK2TaBwO2H5XvOqvrEF0Nk9hSdWDte7AsO1H/YamLj5P8NEQpqfekL0G0WpVcl7JSQYwYGA8zmGFbIJT89i7q7XDx+/P2z7d6U=</D></RSAKeyValue>";

            var timestamp = (DateTime.Now.ToUniversalTime() - new DateTime(1970, 1, 1)).TotalMilliseconds.ToString();
            var nonce = Guid.NewGuid().ToString();

            var data = request.Content.ReadAsStringAsync().Result;

            request.Headers.Add("timestamp", timestamp); //发起请求时的时间戳（单位：毫秒）
            request.Headers.Add("nonce", nonce); //nonce（随机数)
            request.Headers.Add("signature", SignHelper.Sign(data, privateKey)); //当前请求内容的数字签名
        }


    }
}
