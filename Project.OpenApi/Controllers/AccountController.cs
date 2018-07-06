//using System;
//using System.Collections.Generic;
//using System.Linq;
//using System.Net;
//using System.Net.Http;
//using System.Text;
//using System.Web.Http;
//using System.Web.Http.Results;
//using Newtonsoft.Json;
//using Newtonsoft.Json.Linq;
//using Project.OpenApi.App_Start;
//using Project.OpenApi.Models;


//namespace Project.OpenApi.Controllers
//{
//    /// <summary>
//    /// https://blog.csdn.net/smartsmile2012/article/details/52936011
//    /// </summary>
//    public class AccountController : ApiController
//    {

//        #region 用户登录授权  
//        /// <summary>  
//        /// 用户登录授权  
//        /// </summary>  
//        /// <param name="username">用户名</param>  
//        /// <param name="password">密码</param>  
//        /// <returns></returns>  
//        [Route("api/account/login")]
//        [HttpGet]
//        public JsonResult<WebAPIResponse<string>> Login(string username, string password)
//        {

//            var token = new Guid().ToString();
//            //定义  
//            return Json(new WebAPIResponse<string>(token));
//        }
//        #endregion

//        #region 用户退出登录，清空Token  
//        /// <summary>  
//        /// 用户退出登录，清空Token  
//        /// </summary>  
//        /// <param name="userId">用户ID</param>  
//        /// <returns></returns>  
//        [Route("api/account/loginout")]
//        [HttpGet]
//        public JsonResult<WebAPIResponse<string>> LoginOut(int userId)
//        {
//            //清空登录
//            return Json(new WebAPIResponse<string>(""));
//        }
//        #endregion

//        #region 查询Token是否有效  
//        /// <summary>  
//        /// 查询Token是否有效  
//        /// </summary>  
//        /// <param name="token">token</param>  
//        /// <returns></returns>  
//        [Route("api/account/validatetoken")]
//        [HttpGet]
//        public JsonResult<WebAPIResponse<string>> ValidateToken(string token)
//        {
//            //验证token是否有效是否过期

//            return Json(new WebAPIResponse<string>(""));
//        }
//        #endregion

//        #region 获取用户账户余额  
//        /// <summary>  
//        /// 获取用户账户余额  
//        /// </summary>  
//        /// <param name="userId">用户ID</param>  
//        /// <returns></returns>  
//        [Route("api/account/amount")]
//        [HttpGet]
//        [AuthFilterOutside] //添加验证  
//        public JsonResult<WebAPIResponse<string>> GetAmount(int userId)
//        {
//            return Json(new WebAPIResponse<string>(""));
//        }
//        #endregion

//        ///// <summary>  
//        ///// 用户充值接口  
//        ///// </summary>  
//        ///// <param name="userid">用户ID</param>  
//        ///// <param name="amount">充值金额</param>  
//        ///// <returns></returns>  
//        //[Route("api/account/recharge")]
//        //[HttpGet]
//        //public HttpResponseMessage Recharge(string userid, double amount)
//        //{
//        //    //定义  
//        //    ResponseResult obj = new ResponseResult();
//        //    //获取数据库数据  

//        //    //返回信息              
//        //    obj.status = true;
//        //    obj.message = "操作成功，请等待第三方支付平台返回通知核实是否到账";
//        //    JObject jo = new JObject();
//        //    jo.Add("userid", "123456789");
//        //    jo.Add("amount", 125.80);
//        //    obj.info = jo;

//        //    var resultObj = JsonConvert.SerializeObject(obj);
//        //    HttpResponseMessage result = new HttpResponseMessage { Content = new StringContent(resultObj, Encoding.GetEncoding("UTF-8"), "application/json") };
//        //    return result;
//        //}

//        #region 验证票据是否有效  
//        /// <summary>  
//        /// 验证票据是否有效  
//        /// </summary>  
//        /// <param name="encryptToken">token</param>  
//        /// <returns></returns>  
//        private bool ValidateTicket(string encryptToken)
//        {
//            bool flag = false;
//            try
//            {
//                //获取数据库Token  
//                //Dec.Models.TicketAuth model = Dec.BLL.TicketAuth.GetTicketAuthByToken(encryptToken);
//                //if (model.Token == encryptToken) //存在  
//                //{
//                //    //未超时  
//                //    flag = (DateTime.Now <= model.ExpireDate) ? true : false;
//                //}
//            }
//            catch (Exception ex) { }
//            return flag;
//        }
//        #endregion

//        #region 用户登录  
//        ///// <summary>  
//        ///// 用户登录  
//        ///// </summary>  
//        ///// <param name="userName">用户名</param>  
//        ///// <param name="userPwd">密码</param>  
//        ///// <returns></returns>  
//        //private Dec.Models.UserInfo GetLoginModel(string userName, string userPwd)
//        //{
//        //    Dec.Models.UserInfo model = new Dec.Models.UserInfo();
//        //    try
//        //    {
//        //        if (!string.IsNullOrWhiteSpace(userName) && !string.IsNullOrWhiteSpace(userPwd))
//        //        {
//        //            //数据库比对  
//        //            model = Dec.BLL.UserInfo.GetUserInfoByUserNamePwd(userName, UntilHelper.Md5Encode(userPwd, 32));
//        //        }
//        //    }
//        //    catch (Exception ex) { }
//        //    return model;
//        //}
//        #endregion
//    }
//}
