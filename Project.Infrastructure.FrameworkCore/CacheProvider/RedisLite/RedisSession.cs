using System.Collections.Concurrent;
using StackExchange.Redis;

namespace Project.Infrastructure.FrameworkCore.CacheProvider.RedisLite
{
    /// <summary>
    /// Redis回话
    /// </summary>
    internal class RedisSession
    {
        private static readonly object Locker = new object();
        private static ConnectionMultiplexer _instance;
        private static readonly ConcurrentDictionary<string, ConnectionMultiplexer> ConnectionCache = new ConcurrentDictionary<string, ConnectionMultiplexer>();

        private static RedisConfig _config = null;

        /// <summary>
        /// 
        /// </summary>
        /// <param name="config"></param>
        public static void Configuration(RedisConfig config)
        {
            if (config == null) throw new RedisException("配置Redis会话失败");
            _config = config;
        }

        /// <summary>
        /// 单例获取
        /// </summary>
        public static ConnectionMultiplexer Instance
        {
            get
            {
                if (_instance == null)
                {
                    lock (Locker)
                    {
                        if (_instance == null || !_instance.IsConnected)
                        {
                            _instance = GetManager(_config);
                        }
                    }
                }
                return _instance;
            }
        }


        private static ConnectionMultiplexer GetManager(RedisConfig config)
        {
            if (string.IsNullOrWhiteSpace(config.Host) || config.Port <= 0)
                throw new RedisException("配置Redis会话失败");

            var connect = ConnectionMultiplexer.Connect(config.ConnectionString);

            //注册如下事件
            connect.ConnectionFailed += Connect_ConnectionFailed;
            connect.ConnectionRestored += Connect_ConnectionRestored;
            connect.ErrorMessage += Connect_ErrorMessage;
            connect.ConfigurationChanged += Connect_ConfigurationChanged;
            connect.HashSlotMoved += Connect_HashSlotMoved;
            connect.InternalError += Connect_InternalError;

            return connect;
        }

        private static void Connect_InternalError(object sender, InternalErrorEventArgs e)
        {
            
        }

        private static void Connect_HashSlotMoved(object sender, HashSlotMovedEventArgs e)
        {
         
        }

        private static void Connect_ConfigurationChanged(object sender, EndPointEventArgs e)
        {
            
        }

        private static void Connect_ErrorMessage(object sender, RedisErrorEventArgs e)
        {
         
        }

        private static void Connect_ConnectionRestored(object sender, ConnectionFailedEventArgs e)
        {
           
        }

        private static void Connect_ConnectionFailed(object sender, ConnectionFailedEventArgs e)
        {
           
        }
    }
}
