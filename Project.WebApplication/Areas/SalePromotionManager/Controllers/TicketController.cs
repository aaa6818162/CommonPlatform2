

using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Mvc;
using AutoMapper;
using Project.Infrastructure.FrameworkCore.DataNhibernate.Helpers;
using Project.Infrastructure.FrameworkCore.ToolKit;
using Project.Infrastructure.FrameworkCore.ToolKit.JsonHandler;
using Project.Infrastructure.FrameworkCore.ToolKit.LinqExpansion;
using Project.Infrastructure.FrameworkCore.WebMvc.Controllers.Results;
using Project.Infrastructure.FrameworkCore.WebMvc.Models;
using Project.Model.SalePromotionManager;
using Project.Service.SalePromotionManager;
using Project.WebApplication.Controllers;

namespace Project.WebApplication.Areas.SalePromotionManager.Controllers
{
    public class TicketController : BaseController
    {

        public ActionResult Hd(int pkId = 0)
        {
            if (pkId > 0)
            {
                var entity = TicketService.GetInstance().GetModelByPk(pkId);
                ViewBag.BindEntity = JsonHelper.JsonSerializer(entity);
            }
            return View();
        }

 
        public ActionResult List()
        {

            var html = "";
           var list=     ActivityService.GetInstance().GetList(new ActivityEntity());
            list.ForEach(p =>
            {
                html +="<option value=\""+p.PkId+"\">"+p.Title+"</option>";

            });


            ViewBag.ActivityHtml = html;

            return View();
        }

        public MvcJsonResult GetList()
        {
            var pIndex = this.Request["page"].ConvertTo<int>();
            var pSize = this.Request["rows"].ConvertTo<int>();
            var where = new TicketEntity();
            //where.PkId = RequestHelper.GetFormString("PkId");
            where.TicketCode = RequestHelper.GetFormString("TicketCode");
            //where.TickettypeId = RequestHelper.GetFormString("TickettypeId");
            where.Status = RequestHelper.GetFormString("Status");
            where.AvaildateStart = RequestHelper.GetDateTime("AvaildateStart");
            where.AvaildateEnd = RequestHelper.GetDateTime("AvaildateEnd");
            where.UseOrderNo = RequestHelper.GetFormString("UseOrderNo");
            //where.UseDate = RequestHelper.GetFormString("UseDate");
            where.CustomerId = RequestHelper.GetInt("CustomerId");
            //where.RuleId = RequestHelper.GetFormString("RuleId");
            where.ActivityId = RequestHelper.GetInt("ActivityId");
            var searchList = TicketService.GetInstance().Search(where, (pIndex - 1) * pSize, pSize);

            var dataGridEntity = new DataGridResponse()
            {
                total = searchList.Item2,
                rows = searchList.Item1
            };
            return new MvcJsonResult(dataGridEntity, new NHibernateContractResolver());
        }


        [HttpPost]
        public MvcJsonResult Add(AjaxRequest<TicketEntity> postData)
        {
            var addResult = TicketService.GetInstance().Add(postData.RequestEntity);
            var result = new AjaxResponse<TicketEntity>()
               {
                   Success = true,
                   Result = postData.RequestEntity
               };
            return new MvcJsonResult(result, new NHibernateContractResolver());
        }


        [HttpPost]
        public MvcJsonResult Edit( AjaxRequest<TicketEntity> postData)
        {
            var newInfo = postData.RequestEntity;
            var orgInfo = TicketService.GetInstance().GetModelByPk(postData.RequestEntity.PkId);
            var mergInfo = Mapper.Map(newInfo, orgInfo);
            var updateResult = TicketService.GetInstance().Update(mergInfo);
            
            var result = new AjaxResponse<TicketEntity>()
            {
                Success = updateResult,
                Result = postData.RequestEntity
            };
            return new MvcJsonResult(result, new NHibernateContractResolver(new string[] { "result" }));
        }

        [HttpPost]
        public MvcJsonResult Delete(int pkid)
        {
            var deleteResult = TicketService.GetInstance().DeleteByPkId(pkid);
            var result = new AjaxResponse<TicketEntity>()
            {
                Success = deleteResult
            };
            return new MvcJsonResult(result, new NHibernateContractResolver(new string[] { "result" }));
        }
    }
}




