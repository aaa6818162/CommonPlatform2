
 /***************************************************************************
 *       功能：     CNMPageContent持久层
 *       作者：     李伟伟
 *       日期：     2018/3/17
 *       描述：     
 * *************************************************************************/

using System;
using System.Collections.Generic;
using System.Linq;
using NHibernate;
using NHibernate.Transform;
using Project.Infrastructure.FrameworkCore.DataNhibernate;
using Project.Infrastructure.FrameworkCore.Domain.Repositories;
using Project.Model.ContentManager;
using Project.Model.ProductManager;

namespace Project.Repository.ContentManager
{   
    /// <summary>
    /// 持久层
    /// </summary>
    public class  PageContentRepository : RepositoryBaseSql< PageContentEntity, int>
    {

     
        /// <summary>
        /// 取上一条及下一条数据
        /// </summary>
        /// <param name="pkId"></param>
        /// <param name="pageContentCategoryId"></param>
        /// <returns></returns>
        public Tuple<PageContentEntity, PageContentEntity> GetBeforeAndNext(int pkId,int pageContentCategoryId)
        {
            var before = " select top 1 * from CNM_PageContent where PkId<"+ pkId + " and  PageContentCategoryId="+ pageContentCategoryId + "  order by Sort DESC ";
            var next = " select top 1 * from CNM_PageContent where PkId>" + pkId + " and  PageContentCategoryId=" + pageContentCategoryId + "  order by Sort DESC ";

            var beforeEntity = SessionFactoryManager.GetCurrentSession().CreateSQLQuery(before)
                       .SetResultTransformer(Transformers.AliasToBean(typeof(PageContentEntity))).List<PageContentEntity>().FirstOrDefault();
            var nextEntity = SessionFactoryManager.GetCurrentSession().CreateSQLQuery(next)
                   .SetResultTransformer(Transformers.AliasToBean(typeof(PageContentEntity))).List<PageContentEntity>().FirstOrDefault();

            return new Tuple<PageContentEntity, PageContentEntity>(beforeEntity, nextEntity);
        }


    }
}




    
 

