using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Project.Config
{
    public class SiteConfigEntiy
    {
        public SiteConfigEntiy()
        {
            PicSizeConfig = new PicSizeConfig();
            PageContentConfig = new PageContentConfig();
        }

        /// <summary>
        /// 
        /// </summary>
        public int PageSize
        {
            get { return int.Parse(ConfigurationManager.AppSettings["PageSize"]); }
        }

        /// <summary>
        /// 图片大小配置
        /// </summary>
        public PicSizeConfig PicSizeConfig { get; set; }

        /// <summary>
        /// 内容页配置
        /// </summary>
        public PageContentConfig PageContentConfig { get; set; }


        public string JsParamter
        {
            get { return ConfigurationManager.AppSettings["JsParamter"]; }
        }

        public int IndexPagePkId
        {
            get { return int.Parse(ConfigurationManager.AppSettings["IndexPagePkId"]); }
        }

        /// <summary>
        /// 折扣券 商品编码
        /// </summary>
        public string Prd_Ticket
        {
            get { return "98006"; }
        }

        /// <summary>
        ///  运费 商品编码
        /// </summary>
        public string Prd_Yf
        {
            get { return "98002"; }
        }

        /// <summary>
        /// 折扣金额 商品编码
        /// </summary>
        public string Prd_Discount
        {
            get { return "98009"; }
        }

    }


    public class PicSizeConfig
    {
        /// <summary>
        /// 商品图片配置
        /// </summary>
        public string GoodsPicSize
        {
            get
            {
                return ConfigurationManager.AppSettings["GoodsPicSize"];
            }
        }
    }


}
