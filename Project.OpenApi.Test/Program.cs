using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Project.OpenApiSDK;

namespace Project.OpenApi.Test
{
    class Program
    {
        static void Main(string[] args)
        {
         var result=   new DefaultClient().Tttttt1Async(new GetRequest()).Result;

            var result3 = new DefaultClient().Tttttt2Async(new GetRequest()).Result;

            var result2 = new AuthorClient().LoginAsync(new LoginRequest() {LoginName = "11",Password = "222"}).Result;

            Console.WriteLine(result);


            Console.WriteLine(result2);
            Console.Read();
        }
    }
}
