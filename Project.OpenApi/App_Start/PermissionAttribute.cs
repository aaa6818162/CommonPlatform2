using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Controllers;
using System.Web.Http.Filters;

namespace Project.OpenApi.App_Start
{
    public class PermissionAttribute : ActionFilterAttribute
    {
        #region Overrides of ActionFilterAttribute

        /// <summary>
        /// Occurs before the action method is invoked.
        /// </summary>
        /// <param name="actionContext">The action context.</param>
        public override void OnActionExecuting(HttpActionContext actionContext)
        {


            var areaName = "";
            if (actionContext.Request.GetRouteData().Route.DataTokens.ContainsKey("area"))
            {
                areaName = actionContext.Request.GetRouteData().Route.DataTokens["area"].ToString();
            }

            var action = actionContext.ActionDescriptor.ActionName;
            var control = actionContext.ActionDescriptor.ControllerDescriptor.ControllerName;




            base.OnActionExecuting(actionContext);
        }

        #endregion
    }
}
