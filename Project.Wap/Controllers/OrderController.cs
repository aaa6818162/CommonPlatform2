using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Web.Mvc;
using Project.Application.Service.AccountManager;
using Project.Application.Service.OrderManager;
using Project.Application.Service.OrderManager.Help;
using Project.Application.Service.OrderManager.Request;
using Project.Application.Service.OrderManager.Response;
using Project.Config;
using Project.Config.OrderEnum;
using Project.Infrastructure.FrameworkCore.DataNhibernate.Helpers;
using Project.Infrastructure.FrameworkCore.Payment.ChinaPay;
using Project.Infrastructure.FrameworkCore.Payment.Configs;
using Project.Infrastructure.FrameworkCore.Payment.Factory;
using Project.Infrastructure.FrameworkCore.Payment.Model;
using Project.Infrastructure.FrameworkCore.Payment.Services;
using Project.Infrastructure.FrameworkCore.ToolKit;
using Project.Infrastructure.FrameworkCore.WebMvc.Controllers.Results;
using Project.Infrastructure.FrameworkCore.WebMvc.Models;
using Project.Model.OrderManager;

namespace Project.Wap.Controllers
{
    public class OrderController : BaseController
    {

        #region 视图
        // GET: Order
        public ActionResult Pay()
        {
            return View();
        }


     


        #endregion


        #region 操作

      



        #endregion



        /// <summary>
        /// 是否微信浏览器
        /// </summary>
        /// <returns></returns>
        private bool IsWechatApp()
        {
            return (Request.UserAgent ?? string.Empty).ToLower().Contains("micromessenger");
        }

    }
}