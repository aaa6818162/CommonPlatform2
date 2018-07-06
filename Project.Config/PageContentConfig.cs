using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Project.Config
{
    public class PageContentConfig
    {

        /// <summary>
        /// IP+产品导航
        /// </summary>
        public string Guide
        {
            get { return ConfigurationManager.AppSettings["Guide"]; }
        }





    }
}
