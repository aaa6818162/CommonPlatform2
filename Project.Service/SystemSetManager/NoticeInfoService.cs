
 /***************************************************************************
 *       功能：     SMNoticeInfo业务处理层
 *       作者：     李伟伟
 *       日期：     2018/4/12
 *       描述：     消息通知
 * *************************************************************************/
using System;
using System.Linq;
using System.Collections.Generic;
using Project.Infrastructure.FrameworkCore.DataNhibernate.Helpers;
using Project.Model.SystemSetManager;
using Project.Repository.SystemSetManager;

namespace Project.Service.SystemSetManager
{
    public class NoticeInfoService
    {
       
       #region 构造函数
        private readonly NoticeInfoRepository  _noticeInfoRepository;
            private static readonly NoticeInfoService Instance = new NoticeInfoService();

        public NoticeInfoService()
        {
           this._noticeInfoRepository =new NoticeInfoRepository();
        }
        
         public static  NoticeInfoService GetInstance()
        {
            return Instance;
        }
        #endregion


        #region 基础方法 
         /// <summary>
        /// 新增
        /// </summary>
        /// <param name="entity"></param>
        /// <returns></returns>
        public System.Int32 Add(NoticeInfoEntity entity)
        {
            return _noticeInfoRepository.Save(entity);
        }
        
        
         /// <summary>
        /// 删除
        /// </summary>
        /// <param name="pkId"></param>
        public bool DeleteByPkId(System.Int32 pkId)
        {
         try
            {
            var entity= _noticeInfoRepository.GetById(pkId);
            _noticeInfoRepository.Delete(entity);
             return true;
        }
        catch(Exception e)
        {
         return false;
        }
        }

        /// <summary>
        /// 删除
        /// </summary>
        /// <param name="entity"></param>
        public bool Delete(NoticeInfoEntity entity)
        {
         try
            {
            _noticeInfoRepository.Delete(entity);
             return true;
        }
         catch(Exception e)
        {
         return false;
        }
        }

        /// <summary>
        /// 更新
        /// </summary>
        /// <param name="entity"></param>
        public bool Update(NoticeInfoEntity entity)
        {
          try
            {
            _noticeInfoRepository.Update(entity);
         return true;
        }
         catch(Exception e)
        {
         return false;
        }
        }


        /// <summary>
        /// 通过主键获取实体
        /// </summary>
        /// <param name="pkId">主键</param>
        /// <returns></returns>
        public NoticeInfoEntity GetModelByPk(System.Int32 pkId)
        {
            return _noticeInfoRepository.GetById(pkId);
        }


        /// <summary>
        /// 分页
        /// </summary>
        /// <param name="entity">条件实体</param>
        /// <param name="skipResults">开始</param>
        /// <param name="maxResults">结束</param>
        /// <returns>获取当前页【消息通知】和总【消息通知】数</returns>
        public System.Tuple<IList<NoticeInfoEntity>, int> Search(NoticeInfoEntity where, int skipResults, int maxResults)
        {
                var expr = PredicateBuilder.True<NoticeInfoEntity>();
            #region
            // if (!string.IsNullOrEmpty(where.PkId))
            //  expr = expr.And(p => p.PkId == where.PkId);
            if (where.ToCustomerId>0)
                expr = expr.And(p => p.ToCustomerId == where.ToCustomerId);
            // if (!string.IsNullOrEmpty(where.Title))
            //  expr = expr.And(p => p.Title == where.Title);
            // if (!string.IsNullOrEmpty(where.IsRead))
            //  expr = expr.And(p => p.IsRead == where.IsRead);
            // if (!string.IsNullOrEmpty(where.CreateDate))
            //  expr = expr.And(p => p.CreateDate == where.CreateDate);
            #endregion
            var list = _noticeInfoRepository.Query().Where(expr).OrderByDescending(p => p.PkId).Skip(skipResults).Take(maxResults).ToList();
            var count = _noticeInfoRepository.Query().Where(expr).Count();
            return new System.Tuple<IList<NoticeInfoEntity>, int>(list, count);
        }

        /// <summary>
        /// 取列表
        /// </summary>
        /// <param name="entity">条件实体</param>
        /// <returns>返回列表</returns>
        public IList<NoticeInfoEntity> GetList(NoticeInfoEntity where)
        {
               var expr = PredicateBuilder.True<NoticeInfoEntity>();
             #region
              // if (!string.IsNullOrEmpty(where.PkId))
              //  expr = expr.And(p => p.PkId == where.PkId);
              // if (!string.IsNullOrEmpty(where.ToCustomerId))
              //  expr = expr.And(p => p.ToCustomerId == where.ToCustomerId);
              // if (!string.IsNullOrEmpty(where.Title))
              //  expr = expr.And(p => p.Title == where.Title);
              // if (!string.IsNullOrEmpty(where.IsRead))
              //  expr = expr.And(p => p.IsRead == where.IsRead);
              // if (!string.IsNullOrEmpty(where.CreateDate))
              //  expr = expr.And(p => p.CreateDate == where.CreateDate);
 #endregion
            var list = _noticeInfoRepository.Query().Where(expr).OrderBy(p => p.PkId).ToList();
            return list;
        }
        #endregion


        #region 新增方法
        
        #endregion
    }
}

    
 

