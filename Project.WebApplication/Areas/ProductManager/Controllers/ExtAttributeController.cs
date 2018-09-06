

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
using Project.Model.ProductManager;
using Project.Service.ProductManager;
using Project.WebApplication.Controllers;

namespace Project.WebApplication.Areas.ProductManager.Controllers
{
    public class ExtAttributeController : BaseController
    {

        public ActionResult Hd(int pkId = 0)
        {
            if (pkId > 0)
            {
                var entity = ExtAttributeService.GetInstance().GetModelByPk(pkId);
                ViewBag.BindEntity = JsonHelper.JsonSerializer(entity);
            }
            return View();
        }

 
        public ActionResult List()
        {
            return View();
        }

        public MvcJsonResult GetList()
        {
            var pIndex = this.Request["page"].ConvertTo<int>();
            var pSize = this.Request["rows"].ConvertTo<int>();
            var where = new ExtAttributeEntity();
            //where.PkId = RequestHelper.GetFormString("PkId");
            where.AttributeName = RequestHelper.GetFormString("AttributeName");
            //where.OtherName = RequestHelper.GetFormString("OtherName");
            //where.ShowType = RequestHelper.GetFormString("ShowType");
            //where.AttributeValues = RequestHelper.GetFormString("AttributeValues");
            var searchList = ExtAttributeService.GetInstance().Search(where, (pIndex - 1) * pSize, pSize);

            var dataGridEntity = new DataGridResponse()
            {
                total = searchList.Item2,
                rows = searchList.Item1
            };
            return new MvcJsonResult(dataGridEntity, new NHibernateContractResolver());
        }


        /// <summary>
        /// 扩展属性值
        /// </summary>
        /// <returns></returns>
        public MvcJsonResult GetAttributeValueList()
        {
            var where = new AttributeValueEntity();
            where.AttributeId = RequestHelper.GetInt("AttributeId");
            var searchList = AttributeValueService.GetInstance().GetList(where);
            var dataGridEntity = new DataGridResponse()
            {
                total = searchList.Count,
                rows = searchList
            };
            return new MvcJsonResult(dataGridEntity, new NHibernateContractResolver());
        }


        [HttpPost]
        public MvcJsonResult Add(AjaxRequest<ExtAttributeEntity> postData)
        {
            var addResult = ExtAttributeService.GetInstance().Add(postData.RequestEntity);
            var result = new AjaxResponse<ExtAttributeEntity>()
               {
                   Success = true,
                   Result = postData.RequestEntity
               };
            return new MvcJsonResult(result, new NHibernateContractResolver());
        }


        [HttpPost]
        public MvcJsonResult Edit( AjaxRequest<ExtAttributeEntity> postData)
        {

            var updateResult = ExtAttributeService.GetInstance().Update(postData.RequestEntity);
            
            var result = new AjaxResponse<ExtAttributeEntity>()
            {
                Success = updateResult,
                Result = postData.RequestEntity
            };
            return new MvcJsonResult(result, new NHibernateContractResolver(new string[] { "result" }));
        }

        [HttpPost]
        public MvcJsonResult Delete(int pkid)
        {
            var deleteResult = ExtAttributeService.GetInstance().DeleteByPkId(pkid);
            var result = new AjaxResponse<ExtAttributeEntity>()
            {
                Success = deleteResult
            };
            return new MvcJsonResult(result, new NHibernateContractResolver(new string[] { "result" }));
        }
    }
}




