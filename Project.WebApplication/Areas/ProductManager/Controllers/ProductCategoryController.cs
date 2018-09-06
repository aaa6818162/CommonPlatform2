

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
    public class ProductCategoryController : BaseController
    {

        public ActionResult Hd(int pkId = 0)
        {
            if (pkId > 0)
            {
                var entity = ProductCategoryService.GetInstance().GetModelByPk(pkId);
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
            var where = new ProductCategoryEntity();
            where.ProductCategoryName = RequestHelper.GetString("ProductCategoryName");
            var searchList = ProductCategoryService.GetInstance().GetList(where);
            var dataGridEntity = new DataGridTreeResponse<ProductCategoryEntity>(searchList.Count, searchList);
            return new MvcJsonResult(dataGridEntity, new NHibernateContractResolver(null, new string[] { "children" }));
        }


        public MvcJsonResult GetList_Combotree()
        {
            var where = new ProductCategoryEntity();

            var list =new List<ProductCategoryEntity>();
            if (RequestHelper.GetInt("SystemCategoryId")>0)
            {
                list =  ProductCategoryService.GetInstance() .GetTopProductCategoryList(RequestHelper.GetInt("SystemCategoryId")).ToList();
            }
            else
            {
                list = ProductCategoryService.GetInstance().GetTopProductCategoryList().ToList();
            }

            return new MvcJsonResult(list, new NHibernateContractResolver(new string[] { "children" }));
        }
        [HttpPost]
        public MvcJsonResult Add(AjaxRequest<ProductCategoryEntity> postData)
        {
            var addResult = ProductCategoryService.GetInstance().Add(postData.RequestEntity);
            var result = new AjaxResponse<ProductCategoryEntity>()
            {
                Success = true,
                Result = postData.RequestEntity
            };
            return new MvcJsonResult(result, new NHibernateContractResolver());
        }


        [HttpPost]
        public MvcJsonResult Edit(AjaxRequest<ProductCategoryEntity> postData)
        {
            var newInfo = postData.RequestEntity;
            var orgInfo = ProductCategoryService.GetInstance().GetModelByPk(postData.RequestEntity.PkId);
            var mergInfo = Mapper.Map(newInfo, orgInfo);
            var updateResult = ProductCategoryService.GetInstance().Update(mergInfo);

            var result = new AjaxResponse<ProductCategoryEntity>()
            {
                Success = updateResult,
                Result = postData.RequestEntity
            };
            return new MvcJsonResult(result, new NHibernateContractResolver(new string[] { "result" }));
        }

        [HttpPost]
        public MvcJsonResult Delete(int pkid)
        {
            var deleteResult = ProductCategoryService.GetInstance().DeleteByPkId(pkid);
            var result = new AjaxResponse<ProductCategoryEntity>()
            {
                Success = deleteResult
            };
            return new MvcJsonResult(result, new NHibernateContractResolver(new string[] { "result" }));
        }
    }
}




