using System;

namespace Project.Infrastructure.FrameworkCore.CacheProvider.RedisLite
{
    public class RedisException: Exception
    {
        public RedisException(string message):base(message)
        {

        }
    }
}
