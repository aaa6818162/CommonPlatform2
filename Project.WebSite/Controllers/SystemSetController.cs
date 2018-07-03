using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Project.Infrastructure.FrameworkCore.ToolKit.JsonHandler;
using Project.Infrastructure.FrameworkCore.ToolKit.ValidateHandler;
using Project.Application.Service.SystemSetManager;
using Project.Infrastructure.FrameworkCore.DataNhibernate.Helpers;
using Project.Infrastructure.FrameworkCore.ToolKit;
using Project.Infrastructure.FrameworkCore.ToolKit.ImageHandler;
using Project.Infrastructure.FrameworkCore.ToolKit.LinqExpansion;
using Project.Infrastructure.FrameworkCore.ToolKit.StringHandler;
using Project.Infrastructure.FrameworkCore.WebMvc.Controllers.Results;
using Project.Model.SystemSetManager;
using Project.Service.SystemSetManager;

namespace Project.WebSite.Controllers
{
    public class SystemSetController : Controller
    {
        // GET: SystemSet
        public ActionResult Index()
        {
            return View();
        }
        #region
        /// <summary>
        /// 发送手机验证号
        /// </summary>
        /// <param name="mobile"></param>
        /// <param name="authType"></param>
        /// <returns></returns>
        [HttpPost]
        public ContentResult SendMobileCode(string mobile, string authType)
        {
            var result = new SystemSetServiceImpl().SendMobileAuthCode(mobile, authType);
            return Content(JsonHelper.ReturnMsg(result.Item1, result.Item2));
        }


        /// <summary>
        /// 检查文本验证码
        /// </summary>
        /// <param name="authCode"></param>
        /// <param name="username"></param>
        /// <returns></returns>
        [HttpPost]
        public ContentResult CheckVerifyCode(string authCode, string username)
        {
            var dt = DateTime.Now;
            if (authCode.Length != 4)
                return Content(JsonHelper.ReturnMsg(false, "验证码错误"));

            var verifyCode = CookieHelper.GetValue("SSSSverifycode");
            if (!verifyCode.ToLower().Equals(authCode.ToLower()))
                return Content(JsonHelper.ReturnMsg(false, "验证码错误"));
            return Content(JsonHelper.ReturnMsg(true));
        }

        /// <summary>
        /// 获取文本验证码
        /// </summary>
        /// <param name="height"></param>
        /// <returns></returns>
        public ActionResult VerifyCode(int height = 0)
        {
            var image = new VerificationImage();
            var authCode = StringHelper.GetRnd(4, true, true, true, false, "");
            image.Width = 70;
            if (height > 0 && height <= 30)
            {
                image.Height = height;
            }
            else
            {
                image.Height = 30;
            }
            image.BorderWidth = 1;
            image.BadPiont = 200;
            image.StrukLineCount = 8;
            image.PatternCount = 6;
            image.BorderInsetColor = System.Drawing.Color.LightGray;
            image.BorderOutsetColor = System.Drawing.Color.Empty;
            image.Text = authCode;
            image.CreateImage();

            CookieHelper.Set("SSSSverifycode", 1, authCode);
            return File(image.Stream.ToArray(), @"image/jpeg");
        }

        #endregion

        #region 省市区相关

        /// <summary>
        /// 省
        /// </summary>
        /// <returns></returns>

        public string GetProvinceList()
        {
            var where = new ProvinceEntity();
            var searchList = ProvinceService.GetInstance().GetList(where);
            string str = "";
            searchList.ForEach(p =>
            {
                str += "<option value=\"" + p.ProvinceId + "\">" + p.Province + "</option>";
            });

            return str;
        }

        /// <summary>
        /// 市
        /// </summary>
        /// <returns></returns>

        public string GetListCityList()
        {
            var where = new CityEntity();
            where.ProvinceId = RequestHelper.GetString("ProvinceId");
            var searchList = CityService.GetInstance().GetList(where);
            string str = "";
            searchList.ForEach(p =>
            {
                str += "<option value=\"" + p.CityId + "\">" + p.City + "</option>";
            });

            return str;
        }

        /// <summary>
        /// 区
        /// </summary>
        /// <returns></returns>

        public string GetAreaList()
        {
            var where = new AreaEntity();
            where.CityId = RequestHelper.GetString("CityId");
            var searchList = AreaService.GetInstance().GetList(where);
            string str = "";
            searchList.ForEach(p =>
            {
                str += "<option value=\"" + p.AreaId + "\">" + p.Area + "</option>";
            });

            return str;
        }
        #endregion

    }
}