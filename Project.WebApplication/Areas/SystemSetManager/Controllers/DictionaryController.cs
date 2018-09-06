using System.Web.Mvc;
using Project.Infrastructure.FrameworkCore.DataNhibernate.Helpers;
using Project.Infrastructure.FrameworkCore.ToolKit;
using Project.Infrastructure.FrameworkCore.ToolKit.JsonHandler;
using Project.Infrastructure.FrameworkCore.ToolKit.LinqExpansion;
using Project.Infrastructure.FrameworkCore.WebMvc.Controllers.Results;
using Project.Infrastructure.FrameworkCore.WebMvc.Models;
using Project.Model.HRManager;
using Project.Service.HRManager;
using Project.WebApplication.Controllers;

namespace Project.WebApplication.Areas.SystemSetManager.Controllers
{
    public class DictionaryController : BaseController
    {

        public ActionResult Hd(int pkId = 0)
        {
            if (pkId > 0)
            {
                var entity = DictionaryService.GetInstance().GetModelByPk(pkId);
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
            var where = new DictionaryEntity();
            //where.PkId = RequestHelper.GetFormString("PkId");
            //where.KeyCode = RequestHelper.GetFormString("KeyCode");
            //where.ParentKeyCode = RequestHelper.GetFormString("ParentKeyCode");
            //where.KeyName = RequestHelper.GetFormString("KeyName");
            //where.KeyValue = RequestHelper.GetFormString("KeyValue");
            //var searchList = DictionaryService.GetInstance().Search(where, (pIndex - 1) * pSize, pSize);

            //var dataGridEntity = new DataGridResponse()
            //{
            //    total = searchList.Item2,
            //    rows = searchList.Item1
            //};
            //return new AbpJsonResult(dataGridEntity, new NHibernateContractResolver());
            var searchList = DictionaryService.GetInstance().GetList(where);
            var dataGridEntity = new DataGridTreeResponse<DictionaryEntity>(searchList.Count, searchList);
            return new MvcJsonResult(dataGridEntity, new NHibernateContractResolver());
        }

        public MvcJsonResult GetList_Combotree()
        {
            var where = new DictionaryEntity();
            where.KeyCode = RequestHelper.GetFormString("KeyCode");
            where.KeyName = RequestHelper.GetFormString("KeyName");
            var searchList = DictionaryService.GetInstance().GetTreeList(where, true);

            return new MvcJsonResult(searchList, new NHibernateContractResolver(new[] { "children" }));
        }

        public MvcJsonResult GetList_Combobox()
        {
            var where = new DictionaryEntity();
            //where.PkId = RequestHelper.GetFormString("PkId");
            //where.KeyCode = RequestHelper.GetFormString("KeyCode");
            where.ParentKeyCode = RequestHelper.GetQueryString("ParentKeyCode");
            //where.KeyName = RequestHelper.GetFormString("KeyName");
            //where.KeyValue = RequestHelper.GetFormString("KeyValue");
            var searchList = DictionaryService.GetInstance().GetList(where);
            //if (!string.IsNullOrEmpty(RequestHelper.GetQueryString("AllFlag")))
            //{
            //    searchList.Insert(0, new DictionaryEntity() { KeyName = "全部", KeyValue = "" });
            //}
            return new MvcJsonResult(searchList, new NHibernateContractResolver());
        }


        [HttpPost]
        public MvcJsonResult Add(AjaxRequest<DictionaryEntity> postData)
        {
            var addResult = DictionaryService.GetInstance().Add(postData.RequestEntity);
            var result = new AjaxResponse<DictionaryEntity>()
            {
                Success = addResult.Item1,
                Result = postData.RequestEntity,
                Error = addResult.Item1 ? null : new ErrorInfo(addResult.Item2)
            };
            return new MvcJsonResult(result, new NHibernateContractResolver());
        }


        [HttpPost]
        public MvcJsonResult Edit(AjaxRequest<DictionaryEntity> postData)
        {
            var updateResult = DictionaryService.GetInstance().Update(postData.RequestEntity);
            var result = new AjaxResponse<DictionaryEntity>()
            {
                Success = updateResult,
                Result = postData.RequestEntity
            };
            return new MvcJsonResult(result, new NHibernateContractResolver(new string[] { "result" }));
        }

        [HttpPost]
        public MvcJsonResult Delete(int pkid)
        {
            var deleteResult = DictionaryService.GetInstance().DeleteByPkId(pkid);
            var result = new AjaxResponse<DictionaryEntity>()
            {
                Success = deleteResult
            };
            return new MvcJsonResult(result, new NHibernateContractResolver(new string[] { "result" }));
        }
    }
}




