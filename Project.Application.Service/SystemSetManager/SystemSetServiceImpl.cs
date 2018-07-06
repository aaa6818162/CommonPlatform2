using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;
using System.Web;
using Project.Infrastructure.FrameworkCore.ToolKit.ValidateHandler;
using Project.Model.SystemSetManager;
using Project.Repository.SystemSetManager;

namespace Project.Application.Service.SystemSetManager
{
    public class SystemSetServiceImpl : IServiceImpl
    {
        private AuthCodeRepository _authCodeRepository;
        public SystemSetServiceImpl()
        {
            _authCodeRepository = new AuthCodeRepository();
        }


        /// <summary>
        /// 发送手机验证码
        /// </summary>
        /// <param name="mobile"></param>
        /// <param name="authType">操作行为</param>
        /// <returns></returns>
        public Tuple<bool, string> SendMobileAuthCode(string mobile, string authType)
        {
            if (!ValidateRegExp.IsMobile(mobile.Trim()))
                return new Tuple<bool, string>(false, "请输入正确的手机号！");

            var historyAuthCodeList = _authCodeRepository.Query().Where(p => p.ReciviceUser == mobile && p.CreateDate >= DateTime.Today).ToList();

            if (historyAuthCodeList.Count > 20)
            {
                return new Tuple<bool, string>(false, "您今日发送的短信量已使用完");
            }

            var authCodeEntity = new AuthCodeEntity();
            authCodeEntity.CreateDate = DateTime.Now;
            authCodeEntity.EndDate = DateTime.Now.AddMinutes(2);
            authCodeEntity.ReciviceUser = mobile;
            authCodeEntity.AuthType = "";
            authCodeEntity.SendType = "mobile";
            authCodeEntity.AuthCode = new Random().Next(1000, 9999).ToString();

            var pkId = _authCodeRepository.Save(authCodeEntity);

            if (pkId > 0)
            {
                if (!string.IsNullOrWhiteSpace(mobile))
                {
                    string usr = "890033";
                    string pwd = "by2016";
                    string phonebaseUrl = "http://120.27.218.68:9091/smhttphandle.aspx";
                    string message = "【hhh】尊敬的用户，您的验证码：" + authCodeEntity.AuthCode;

                    message=HttpUtility.UrlEncode(message, Encoding.GetEncoding("gb2312"));

                    string param = "usr=" + usr + "&pwd=" + pwd + "&mobile=" + mobile + "&sms=" + message + "&priority=9&extdsrcid=";


                    var request = (HttpWebRequest)WebRequest.Create(phonebaseUrl+"?"+ param);
                    var response = (HttpWebResponse)request.GetResponse();
                    var responseString = new StreamReader(response.GetResponseStream()).ReadToEnd();

                }
            }

            return new Tuple<bool, string>(pkId > 0, "");

        }


        /// <summary>
        /// UTF8转换成GB2312
        /// </summary>
        /// <param name="text"></param>
        /// <returns></returns>
        public  string utf8_gb2312(string text)
        {
            //声明字符集   
            System.Text.Encoding utf8, gb2312;
            //utf8   
            utf8 = System.Text.Encoding.GetEncoding("utf-8");
            //gb2312   
            gb2312 = System.Text.Encoding.GetEncoding("gb2312");
            byte[] utf;
            utf = utf8.GetBytes(text);
            utf = System.Text.Encoding.Convert(utf8, gb2312, utf);
            //返回转换后的字符   
            return gb2312.GetString(utf);
        }

    }
}
