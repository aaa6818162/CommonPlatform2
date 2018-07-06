using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Project.Infrastructure.FrameworkCore.DataNhibernate.Helpers;
using Project.Model.ContentManager;
using Project.Repository.ContentManager;

namespace Project.Application.Service.ContentManager
{
    /// <summary>
    /// 内容
    /// </summary>
    public class ContentServiceImpl : IServiceImpl
    {
        private readonly PageContentRepository _pageContentRepository;
        private readonly PageContentCategoryRepository _pageContentCategoryRepository;
        private readonly OfflineActivityRepository _offlineActivityRepository;
        public ContentServiceImpl()
        {
            _pageContentRepository = new PageContentRepository();
            _pageContentCategoryRepository = new PageContentCategoryRepository();
            this._offlineActivityRepository = new OfflineActivityRepository();
        }


        /// <summary>
        /// 内容详情
        /// </summary>
        /// <param name="pkId"></param>
        /// <returns></returns>
        public PageContentEntity GetPageContentEntity(int pkId)
        {
            return _pageContentRepository.GetById(pkId);
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="pkId"></param>
        /// <returns></returns>
        public Tuple<PageContentEntity, PageContentEntity> GetBeforeAndNext(int pkId)
        {
            var temp= _pageContentRepository.GetById(pkId);

            return _pageContentRepository.GetBeforeAndNext(pkId, temp.PageContentCategoryId);
        }



        /// <summary>
        /// 分页
        /// </summary>
        /// <param name="skipResults">开始</param>
        /// <param name="maxResults">结束</param>
        /// <returns>获取当前页【】和总【】数</returns>
        public System.Tuple<IList<PageContentEntity>, int> Search(PageContentEntity where, int skipResults, int maxResults)
        {
            var expr = PredicateBuilder.True<PageContentEntity>();
            #region
            if (!string.IsNullOrEmpty(where.Title1))
                expr = expr.And(p => p.Title1.IsLike(where.Title1) || p.Title2.IsLike(where.Title1) || p.Title3.IsLike(where.Title1));

            if (where.PageContentCategoryId>0)
            {
                expr = expr.And(p => p.PageContentCategoryId== where.PageContentCategoryId);
            }

            #endregion
                var list = _pageContentRepository.Query().Where(expr).OrderBy(p=>p.Sort).ThenByDescending(p => p.PkId).Skip(skipResults).Take(maxResults).ToList();
            var count = _pageContentRepository.Query().Where(expr).Count();
            return new System.Tuple<IList<PageContentEntity>, int>(list, count);
        }


        /// <summary>
        /// 获取定制页内容
        /// </summary>
        /// <param name="pageContentCategoryId"></param>
        /// <returns></returns>
        public IList<PageContentEntity> GetList(int pageContentCategoryId)
        {
            var expr = PredicateBuilder.True<PageContentEntity>();
            expr = expr.And(p => p.PageContentCategoryId == pageContentCategoryId);
            var list = _pageContentRepository.Query().Where(expr).OrderBy(p => p.Sort).ToList();
            return list;
        }



        /// <summary>
        /// 活动详情
        /// </summary>
        /// <param name="pkId"></param>
        /// <returns></returns>
        public OfflineActivityEntity GetOfflineActivityRepository(int pkId)
        {
            return _offlineActivityRepository.GetById(pkId);
        }


        /// <summary>
        /// 获取活动信息
        /// </summary>
        /// <returns></returns>
        public IList<OfflineActivityEntity> GetActivityListTop3()
        {
            var expr = PredicateBuilder.True<OfflineActivityEntity>();
            expr = expr.And(p => p.EndDate>=DateTime.Now);

            var list = _offlineActivityRepository.Query().Where(expr).OrderByDescending(p => p.PkId).Skip(0).Take(3).ToList();
            return list;
        }


        /// <summary>
        /// 获取活动信息
        /// </summary>
        /// <returns></returns>
        public IList<OfflineActivityEntity> GetActivityList()
        {
            var expr = PredicateBuilder.True<OfflineActivityEntity>();
            expr = expr.And(p => p.EndDate >= DateTime.Now);
            var list = _offlineActivityRepository.Query().Where(expr).OrderByDescending(p => p.PkId).ToList();
            return list;
        }


        /// <summary>
        /// 分页
        /// </summary>
        /// <param name="where">条件实体</param>
        /// <param name="skipResults">开始</param>
        /// <param name="maxResults">结束</param>
        /// <returns>获取当前页【】和总【】数</returns>
        public System.Tuple<IList<OfflineActivityEntity>, int> SearchActivity(OfflineActivityEntity where, int skipResults, int maxResults)
        {
            var expr = PredicateBuilder.True<OfflineActivityEntity>();
            #region
            // if (!string.IsNullOrEmpty(where.PkId))
            //  expr = expr.And(p => p.PkId == where.PkId);
            if (!string.IsNullOrEmpty(where.Tttle))
                expr = expr.And(p => p.Tttle == where.Tttle);
            // if (!string.IsNullOrEmpty(where.OfflineActivityAddress))
            //  expr = expr.And(p => p.OfflineActivityAddress == where.OfflineActivityAddress);
            if (where.StartDate != null)
                expr = expr.And(p => p.StartDate >= where.StartDate);
            if (where.EndDate != null)
                expr = expr.And(p => p.EndDate <= where.EndDate);
            // if (!string.IsNullOrEmpty(where.ImageUrl))
            //  expr = expr.And(p => p.ImageUrl == where.ImageUrl);
            // if (!string.IsNullOrEmpty(where.BriefDescription))
            //  expr = expr.And(p => p.BriefDescription == where.BriefDescription);
            // if (!string.IsNullOrEmpty(where.State))
            //  expr = expr.And(p => p.State == where.State);
            // if (!string.IsNullOrEmpty(where.DeletionTime))
            //  expr = expr.And(p => p.DeletionTime == where.DeletionTime);
            // if (!string.IsNullOrEmpty(where.DeleterUserCode))
            //  expr = expr.And(p => p.DeleterUserCode == where.DeleterUserCode);
            // if (!string.IsNullOrEmpty(where.IsDeleted))
            //  expr = expr.And(p => p.IsDeleted == where.IsDeleted);
            // if (!string.IsNullOrEmpty(where.LastModificationTime))
            //  expr = expr.And(p => p.LastModificationTime == where.LastModificationTime);
            // if (!string.IsNullOrEmpty(where.LastModifierUserCode))
            //  expr = expr.And(p => p.LastModifierUserCode == where.LastModifierUserCode);
            // if (!string.IsNullOrEmpty(where.CreationTime))
            //  expr = expr.And(p => p.CreationTime == where.CreationTime);
            // if (!string.IsNullOrEmpty(where.CreatorUserCode))
            //  expr = expr.And(p => p.CreatorUserCode == where.CreatorUserCode);
            #endregion
            var list = _offlineActivityRepository.Query().Where(expr).OrderByDescending(p => p.PkId).Skip(skipResults).Take(maxResults).ToList();
            var count = _offlineActivityRepository.Query().Where(expr).Count();
            return new System.Tuple<IList<OfflineActivityEntity>, int>(list, count);
        }


    }
}
