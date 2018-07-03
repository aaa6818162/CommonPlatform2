using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Project.Infrastructure.FrameworkCore.ToolKit;
using Project.Model.ContentManager;
using Project.Model.ProductManager.Request;

namespace Project.WebSite
{




    public class ProductListHelper
    {

        public static string GetUrl(int attrIndex, int value)
        {
            var returnEntity = new ProductSearchCondition();
            switch (attrIndex)
            {
                case 1:
                    returnEntity.AttributeValue1 = value;
                    break;
                case 2:
                    returnEntity.AttributeValue2 = value;
                    break;
                case 3:
                    returnEntity.AttributeValue3 = value;
                    break;
                case 4:
                    returnEntity.AttributeValue4 = value;
                    break;
                case 5:
                    returnEntity.AttributeValue5 = value;
                    break;
                case 6:
                    returnEntity.AttributeValue6 = value;
                    break;
            }
            return GetUrl(returnEntity);
        }


        /// <summary>
        /// 
        /// </summary>
        /// <returns></returns>
        public static string GetUrl(ProductSearchCondition where)
        {
            var SystemCategoryId = where.SystemCategoryId > 0 ? where.SystemCategoryId : RequestHelper.GetInt("SystemCategoryId");
            var page = RequestHelper.GetInt("page");
            var AttributeValue1 = GetValue(where.AttributeValue1, 1);
            var AttributeValue2 = GetValue(where.AttributeValue2, 2);
            var AttributeValue3 = GetValue(where.AttributeValue3, 3);
            var AttributeValue4 = GetValue(where.AttributeValue4, 4);
            var AttributeValue5 = GetValue(where.AttributeValue5, 5);
            var AttributeValue6 = GetValue(where.AttributeValue6, 6);
            var ProductCategoryId = where.ProductCategoryId > 0 ? where.ProductCategoryId : RequestHelper.GetInt("ProductCategoryId");
            var ProductCode = RequestHelper.GetString("ProductCode");


            var url = "/Product/List?";
            if (SystemCategoryId > 0)
            {
                url += "SystemCategoryId=" + SystemCategoryId;
            }

            if (ProductCategoryId > 0)
            {
                url += "&ProductCategoryId=" + ProductCategoryId;
            }

            if (!string.IsNullOrWhiteSpace(ProductCode))
            {
                url += "&ProductCode=" + ProductCode;
            }

            //if (page > 0)
            //{
            //    url += "&page=" + page;
            //}

            if (AttributeValue1 > 0)
            {
                url += "&Attr1=" + AttributeValue1;
            }

            if (AttributeValue2 > 0)
            {
                url += "&Attr2=" + AttributeValue2;
            }

            if (AttributeValue3 > 0)
            {
                url += "&Attr3=" + AttributeValue3;
            }

            if (AttributeValue4 > 0)
            {
                url += "&Attr4=" + AttributeValue4;
            }

            if (AttributeValue5 > 0)
            {
                url += "&Attr5=" + AttributeValue5;
            }
            if (AttributeValue6 > 0)
            {
                url += "&Attr6=" + AttributeValue6;
            }
            return url;
        }

        private static int GetValue(int setValue, int index)
        {
            if (setValue == 0)
            {
                return RequestHelper.GetInt("Attr" + index);
            }
            else if (setValue > 0)
            {
                return setValue;
            }
            return setValue;
        }


    }
}