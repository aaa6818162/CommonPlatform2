using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Web;
using System.Web.Mvc;
using System.Web.Security;
using System.Xml.Linq;
using Aspose.Cells;
using Newtonsoft.Json;
using Project.Infrastructure.FrameworkCore.DataNhibernate;
using Project.Infrastructure.FrameworkCore.Logging;
using Project.Infrastructure.FrameworkCore.ToolKit;
using Project.Infrastructure.FrameworkCore.ToolKit.Extensions;
using Project.Infrastructure.FrameworkCore.WebMvc.Controllers.Results;
using Project.Infrastructure.FrameworkCore.WebMvc.Models;
using Project.Model.Other;
using Project.Model.PermissionManager;
using Project.Model.SalePromotionManager;
using Project.Service.PermissionManager;
using Project.Service.SalePromotionManager;

namespace Project.WebApplication.Controllers
{


    public class DepatmentTemp
    {
        /// <summary>
        /// 机构代码
        /// </summary>
        public string JGDM { get; set; }


        /// <summary>
        /// 医疗机构编码
        /// </summary>
        public string JGBM { get; set; }

        /// <summary>
        /// 机构名称
        /// </summary>
        public string JGMC { get; set; }

        /// <summary>
        /// 科室名称
        /// </summary>
        public string KSMC { get; set; }

        /// <summary>
        /// 科室代码
        /// </summary>
        public string KSDM { get; set; }

        /// <summary>
        /// 科室父级编码
        /// </summary>
        public string KSFJBM { get; set; }

        /// <summary>
        ///  机构/科室状态代码
        /// </summary>
        public string TYPE { get; set; }
    }
    public class LoginController : Controller
    {
        public static DateTime UpdateTime = DateTime.Now.AddDays(-1);

        // public static int dd = 1;

        // GET: Login
        public ActionResult Index3()
        {

            return View();
        }

        public ActionResult Index2()
        {
            using (var tx = NhTransactionHelper.BeginTransaction())
            {
                try
                {
                    for (int i = 0; i < 1000; i++)
                    {
                   //var t=     TicketService.GetInstance().GetModelByPk(i + 1);
                   //     t.UseFor = "1";
                   //     TicketService.GetInstance().Update(t);
                    }

                    //for (int i = 0; i < 1000; i++)
                    //{
                    //    TicketService.GetInstance().Add(new TicketEntity()
                    //    {
                    //        TicketCode = i.ToString()
                    //    });
                    //}
                    tx.Commit();
                }
                catch (Exception e)
                {
                    tx.Rollback();
                }
            }

            return View();
        }

        public string HtmlDecodeCus(string sText)
        {
            string stroutput = sText;

            stroutput = stroutput.Replace("&quot;", "\"");
            stroutput = stroutput.Replace("&lt;", "<");
            stroutput = stroutput.Replace("&gt;", ">");
            stroutput = stroutput.Replace("&#146;", "\'");
            stroutput = stroutput.Replace("&nbsp;", " ");
            stroutput = stroutput.Replace("<br>", "\r");
            stroutput = stroutput.Replace("&nbsp;&nbsp;&nbsp;&nbsp;", "\t");


            return stroutput.Replace("&nbsp;", " ").Replace("<br />", "\r\n");
        }

        [HttpPost]
        public JsonResult UserLogin(string userCode, string password)
        {
            LoggerHelper.Info("登陆前：");
            var userInfo = UserInfoService.GetInstance().Login(userCode, password);
            if (!userInfo.Item1)
            {
                return new MvcJsonResult
                {
                    Data = new AjaxResponse<object>() { Success = false, Error = new ErrorInfo(userInfo.Item2) }
                };
            }

            var ticket = new FormsAuthenticationTicket(
            1 /*version*/,
            Guid.NewGuid().ToString(),
            DateTime.Now,
            DateTime.Now.AddMinutes(30000),
            true,//持久性
            JsonConvert.SerializeObject(userInfo.Item3),
            FormsAuthentication.FormsCookiePath);
            var encryptedTicket = FormsAuthentication.Encrypt(ticket);
            var cookie = new HttpCookie(FormsAuthentication.FormsCookieName, encryptedTicket);
            cookie.Expires = DateTime.Now.AddMinutes(30000);
            cookie.HttpOnly = true;
            Response.Cookies.Add(cookie);

          //  FormsAuthentication.SetAuthCookie(FormsAuthentication.FormsCookieName,false);

            LoggerHelper.Info("登陆结束：");
            return new MvcJsonResult
            {
                Data = new AjaxResponse<object>() { Success = true }
            };
        }


        [HttpPost]
        public JsonResult UserLogoff(string userCode, string password)
        {
            FormsAuthentication.SignOut();
            CookieHelper.Del(FormsAuthentication.FormsCookieName); ;
            return new MvcJsonResult
            {
                Data = new AjaxResponse<object>() { Success = true }
            };
        }

    }
}