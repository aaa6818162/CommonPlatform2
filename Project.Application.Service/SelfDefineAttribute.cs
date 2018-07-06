using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Project.Application.Service
{
    [AttributeUsage(   AttributeTargets.Class | AttributeTargets.Method, AllowMultiple = true,  Inherited = false)]
    public class NeedAuthorizationAttribute : Attribute
    {
    }
}
