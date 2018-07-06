
/***************************************************************************
*       功能：     PRMProduct持久层
*       作者：     李伟伟
*       日期：     2017/6/30
*       描述：     产品表
* *************************************************************************/

using System;
using System.Collections.Generic;
using NHibernate;
using NHibernate.Transform;
using Project.Infrastructure.FrameworkCore.DataNhibernate;
using Project.Infrastructure.FrameworkCore.Domain.Repositories;
using Project.Infrastructure.FrameworkCore.ToolKit.StringHandler;
using Project.Model.ProductManager;
using Project.Model.ProductManager.Request;
using Project.Model.ReportManager;

namespace Project.Repository.ProductManager
{
    /// <summary>
    /// 持久层
    /// </summary>
    public class ProductRepository : RepositoryBaseSql<ProductEntity, int>
    {

        /// <summary>
        /// 前台搜索
        /// </summary>
        /// <param name="where"></param>
        /// <returns></returns>
        public Tuple<IList<ProductEntity>, int> Search(ProductSearchCondition where)
        {
            var selectStr = "select a.* ";
            var countStr = " select count(*) as num ";

            var fromStr = "  from PRM_Product a ";
    

          

            #region where
            var whereStr = " where  a.IsShow=1 ";

            if (!string.IsNullOrWhiteSpace(where.ProductCode))
            {
                where.ProductCode= SqlStrHelper.RemoveSqlUnsafeString(where.ProductCode);
                whereStr += " and  (a.ProductCode  like '%" + where.ProductCode+ "%' or a.ProductName like '%"+ where.ProductCode + "%' )";
            }

            if (where.SystemCategoryId > 0)
            {
                whereStr += " and a.SystemCategoryId = "+where.SystemCategoryId;
            }

            if (where.ProductCategoryId>0)
            {
                whereStr += " and a.ProductCategoryRoute like '%," + where.ProductCategoryId+",%'";
            }

            if (where.AttributeValue1 > 0)
            {
                fromStr += " left join PRM_ProductAttributeValue attr1 on a.PkId = attr1.ProductId";

                whereStr += " and attr1.AttributeValueId=" + where.AttributeValue1;
            }

            if (where.AttributeValue2 > 0)
            {
                fromStr += " left join PRM_ProductAttributeValue attr2 on a.PkId = attr2.ProductId";

                whereStr += " and attr2.AttributeValueId=" + where.AttributeValue2;
            }

            if (where.AttributeValue3 > 0)
            {
                fromStr += " left join PRM_ProductAttributeValue attr3 on a.PkId = attr3.ProductId";

                whereStr += " and attr3.AttributeValueId=" + where.AttributeValue3;
            }

            if (where.AttributeValue4 > 0)
            {
                fromStr += " left join PRM_ProductAttributeValue attr4 on a.PkId = attr4.ProductId";

                whereStr += " and attr4.AttributeValueId=" + where.AttributeValue4;
            }

            if (where.AttributeValue5 > 0)
            {
                fromStr += " left join PRM_ProductAttributeValue attr5 on a.PkId = attr5.ProductId";

                whereStr += " and attr5.AttributeValueId=" + where.AttributeValue5;
            }


            if (where.AttributeValue3 > 0)
            {
                fromStr += " left join PRM_ProductAttributeValue attr6 on a.PkId = attr6.ProductId";

                whereStr += " and attr6.AttributeValueId=" + where.AttributeValue6;
            }
            #endregion


            var sqlQueryStr = selectStr + fromStr;
            var sqlCountStr = countStr + fromStr;


            //whereStr = SqlStrHelper.RemoveSqlUnsafeString(whereStr);

            sqlQueryStr = sqlQueryStr +whereStr;
            sqlCountStr = sqlCountStr +whereStr;

            var returnList = SessionFactoryManager.GetCurrentSession().CreateSQLQuery(sqlQueryStr)
                     .SetFirstResult(where.skipResults)
                     .SetMaxResults(where.maxResults)
                     .SetResultTransformer(Transformers.AliasToBean(typeof(ProductEntity))).List<ProductEntity>();

            var count = SessionFactoryManager.GetCurrentSession().CreateSQLQuery(sqlCountStr).AddScalar("num", NHibernateUtil.Int32).UniqueResult<Int32>();

            return new Tuple<IList<ProductEntity>, int>(returnList, count);
        }




        /// <summary>
        /// 初始化商品信息
        /// </summary>
        /// <returns></returns>
        public void InitProductInfo()
        {
            string sql = "update PRM_Product set  IsPromotion = 0,PromotionPriceArea=''; ";

            var result1 = this.ExecuteNoQuery(sql);

            sql = "update PRM_Goods set  PromotionPrice = 0,RuleId=0; ";

            var result2 = this.ExecuteNoQuery(sql);

        }

    }
}







