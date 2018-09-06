

using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Mvc;
using AutoMapper;
using Project.Config.OrderEnum;
using Project.Infrastructure.FrameworkCore.DataNhibernate.Helpers;
using Project.Infrastructure.FrameworkCore.Logging;
using Project.Infrastructure.FrameworkCore.ToolKit;
using Project.Infrastructure.FrameworkCore.ToolKit.JsonHandler;
using Project.Infrastructure.FrameworkCore.ToolKit.LinqExpansion;
using Project.Infrastructure.FrameworkCore.WebMvc.Controllers.Results;
using Project.Infrastructure.FrameworkCore.WebMvc.Models;
using Project.Model.OrderManager;
using Project.Service.OrderManager;
using Project.Service.ProductManager;
using Project.WebApplication.Controllers;

namespace Project.WebApplication.Areas.OrderManager.Controllers
{
    public class OrderMainController : BaseController
    {
        #region 视图展示

        #region 正向相关操作
        public ActionResult Hd(int pkId = 0)
        {
            // var t=  OrderMainService.GetInstance().GetModelByPk(5);


            //新增测试
            var orderMainEntity = new OrderMainEntity();
            orderMainEntity.CustomerId = 1;
            orderMainEntity.Linkman = "22222222222";
            orderMainEntity.Totalamount = 5000;
            orderMainEntity.LinkmanAreaId = "110101";
            orderMainEntity.State = (int)OrderStateEnum.待付款;
           orderMainEntity.OrderMainDetailEntityList.Add(new OrderMainDetailEntity()
            {
                ProductId = 11,
                ProductName = "1111",
                TotalAmount = 5000,
                ProductWeight = 100
                
            });
            OrderMainService.GetInstance().AddOrder(orderMainEntity);


            LoggerHelper.Info("登陆前：");
            LoggerHelper.Info(LogType.OrderLogger, "生成订单");

            if (pkId > 0)
            {
                var entity = OrderMainService.GetInstance().GetModelByPk(pkId);
                ViewBag.BindEntity = JsonHelper.JsonSerializer(entity);
            }
            return View();
        }


        public ActionResult Pay(int pkId = 0)
        {
            var entity = OrderMainService.GetInstance().GetModelByPk(pkId);
            ViewBag.BindEntity = JsonHelper.JsonSerializer(entity);

            return View();
        }

        public ActionResult Detail(int pkId = 0)
        {
            var entity = OrderMainService.GetInstance().GetModelByPk(pkId);
            ViewBag.BindEntity = JsonHelper.JsonSerializer(entity);

            return View();
        }

        public ActionResult DetailAll(int pkId = 0)
        {
            var entity = OrderMainService.GetInstance().GetModelByPk(pkId);
            ViewBag.BindEntity = JsonHelper.JsonSerializer(entity);

            return View();
        }


        public ActionResult Send(int pkId = 0)
        {
            var entity = OrderMainService.GetInstance().GetModelByPk(pkId);
            ViewBag.BindEntity = JsonHelper.JsonSerializer(entity);

            return View();
        }
        public ActionResult Cancel(int pkId = 0)
        {
            var entity = OrderMainService.GetInstance().GetModelByPk(pkId);
            ViewBag.BindEntity = JsonHelper.JsonSerializer(entity);

            return View();
        }

        public ActionResult Confirm(int pkId = 0)
        {
            var entity = OrderMainService.GetInstance().GetModelByPk(pkId);
            ViewBag.BindEntity = JsonHelper.JsonSerializer(entity);

            return View();
        }
        #endregion

        #region 未发货退单相关操作
        /// <summary>
        /// 
        /// </summary>
        /// <param name="pkId"></param>
        /// <returns></returns>
        public ActionResult ReturnPayNoSend(int pkId = 0)
        {
            var entity = OrderMainService.GetInstance().GetModelByPk(pkId);
            ViewBag.BindEntity = JsonHelper.JsonSerializer(entity);

            return View();
        } 
        
        /// <summary>
        /// 
        /// </summary>
        /// <param name="pkId"></param>
        /// <returns></returns>
        public ActionResult ReturnPayNoSendConfirm(int pkId = 0)
        {
            var entity = OrderMainService.GetInstance().GetModelByPk(pkId);
            ViewBag.BindEntity = JsonHelper.JsonSerializer(entity);

            return View();
        }

        #endregion

        #region 已发货退单相关操作

        /// <summary>
        /// 
        /// </summary>
        /// <param name="pkId"></param>
        /// <returns></returns>
        public ActionResult ReturnPrdAfterSend(int pkId = 0)
        {
            var entity = OrderMainService.GetInstance().GetModelByPk(pkId);
            ViewBag.BindEntity = JsonHelper.JsonSerializer(entity);

            return View();
        } 
        
        /// <summary>
        /// 
        /// </summary>
        /// <param name="pkId"></param>
        /// <returns></returns>
        public ActionResult ReturnPrdAfterSendAudit(int pkId = 0)
        {
            var entity = OrderMainService.GetInstance().GetModelByPk(pkId);
            ViewBag.BindEntity = JsonHelper.JsonSerializer(entity);

            return View();
        }

 /// <summary>
        /// 
        /// </summary>
        /// <param name="pkId"></param>
        /// <returns></returns>
        public ActionResult ReturnPrdSend(int pkId = 0)
        {
            var entity = OrderMainService.GetInstance().GetModelByPk(pkId);
            ViewBag.BindEntity = JsonHelper.JsonSerializer(entity);

            return View();
        } 
        
        /// <summary>
        /// 
        /// </summary>
        /// <param name="pkId"></param>
        /// <returns></returns>
        public ActionResult ReturnPrdSendConfirm(int pkId = 0)
        {
            var entity = OrderMainService.GetInstance().GetModelByPk(pkId);
            ViewBag.BindEntity = JsonHelper.JsonSerializer(entity);

            return View();
        }
        
        /// <summary>
        /// 
        /// </summary>
        /// <param name="pkId"></param>
        /// <returns></returns>
        public ActionResult ReturnPayAfterSend(int pkId = 0)
        {
            var entity = OrderMainService.GetInstance().GetModelByPk(pkId);
            ViewBag.BindEntity = JsonHelper.JsonSerializer(entity);

            return View();
        }
        #endregion



        public ActionResult List()
        {
            return View();
        }

        #endregion


        #region 操作

        /// <summary>
        /// 
        /// </summary>
        /// <returns></returns>
        public MvcJsonResult GetList()
        {
            var pIndex = this.Request["page"].ConvertTo<int>();
            var pSize = this.Request["rows"].ConvertTo<int>();
            var where = new OrderMainEntity();
            where.OrderNo = RequestHelper.GetString("OrderNo");
            where.State = RequestHelper.GetInt("State");
            where.ReturnState = RequestHelper.GetInt("ReturnState");
            where.CustomerName = RequestHelper.GetFormString("CustomerName");
            where.LinkmanMobilephone = RequestHelper.GetFormString("LinkmanMobilephone");
            where.SendNo = RequestHelper.GetFormString("SendNo");
            where.ReturnPrdSendNo = RequestHelper.GetFormString("ReturnPrdSendNo");
            where.Whe_CreateDateEnd = RequestHelper.GetDateTime("Whe_CreateDateEnd");
            where.Whe_CreateDateStart = RequestHelper.GetDateTime("Whe_CreateDateStart");

            var searchList = OrderMainService.GetInstance().Search(where, (pIndex - 1) * pSize, pSize);
            var dataGridEntity = new DataGridResponse()
            {
                total = searchList.Item2,
                rows = searchList.Item1
            };
            return new MvcJsonResult(dataGridEntity, new NHibernateContractResolver());
        }


        public MvcJsonResult GetOrderMainDetailList()
        {
            var orderMain = OrderMainService.GetInstance().GetModelByPk(RequestHelper.GetInt("PkId"));

            var dataGridEntity = new DataGridResponse()
            {
                total = orderMain.OrderMainDetailEntityList.Count,
                rows = orderMain.OrderMainDetailEntityList
            };
            return new MvcJsonResult(dataGridEntity, new NHibernateContractResolver());
        }


        #region 正单相关操作
        //[HttpPost]
        //public AbpJsonResult Add(AjaxRequest<OrderMainEntity, int> postData)
        //{
        //    var addResult = OrderMainService.GetInstance().AddOrder(postData.RequestEntity);
        //    var result = new AjaxResponse<OrderMainEntity>()
        //    {
        //        success = true,
        //        result = postData.RequestEntity
        //    };
        //    return new AbpJsonResult(result, new NHibernateContractResolver());
        //}


        //[HttpPost]
        //public AbpJsonResult Edit(AjaxRequest<OrderMainEntity, int> postData)
        //{
        //    var newInfo = postData.RequestEntity;
        //    var orgInfo = OrderMainService.GetInstance().GetModelByPk(postData.RequestEntity.PkId);
        //    var mergInfo = Mapper.Map(newInfo, orgInfo);
        //    var updateResult = OrderMainService.GetInstance().Update(mergInfo);

        //    var result = new AjaxResponse<OrderMainEntity>()
        //    {
        //        success = updateResult,
        //        result = postData.RequestEntity
        //    };
        //    return new AbpJsonResult(result, new NHibernateContractResolver(new string[] { "result" }));
        //}

        [HttpPost]
        public MvcJsonResult Pay(AjaxRequest<OrderMainEntity, int> postData)
        {

            var updateResult = OrderMainService.GetInstance().Pay(postData.RequestEntity);

            var result = new AjaxResponse<OrderMainEntity>()
            {
                Success = updateResult
                //result = postData.RequestEntity
            };
            return new MvcJsonResult(result, new NHibernateContractResolver(new string[] { "result" }));
        }

        /// <summary>
        /// 发货
        /// </summary>
        /// <param name="postData"></param>
        /// <returns></returns>
        [HttpPost]
        public MvcJsonResult Send(AjaxRequest<OrderMainEntity, int> postData)
        {

            var updateResult = OrderMainService.GetInstance().Send(postData.RequestEntity);

            var result = new AjaxResponse<OrderMainEntity>()
            {
                Success = updateResult,
                //result = postData.RequestEntity
            };
            return new MvcJsonResult(result, new NHibernateContractResolver(new string[] { "result" }));
        }


        [HttpPost]
        public MvcJsonResult Cancel(AjaxRequest<OrderMainEntity, int> postData)
        {
            var updateResult = OrderMainService.GetInstance().Cancel(postData.RequestEntity);
            var result = new AjaxResponse<OrderMainEntity>()
            {
                Success = updateResult,
                //result = postData.RequestEntity
            };
            return new MvcJsonResult(result, new NHibernateContractResolver(new string[] { "result" }));
        }


        [HttpPost]
        public MvcJsonResult Confirm(AjaxRequest<OrderMainEntity, int> postData)
        {
            var updateResult = OrderMainService.GetInstance().Confirm(postData.RequestEntity);
            var result = new AjaxResponse<OrderMainEntity>()
            {
                Success = updateResult,
                //result = postData.RequestEntity
            };
            return new MvcJsonResult(result, new NHibernateContractResolver(new string[] { "result" }));
        }

        #endregion

        #region 未发货退单相关操作
        /// <summary>
        /// 未发货退货申请
        /// </summary>
        /// <param name="postData"></param>
        /// <returns></returns>
        [HttpPost]
        public MvcJsonResult ReturnPayNoSend(AjaxRequest<OrderMainEntity, int> postData)
        {

            var updateResult = OrderMainService.GetInstance().ReturnPayNoSend(postData.RequestEntity);

            var result = new AjaxResponse<OrderMainEntity>()
            {
                Success = updateResult,
                //result = postData.RequestEntity
            };
            return new MvcJsonResult(result, new NHibernateContractResolver(new string[] { "result" }));
        }

        [HttpPost]
        public MvcJsonResult ReturnPayNoSendConfirm(AjaxRequest<OrderMainEntity, int> postData)
        {

            var updateResult = OrderMainService.GetInstance().ReturnPayNoSendConfirm(postData.RequestEntity);

            var result = new AjaxResponse<OrderMainEntity>()
            {
                Success = updateResult,
                //result = postData.RequestEntity
            };
            return new MvcJsonResult(result, new NHibernateContractResolver(new string[] { "result" }));
        }
        #endregion

        #region 已发货退单相关操作
 [HttpPost]
        public MvcJsonResult ReturnPrdAfterSend(AjaxRequest<OrderMainEntity, int> postData)
        {

            var updateResult = OrderMainService.GetInstance().ReturnPrdAfterSend(postData.RequestEntity);

            var result = new AjaxResponse<OrderMainEntity>()
            {
                Success = updateResult,
                //result = postData.RequestEntity
            };
            return new MvcJsonResult(result, new NHibernateContractResolver(new string[] { "result" }));
        }

[HttpPost]
        public MvcJsonResult ReturnPrdAfterSendAudit(AjaxRequest<OrderMainEntity, int> postData)
        {

            var updateResult = OrderMainService.GetInstance().ReturnPrdAfterSendAudit(postData.RequestEntity);

            var result = new AjaxResponse<OrderMainEntity>()
            {
                Success = updateResult,
                //result = postData.RequestEntity
            };
            return new MvcJsonResult(result, new NHibernateContractResolver(new string[] { "result" }));
        }

        [HttpPost]
        public MvcJsonResult ReturnPrdSend(AjaxRequest<OrderMainEntity, int> postData)
        {

            var updateResult = OrderMainService.GetInstance().ReturnPrdSend(postData.RequestEntity);

            var result = new AjaxResponse<OrderMainEntity>()
            {
                Success = updateResult,
                //result = postData.RequestEntity
            };
            return new MvcJsonResult(result, new NHibernateContractResolver(new string[] { "result" }));
        }

        /// <summary>
        /// 商品确认收货
        /// </summary>
        /// <param name="postData"></param>
        /// <returns></returns>
        [HttpPost]
        public MvcJsonResult ReturnPrdSendConfirm(AjaxRequest<OrderMainEntity, int> postData)
        {

            var updateResult = OrderMainService.GetInstance().ReturnPrdSendConfirm(postData.RequestEntity);

            var result = new AjaxResponse<OrderMainEntity>()
            {
                Success = updateResult,
                //result = postData.RequestEntity
            };
            return new MvcJsonResult(result, new NHibernateContractResolver(new string[] { "result" }));
        }


 /// <summary>
        /// 退款
        /// </summary>
        /// <param name="postData"></param>
        /// <returns></returns>
        [HttpPost]
        public MvcJsonResult ReturnPayAfterSend(AjaxRequest<OrderMainEntity, int> postData)
        {

            var updateResult = OrderMainService.GetInstance().ReturnPayAfterSend(postData.RequestEntity);

            var result = new AjaxResponse<OrderMainEntity>()
            {
                Success = updateResult,
                //result = postData.RequestEntity
            };
            return new MvcJsonResult(result, new NHibernateContractResolver(new string[] { "result" }));
        }
        #endregion




       



        #endregion

    }
}




