using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using AutoMapper;
using Project.Application.Service.AccountManager;
using Project.Config;
using Project.Infrastructure.FrameworkCore.DataNhibernate.Helpers;
using Project.Infrastructure.FrameworkCore.ToolKit;
using Project.Infrastructure.FrameworkCore.WebMvc.Controllers.Results;
using Project.Infrastructure.FrameworkCore.WebMvc.Models;
using Project.Model.CustomerManager;
using Project.Service.CustomerManager;
using Project.WebSite.Extend;
using Project.WebSite.Models.UserCenter;

namespace Project.WebSite.Controllers
{
    public class UserCenterController : AuthorizeController
    {
        #region  视图页
        // GET: UserCenter
        public ActionResult Index()
        {
            return View();
        }

 public ActionResult ChangePassword()
        {
            return View();
        }

        public ActionResult CollectionList()
        {
            var pageIndex = RequestHelper.GetInt("page") == 0 ? 1 : RequestHelper.GetInt("page");
            var maxResults = SiteConfig.GetConfig().PageSize;
            var skipResults = (pageIndex - 1) * maxResults;

            var result = new AccountServiceImpl().GetCollectionList(skipResults, maxResults, CustomerDto.CustomerId);
            var viewModel = new CollectionListView();
            viewModel.CustomerCollectionList = result.Item1.ToList();
            viewModel.PageInfo = new MyPagedList(pageIndex, maxResults, result.Item2);
            return View(viewModel);
        }


        public ActionResult TicketList()
        {
            var pageIndex = RequestHelper.GetInt("page") == 0 ? 1 : RequestHelper.GetInt("page");
            var maxResults = SiteConfig.GetConfig().PageSize;
            var skipResults = (pageIndex - 1) * maxResults;

            var result = new AccountServiceImpl().GetTicketList(CustomerDto.CustomerId, skipResults, maxResults);
            var viewModel = new TicketListView();
            viewModel.TicketList = result.Item1.ToList();
            viewModel.PageInfo = new MyPagedList(pageIndex, maxResults, result.Item2);
            return View(viewModel);
        }

        /// <summary>
        /// 
        /// </summary>
        /// <returns></returns>
        public ActionResult AddressList()
        {
            var addressList = new AccountServiceImpl().GetCustomerAddressList(CustomerDto.CustomerId).OrderByDescending(p=>p.PkId).ToList();
            return View(addressList);
        }



        public ActionResult UserInfoDetail()
        {

            var result = new AccountServiceImpl().GetCustomerInfo(CustomerDto.CustomerId);
            return View(result);
        }


        public ActionResult MessageList()
        {
            var pageIndex = RequestHelper.GetInt("page") == 0 ? 1 : RequestHelper.GetInt("page");
            var maxResults = 10;

            var result = new AccountServiceImpl().GetNoticeInfoList(CustomerDto.CustomerId, (pageIndex - 1) * maxResults, maxResults);
            var viewModel=new MessageListView();
            viewModel.NoticeInfoList = result.Item1.ToList();
            viewModel.PageInfo = new MyPagedList(pageIndex, maxResults, result.Item2);
            return View(viewModel);
        }
        #endregion


        #region 收货地址
        /// <summary>
        /// 
        /// </summary>
        /// <param name="postData"></param>
        /// <returns></returns>
        [HttpPost]
        public MvcJsonResult AddAddress(AjaxRequest<CustomerAddressEntity> postData)
        {
            postData.RequestEntity.CustomerId = CustomerDto.CustomerId;
            var addResult = new AccountServiceImpl().AddAddress(postData.RequestEntity);
           
            var result = new AjaxResponse<CustomerAddressEntity>()
            {
                Success = addResult.Item1,
                Result = postData.RequestEntity
            };
            return new MvcJsonResult(result, new NHibernateContractResolver());
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="postData"></param>
        /// <returns></returns>
        [HttpPost]
        public MvcJsonResult UpdateAddress(AjaxRequest<CustomerAddressEntity> postData)
        {
            postData.RequestEntity.CustomerId = CustomerDto.CustomerId;
            var updateResult = new AccountServiceImpl().UpdateAddress(postData.RequestEntity);
            var result = new AjaxResponse<CustomerAddressEntity>()
            {
                Success = updateResult.Item1,
                Result = postData.RequestEntity
            };
            return new MvcJsonResult(result, new NHibernateContractResolver(new string[] { "result" }));
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="pkid"></param>
        /// <returns></returns>
        [HttpPost]
        public MvcJsonResult DelAddress(int pkid)
        {
            var deleteResult = new AccountServiceImpl().DelAddress(pkid, CustomerDto.CustomerId);
            var result = new AjaxResponse<CustomerAddressEntity>()
            {
                Success = deleteResult.Item1
            };
            return new MvcJsonResult(result, new NHibernateContractResolver(new string[] { "result" }));
        }


        /// <summary>
        /// 
        /// </summary>
        /// <param name="pkid"></param>
        /// <returns></returns>
        [HttpPost]
        public MvcJsonResult SetDefaultAddress(int pkid)
        {
            var deleteResult = new AccountServiceImpl().SetDefaultAddress(pkid, CustomerDto.CustomerId);
            var result = new AjaxResponse<CustomerAddressEntity>()
            {
                Success = deleteResult.Item1
            };
            return new MvcJsonResult(result, new NHibernateContractResolver(new string[] { "result" }));
        }
        #endregion

        #region 会员基本信息

        /// <summary>
        /// 保存会员基本信息
        /// </summary>
        /// <param name="postData"></param>
        /// <returns></returns>
        [HttpPost]
        public MvcJsonResult SaveUserInfoDetail(AjaxRequest<CustomerEntity> postData)
        {
           
            var deleteResult = new AccountServiceImpl().SaveCustomerInfo(postData.RequestEntity, CustomerDto.CustomerId);
            var result = new AjaxResponse<CustomerAddressEntity>()
            {
                Success = deleteResult
            };
            return new MvcJsonResult(result, new NHibernateContractResolver(new string[] { "result" }));
        }

        #endregion

        #region 收藏夹
       /// <summary>
       /// 新增收藏
       /// </summary>
       /// <param name="productId"></param>
       /// <returns></returns>
        [HttpPost]
        public MvcJsonResult AddCollection(int productId)
        {
            var opResult = new AccountServiceImpl().AddCollection(productId, CustomerDto.CustomerId);
            var result = new AjaxResponse<CustomerAddressEntity>()
            {
                Success = opResult.Item1
            };
            return new MvcJsonResult(result, new NHibernateContractResolver(new string[] { "result" }));
        }


        /// <summary>
        /// 新增收藏
        /// </summary>
        /// <param name="pkId"></param>
        /// <returns></returns>
        [HttpPost]
        public MvcJsonResult CancelCollection(int pkId)
        {
            var opResult = new AccountServiceImpl().CancelCollection(pkId, CustomerDto.CustomerId);
            var result = new AjaxResponse<CustomerAddressEntity>()
            {
                Success = opResult.Item1
            };
            return new MvcJsonResult(result, new NHibernateContractResolver(new string[] { "result" }));
        }

        #endregion

        #region
        [HttpPost]
        public MvcJsonResult ChangePassword(string oldPassword, string newPassword)
        {

            oldPassword= Encrypt.MD5Encrypt(oldPassword);
            newPassword= Encrypt.MD5Encrypt(newPassword);

            var opResult = new AccountServiceImpl().ChangePassword( CustomerDto.CustomerId, oldPassword,  newPassword);
            var result = new AjaxResponse<CustomerAddressEntity>()
            {
                Success = opResult.Item1,
                Error = new ErrorInfo() { Message = opResult.Item2 }

            };
            return new MvcJsonResult(result, new NHibernateContractResolver(new string[] { "result" }));
        }

        #endregion

    }
}