using System;
using System.Collections.Generic;
using System.Configuration;
using System.Drawing;
using System.IO;
using System.Linq;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;
using System.Web;
using System.Web.Http;
using System.Web.Http.Results;
using System.Web.Mvc;
using AutoMapper;
using Castle.Core.Internal;
using Newtonsoft.Json;
using Newtonsoft.Json.Converters;
using Project.Infrastructure.FrameworkCore.ToolKit;
using Project.Model.Other;
using Project.Model.PermissionManager;
using Project.Model.ReportManager;
//using Project.Model.RiverManager;
using Project.Service.HRManager;
using Project.Service.OrderManager;
using Project.Service.PermissionManager;
using Project.Service.ReportManager;
//using Project.Service.RiverManager;
using Project.Service.SalePromotionManager;
using Project.WebApplication.Models;
using Project.WebApplication.Models.Request;
using Project.WebApplication.Models.Response;

namespace Project.WebApplication.Controllers
{

    public class TimeTaskController : ApiController
    {

        //[System.Web.Http.HttpPost]
        //public JsonResult SyncProductPromotionPrice([FromBody]string name)
        //{
        //    return new JsonResult() {};
        //}

        [System.Web.Http.HttpPost]
        public JsonResult SyncProductPromotionPrice()
        {
            new RuleService().SyncProductPromotionPrice();

            return new JsonResult() { };
        }


        [System.Web.Http.HttpPost]
        public JsonResult InitTicketStatus()
        {
            new TicketService().InitTicketStatus();

            return new JsonResult() { };
        }


        [System.Web.Http.HttpPost]
        public JsonResult CancelOutDateOrder()
        {
            new OrderMainService().CancelOutDateOrder();

            return new JsonResult() { };
        }


    }

   
}