 
using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Project.Infrastructure.FrameworkCore.CacheProvider.Impl;

namespace Project.Infrastructure.FrameworkCore.CacheProvider.Impl
{
    /// <summary>
    /// 内存式缓存器
    /// </summary>
    public class MemoryCache : ICache
    {
        private string _name = "";
        private static Hashtable _pool = Hashtable.Synchronized(new Hashtable());
        public MemoryCache()
        {
            _name = Guid.NewGuid().ToString("N");
        }
        public MemoryCache(string name)
        {
            this._name = name;
        }
        public object Get(string key)
        {
            if(_pool.ContainsKey(key))
            {
                var entity= _pool[key] as CacheEnity;
                if(entity !=null )
                {
                    if(entity.ValidTime.HasValue && DateTime.Now>entity.ValidTime)
                    {
                        return null;
                    }
                    return entity.Entity;
                }
            }
            return null;
        }

        public long GetSize(object obj)
        {
            return _pool.Count;
        }

        public void Remove(string key)
        {
            if (_pool.ContainsKey(key))
            {
                _pool.Remove(key);
            }
        }

        public void RemoveAll()
        {
            _pool.Clear();
        }

        public bool Set(string key, object value)
        {
            var entity = new CacheEnity()
            {
                Entity = value
            };
            if (_pool.ContainsKey(key))
            {
                _pool[key]= entity;
            }
            else
            {
                _pool.Add(key, entity);
            }
            return true;
        }

        public bool Set(string key, object value, TimeSpan expiry)
        {
            var entity = new CacheEnity()
            {
                Entity = value,
                ValidTime = DateTime.Now.Add(expiry)
            };
            if (_pool.ContainsKey(key))
            {

                _pool[key] = entity;
            }
            else
            {
                _pool.Add(key, entity);
            }
            return true;
        }

        public Dictionary<string, string> Stats(string key)
        {
            return new Dictionary<string, string>();
        }
    }
}
