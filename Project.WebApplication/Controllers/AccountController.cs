using System.Web.Mvc;
using Project.Config;
using Project.Infrastructure.FrameworkCore.Logging;
using Project.Infrastructure.FrameworkCore.ToolKit;
using Project.Infrastructure.FrameworkCore.WebMvc.Controllers.Results;
using Project.Infrastructure.FrameworkCore.WebMvc.Models;
using Project.Model.HRManager;
using Project.Service.HRManager;
using Project.Service.PermissionManager;
using Project.Service.SystemSetManager;


namespace Project.WebApplication.Controllers
{
    public class AccountController : BaseController
    {
        [Authorize]
        //[PermissionAuthorize]
        // GET: Account
        public ActionResult Index()
        {  // ISAPIRuntime
            //  PageHandlerFactory
            //   ApplicationManager
            //        applicat
            //UrlRoutingModule
            //   MvcHandler

            ViewBag.User = LoginUserInfo;
            ViewBag.ModuleList = UserInfoService.GetInstance().GetMenuDTOList(LoginUserInfo.UserCode, LoginUserInfo.PermissionCodeList);
            //ViewBag.MessagList = MessageInfoService.GetInstance().Search(new MessageInfoEntity()
            //{
            //    SreachNoReadUserCode = LoginUserInfo.UserCode
            //}, 0, 4).Item1;

            return View();
        }



        public JsonResult GetData()
        {
            //var t = new JsonResult();
            //t.Data = new { success = true, Message = "成功！", unAuthorizedRequest = false, targetUrl="http://www.baidu.com" };
            //return t;

            return new MvcJsonResult
            {
                Data = new AjaxResponse<object>() { Success = true, Result = "{'name':'1111'}", }
            };
        }

        [HttpPost]
        public AbpJsonResult<string> ChangePassword()
        {
            var result = UserInfoService.GetInstance().ChangePassword(this.LoginUserInfo.UserCode, RequestHelper.GetString("Password"));
            return new AbpJsonResult<string>(result);
        }


        public ActionResult Default()
        {
            ViewBag.Des = IndexPageSetService.GetInstance().GetModelByPk(SiteConfig.GetConfig().IndexPagePkId).Des;

            return View();
        }


    }

}