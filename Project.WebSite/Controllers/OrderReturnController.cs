using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Project.Application.Service.OrderManager;
using Project.Infrastructure.FrameworkCore.DataNhibernate.Helpers;
using Project.Infrastructure.FrameworkCore.WebMvc.Controllers.Results;
using Project.Infrastructure.FrameworkCore.WebMvc.Models;
using Project.Model.OrderManager;
using Project.Service.CustomerManager.Dto;
using Project.Service.OrderManager;

namespace Project.WebSite.Controllers
{
    public class OrderReturnController : AuthorizeController
    {
        #region
        // GET: OrderReturn
        public ActionResult Index()
        {
            return View();
        }

        /// <summary>
        /// 未发货退款
        /// </summary>
        /// <returns></returns>
        public ActionResult ReturnPay(string orderNo)
        {
            return View();
        }

        /// <summary>
        /// 退货
        /// </summary>
        /// <returns></returns>
        public ActionResult ReturnProduct(string orderNo)
        {
            return View();
        }

        /// <summary>
        /// 填写物流单号
        /// </summary>
        /// <returns></returns>
        public ActionResult WriteReturnProductSend(string orderNo)
        {
            return View();
        }
        #endregion


        #region

        /// <summary>
        /// 退款申请
        /// </summary>
        /// <param name="orderNo"></param>
        /// <param name="returnPayNoSendReason"></param>
        /// <param name="returnPayNoSendRemark"></param>
        /// <returns></returns>
        [HttpPost]
        public AbpJsonResult ApplyReturnMoney(string orderNo, string returnPayNoSendReason, string returnPayNoSendRemark)
        {
            var opResult = new OrderServiceImpl().ApplyReturnMoney(orderNo, returnPayNoSendReason, returnPayNoSendRemark,CustomerDto.CustomerId);
            var result = new AjaxResponse<OrderMainEntity>()
            {
                success = opResult.Item1,
                error = new ErrorInfo(opResult.Item2)
            };
            return new AbpJsonResult(result, new NHibernateContractResolver(new string[] { "result" }));
        }


        /// <summary>
        /// 已发货退货申请
        /// </summary>
        /// <param name="orderNo"></param>
        /// <param name="returnPrdAfterSendReason"></param>
        /// <param name="returnPrdAfterSendRemark"></param>
        /// <returns></returns>
        [HttpPost]
        public AbpJsonResult ApplyReturnProduct(string orderNo, string returnPrdAfterSendReason, string returnPrdAfterSendRemark)
        {

            var opResult = new OrderServiceImpl().ApplyReturnProduct(orderNo, returnPrdAfterSendReason, returnPrdAfterSendRemark, CustomerDto.CustomerId);
            var result = new AjaxResponse<OrderMainEntity>()
            {
                success = opResult.Item1,
                error = new ErrorInfo(opResult.Item2)
            };
            return new AbpJsonResult(result, new NHibernateContractResolver(new string[] { "result" }));
        }


        /// <summary>
        /// 顾客发送快递单
        /// </summary>
        /// <param name="orderNo"></param>
        /// <param name="returnPrdSendNo"></param>
        /// <param name="returnPrdSendRemak"></param>
        /// <returns></returns>
        [HttpPost]
        public AbpJsonResult OrderReturnInfoWrite(string orderNo, string returnPrdSendNo, string returnPrdSendRemak)
        {

            var opResult = new OrderServiceImpl().OrderReturnInfoWrite(orderNo, returnPrdSendNo, returnPrdSendRemak, CustomerDto.CustomerId);
            var result = new AjaxResponse<OrderMainEntity>()
            {
                success = opResult.Item1,
                error = new ErrorInfo(opResult.Item2)
            };
            return new AbpJsonResult(result, new NHibernateContractResolver(new string[] { "result" }));
        }

        #endregion



    }
}