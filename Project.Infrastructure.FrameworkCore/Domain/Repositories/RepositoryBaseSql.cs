using System.Data;
using System.Data.OracleClient;
using System.Data.SqlClient;
using NHibernate;
using Project.Infrastructure.FrameworkCore.DataNhibernate;
using Project.Infrastructure.FrameworkCore.FrameworkCore.Repository.Interface;

namespace Project.Infrastructure.FrameworkCore.Domain.Repositories
{
    /// <summary>
    /// 数据持久基类
    /// </summary>
    public class RepositoryBaseSql<TEntity, TKey> : RepositoryBase<TEntity, TKey>, IRepositoryBaseExtendSql
        where TEntity : class
    {
        public int ExecuteNoQuery(string sql, params SqlParameter[] cmdParms)
        {
            ISession session = SessionFactoryManager.GetCurrentSession();
            IDbCommand cmd = session.Connection.CreateCommand();
            session.Transaction.Enlist(cmd);

            cmd.CommandText = sql;
            cmd.CommandType = CommandType.Text;
            if (cmdParms != null)
            {
                foreach (SqlParameter parm in cmdParms)
                    cmd.Parameters.Add(parm);
            }
            cmd.Prepare();
          return  cmd.ExecuteNonQuery();
        }

        public void ExecuteProc(string sql, params SqlParameter[] cmdParms)
        {
            throw new System.NotImplementedException();
        }

        public DataTable ExecuteNoQueryToTable(string sql, params SqlParameter[] cmdParms)
        {
            throw new System.NotImplementedException();
        }
    }
}
