using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web;
using System.Web.Http;
using System.Web.Http.Results;
using Newtonsoft.Json;
using Project.Application.Service;
using Project.Application.Service.AccountManager;
using Project.Application.Service.Common;
using Project.Application.Service.OrderManager;
using Project.Infrastructure.FrameworkCore.DataNhibernate;
using Project.Infrastructure.FrameworkCore.Logging;
using Project.Infrastructure.FrameworkCore.ToolKit;
using Project.Infrastructure.FrameworkCore.ToolKit.LinqExpansion;
using Project.OpenApi.App_Start;

namespace Project.OpenApi.Controllers
{
    /// <summary>
    /// 统一一格中心访问
    /// </summary>
    public class CallingController : ApiController
    {
        /// <summary>
        /// 基础服务
        /// </summary>
        private readonly Dictionary<string, IServiceImpl> _serviceses = new Dictionary<string, IServiceImpl>();

        public CallingController()
        {
            this._serviceses.Add("Order", new OrderServiceImpl());
            this._serviceses.Add("Account", new AccountServiceImpl());
        }

        // [AuthFilterOutside]
        [HttpPost]
        public JsonResult<ProcessResult> Index(ProcessRequest request)
        {

            var service = request.Service;
            var method = request.Method;
            var dto = request.Paramter1;


            //计算调用时间
            var sw = new System.Diagnostics.Stopwatch();

            var result = new ProcessResult { Code = 500, IsSuccess = false, Message = "请求处理失败" };

            if (!string.IsNullOrWhiteSpace(service) && !string.IsNullOrWhiteSpace(method))
            {
                if (this._serviceses.ContainsKey(service))
                {
                    sw.Start();
                    var callingServices = this._serviceses[service];
                    result = this.ServicesProcess(callingServices, method, dto, request);
                    sw.Stop();
                }
                else
                {
                    result.Code = 404;
                    result.IsSuccess = false;
                    result.Message = "未实现该服务";
                }
            }
            else
            {
                result.Code = 404;
                result.IsSuccess = false;
                result.Message = "参数错误";
            }

            //调用时间写入日志，用作分析程序性能
            var timeSpan = sw.Elapsed;
            var s = timeSpan.TotalMilliseconds;

            //写入运行时间
            LoggerHelper.Info(JsonConvert.SerializeObject(new
            {
                Module = "Calling",
                Service = service,
                Method = method,
                Dto = dto,
                RunTime = s,
                Ip = IPHelper.GetIPAddress()
            }));

            return Json(result);
        }



        #region 调用服务模块
        /// <summary>
        /// 调用服务模块
        /// </summary>
        /// <param name="callingServices"></param>
        /// <param name="method"></param>
        /// <param name="dto"></param>
        /// <returns></returns>
        protected ProcessResult ServicesProcess(IServiceImpl callingServices, string method, string dto, ProcessRequest request)
        {
            var result = new ProcessResult();

            try
            {
                //不能出现同名方法
                var m = callingServices.GetType().GetMethods().FirstOrDefault(o => o.Name.ToLowerInvariant() == method.ToLowerInvariant());

                //var attrs = m.GetCustomAttributes(true);
                //foreach (System.Attribute attr in attrs)
                //{
                //    if (attr is NeedAuthorizationAttribute)
                //    {
                //        IEnumerable<string> list = new List<string>();
                //        Request.Content.Headers.TryGetValues("Token", out list);
                //        if (list.Any())
                //        {
                //            var token = list.FirstOrDefault();

                //            //验证token
                //        }
                //    }
                //}

                if (m != null)
                {
                    var parameters = m.GetParameters();
                    var args = new object[parameters.Length];

                    for (var i = 0; i < parameters.Length; i++)
                    {
                        var propertyInfo = request.GetType().GetProperty("Paramter" + (i + 1));
                        var propertyValue = (string)propertyInfo.GetValue(request, null);

                        var ptype = parameters[i].ParameterType;
                        if (ptype.IsClass && ptype != typeof(string) && ptype != typeof(Nullable<>))
                        {
                            args[i] = JsonConvert.DeserializeObject(propertyValue, ptype);
                        }
                        else if (ptype == typeof(string))
                        {
                            args[i] = propertyValue;
                        }
                        else if (ptype == typeof(int))
                        {
                            args[i] = Convert.ChangeType(propertyValue, ptype);
                        }

                    }

                    var obj = m.Invoke(callingServices, args);
                    //GC.Collect();

                    if (obj is ProcessResult)
                    {
                        return obj as ProcessResult;
                    }
                    else if (obj is Tuple<bool, string>)
                    {
                        var resultObj = obj as Tuple<bool, string>;
                        result.IsSuccess = resultObj.Item1;
                        result.Message = resultObj.Item2;
                        result.Result = resultObj.Item2;
                    }
                    else
                    {
                        result.IsSuccess = true;
                        result.Result = obj;
                    }
                }
                else
                {
                    result.IsSuccess = false;
                    result.Message = "该服务模块未实现。";
                }
            }
            catch (Exception ex)
            {
                result.IsSuccess = false;
                result.Message = ex.Message;
            }

            return result;
        }
        #endregion

        ///// <summary>
        ///// 回收所有资源
        ///// </summary>
        //protected void Clear()
        //{
        //    //SessionFactoryManager.ClearSessionAndStorage();
        //    GC.Collect();
        //    GC.SuppressFinalize(true);
        //}




    }
}
