

using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Mvc;
using Project.Infrastructure.FrameworkCore.DataNhibernate.Helpers;
using Project.Infrastructure.FrameworkCore.ToolKit;
using Project.Infrastructure.FrameworkCore.ToolKit.JsonHandler;
using Project.Infrastructure.FrameworkCore.ToolKit.LinqExpansion;
using Project.Infrastructure.FrameworkCore.WebMvc.Controllers.Results;
using Project.Infrastructure.FrameworkCore.WebMvc.Models;
using Project.Model.PermissionManager;
using Project.Service.PermissionManager;
using Project.WebApplication.Controllers;

namespace Project.WebApplication.Areas.PermissionManager.Controllers
{
    public class RoleController : BaseController
    {

        public ActionResult Hd(int pkId = 0)
        {
            if (pkId > 0)
            {
                var entity = RoleService.GetInstance().GetModelByPk(pkId);
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
            var where = new RoleEntity();
			//where.PkId = RequestHelper.GetFormString("PkId");
			where.RoleName = RequestHelper.GetFormString("RoleName");
			//where.Remark = RequestHelper.GetFormString("Remark");
            var searchList = RoleService.GetInstance().Search(where, (pIndex - 1) * pSize, pSize);

            var dataGridEntity = new DataGridResponse()
            {
                total = searchList.Item2,
                rows = searchList.Item1
            };
            return new MvcJsonResult(dataGridEntity, new NHibernateContractResolver());
        }

        public ActionResult RoleFunctionDetailList()
        {
            return View();
        }

        public MvcJsonResult GetRoleFunctionDetailList()
        {
            var pIndex = this.Request["page"].ConvertTo<int>();
            var pSize = this.Request["rows"].ConvertTo<int>();
            var where = new FunctionEntity();
            //where.PkId = RequestHelper.GetFormString("PkId");
            //where.RoleName = RequestHelper.GetFormString("RoleName");
            //where.Remark = RequestHelper.GetFormString("Remark");
            var searchList = FunctionService.GetInstance().GetList(where);

            var dataGridEntity = new DataGridResponse()
            {
                total = searchList.Count,
                rows = searchList
            };
            return new MvcJsonResult(dataGridEntity, new NHibernateContractResolver());
        }



        [HttpPost]
        public MvcJsonResult Add(AjaxRequest<RoleEntity> postData)
        {
            var addResult = RoleService.GetInstance().Add(postData.RequestEntity);
            var result = new AjaxResponse<RoleEntity>()
               {
                   Success = true,
                   Result = postData.RequestEntity
               };
            return new MvcJsonResult(result, new NHibernateContractResolver());
        }


        [HttpPost]
        public MvcJsonResult Edit( AjaxRequest<RoleEntity> postData)
        {
            var updateResult = RoleService.GetInstance().Update(postData.RequestEntity);
            var result = new AjaxResponse<RoleEntity>()
            {
                Success = updateResult,
                Result = postData.RequestEntity
            };
            return new MvcJsonResult(result, new NHibernateContractResolver(new string[] { "result" }));
        }

        [HttpPost]
        public MvcJsonResult Delete(int pkid)
        {
            var deleteResult = RoleService.GetInstance().DeleteByPkId(pkid);
            var result = new AjaxResponse<RoleEntity>()
            {
                Success = deleteResult
            };
            return new MvcJsonResult(result, new NHibernateContractResolver(new string[] { "result" }));
        }


        [HttpPost]
        public MvcJsonResult SetRowFunction()
        {
            var t = this.Request["RolePkId"];
            var rolePkId = RequestHelper.GetInt("RolePkId");
            var functionPkId = RequestHelper.GetInt("FunctionPkId");
            var functionDetailPkId = RequestHelper.GetInt("FunctionDetailPkId");
            var isCheck = RequestHelper.GetInt("IsCheck")==1;
            var addResult = RoleService.GetInstance().SetRowFunction(rolePkId, functionPkId, functionDetailPkId,isCheck);
            var result = new AjaxResponse<RoleEntity>()
            {
                Success = addResult,
                Result = null
            };
            return new MvcJsonResult(result, null);
        }
    }
}




