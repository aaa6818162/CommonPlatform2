
 /***************************************************************************
 *       功能：     PMUserSession业务处理层
 *       作者：     李伟伟
 *       日期：     2018/9/7
 *       描述：     
 * *************************************************************************/
using System;
using System.Linq;
using System.Collections.Generic;
using Project.Infrastructure.FrameworkCore.DataNhibernate.Helpers;
using Project.Model.PermissionManager;
using Project.Repository.PermissionManager;

namespace Project.Service.PermissionManager
{
    public class UserSessionService
    {
       
       #region 构造函数
        private readonly UserSessionRepository  _userSessionRepository;
            private static readonly UserSessionService Instance = new UserSessionService();

        public UserSessionService()
        {
           this._userSessionRepository =new UserSessionRepository();
        }
        
         public static  UserSessionService GetInstance()
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
        public System.Int32 Add(UserSessionEntity entity)
        {
            return _userSessionRepository.Save(entity);
        }
        
        
         /// <summary>
        /// 删除
        /// </summary>
        /// <param name="pkId"></param>
        public bool DeleteByPkId(System.Int32 pkId)
        {
         try
            {
            var entity= _userSessionRepository.GetById(pkId);
            _userSessionRepository.Delete(entity);
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
        public bool Delete(UserSessionEntity entity)
        {
         try
            {
            _userSessionRepository.Delete(entity);
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
        public bool Update(UserSessionEntity entity)
        {
          try
            {
            _userSessionRepository.Update(entity);
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
        public UserSessionEntity GetModelByPk(System.Int32 pkId)
        {
            return _userSessionRepository.GetById(pkId);
        }


        /// <summary>
        /// 分页
        /// </summary>
        /// <param name="entity">条件实体</param>
        /// <param name="skipResults">开始</param>
        /// <param name="maxResults">结束</param>
        /// <returns>获取当前页【】和总【】数</returns>
        public System.Tuple<IList<UserSessionEntity>, int> Search(UserSessionEntity where, int skipResults, int maxResults)
        {
                var expr = PredicateBuilder.True<UserSessionEntity>();
                  #region
              // if (!string.IsNullOrEmpty(where.PkId))
              //  expr = expr.And(p => p.PkId == where.PkId);
              // if (!string.IsNullOrEmpty(where.UserId))
              //  expr = expr.And(p => p.UserId == where.UserId);
              // if (!string.IsNullOrEmpty(where.Token))
              //  expr = expr.And(p => p.Token == where.Token);
              // if (!string.IsNullOrEmpty(where.CreateTime))
              //  expr = expr.And(p => p.CreateTime == where.CreateTime);
 #endregion
            var list = _userSessionRepository.Query().Where(expr).OrderByDescending(p => p.PkId).Skip(skipResults).Take(maxResults).ToList();
            var count = _userSessionRepository.Query().Where(expr).Count();
            return new System.Tuple<IList<UserSessionEntity>, int>(list, count);
        }

        /// <summary>
        /// 取列表
        /// </summary>
        /// <param name="entity">条件实体</param>
        /// <returns>返回列表</returns>
        public IList<UserSessionEntity> GetList(UserSessionEntity where)
        {
               var expr = PredicateBuilder.True<UserSessionEntity>();
             #region
              // if (!string.IsNullOrEmpty(where.PkId))
              //  expr = expr.And(p => p.PkId == where.PkId);
              // if (!string.IsNullOrEmpty(where.UserId))
              //  expr = expr.And(p => p.UserId == where.UserId);
              // if (!string.IsNullOrEmpty(where.Token))
              //  expr = expr.And(p => p.Token == where.Token);
              // if (!string.IsNullOrEmpty(where.CreateTime))
              //  expr = expr.And(p => p.CreateTime == where.CreateTime);
 #endregion
            var list = _userSessionRepository.Query().Where(expr).OrderBy(p => p.PkId).ToList();
            return list;
        }
        #endregion


        #region 新增方法
        
        #endregion
    }
}

    
 

