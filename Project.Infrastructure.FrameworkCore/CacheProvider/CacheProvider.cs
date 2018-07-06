using System;
using System.Collections;
using System.Collections.Generic;
using Project.Infrastructure.FrameworkCore.CacheProvider.Impl;
using Project.Infrastructure.FrameworkCore.CacheProvider;

namespace Project.Infrastructure.FrameworkCore.CacheProvider
{
    /// <summary>
    /// 缓存引擎
    /// </summary>
    public class CacheProvider
    {
        /// <summary>
        /// 当前缓存引擎
        /// </summary>
        public static readonly CacheProvider Current = new CacheProvider();
        private Hashtable _cacheServicePool = Hashtable.Synchronized(new Hashtable());
        private Dictionary<CacheType, ICacheFactory> _factories = new Dictionary<CacheType, ICacheFactory>();
        public CacheProvider()
        {
            _factories.Add(CacheType.Memory, new MemoryCacheFactory());
            _factories.Add(CacheType.Redis,new RedisCacheFactory());
        }
        #region 缓存引擎工厂
        /// <summary>
        ///初始所有缓存器
        /// </summary>
        /// <param name="factories">待初始化的缓存工厂</param>
        public void Init(params Tuple<CacheType, ICacheFactory>[] factories)
        {
            if(factories!=null && factories.Length>0)
            {
                foreach(var tupe in factories)
                {
                    _factories.Add(tupe.Item1, tupe.Item2);
                }
            }
            if(!_factories.ContainsKey(CacheType.Memory))
            {
                _factories.Add(CacheType.Memory,new MemoryCacheFactory());
            }
        }


        /// <summary>
        /// 创建一个缓存器
        /// </summary>
        /// <returns>Created ILog</returns>
        public ICache CreateCache(CacheType cacheType)
        {
            if (!_factories.ContainsKey(cacheType))
                throw new Exception(cacheType.ToString() + "类型的缓存器没有注册到容器中");
            return _factories[cacheType].Create();
        }

        /// <summary>
        /// 根据名称创建一个缓存器
        /// </summary>
        /// <returns>Created ILog</returns>
        public ICache CreateCache(CacheType cacheType, string name)
        {
            if (!_factories.ContainsKey(cacheType))
                throw new Exception(cacheType.ToString() + "类型的缓存器没有注册到容器中");

            return _factories[cacheType].Create(name);
        }
        #endregion

        #region 缓存服务访问操作

        /// <summary>
        /// 获取某个缓存服务
        /// </summary>
        /// <typeparam name="T">服务</typeparam>
        /// <param name="id">编号</param>
        /// <returns></returns>
        public T GetService<T>(string id) where T:class,ICacheService,new()
        {
            
            if (_cacheServicePool.ContainsKey(id))
            {
                return _cacheServicePool[id] as T;
            }
            else
            {
                lock(_cacheServicePool.SyncRoot)
                {
                    if (!_cacheServicePool.ContainsKey(id))
                    {
                        T service = new T();
                        var cacher = this.CreateCache(service.CacheType);
                        service.SetCache(cacher);
                        if (!_cacheServicePool.ContainsKey(id)) _cacheServicePool.Add(id, service);
                        return service;
                    }
                    else
                    {
                        return _cacheServicePool[id] as T;
                    }
                }

            }
        }


        /// <summary>
        /// 重置服务,并回调执行方法
        /// </summary>
        /// <param name="id">服务标识</param>
        /// <param name="action">回调方法</param>
        public void Reset(string id,Action action = null)
        {
            if (_cacheServicePool.ContainsKey(id))
            {
                var service = ((ICacheService)_cacheServicePool[id]);
                if(service.Setting.AllowReset)
                {
                    service.Reset();
                    if (action != null) action();
                }
            }
        }

        /// <summary>
        /// 重置所有服务
        /// </summary>
        public void ResetAll(Action action = null)
        {
            foreach (DictionaryEntry entry in _cacheServicePool)
            {
                var service = ((ICacheService)_cacheServicePool[entry.Key]);
                if (service.Setting.AllowReset)
                {
                    service.Reset();
                }
            }
            if (action != null) action();
        }

        /// <summary>
        /// 获取服务列表
        /// </summary>
        public Dictionary<string,CacheServiceSetting> GetServiceSettingList {
            get
            {
                Dictionary<string, CacheServiceSetting> dict = new Dictionary<string, CacheServiceSetting>();
                foreach(DictionaryEntry entry in this._cacheServicePool)
                {
                    var service = ((ICacheService)_cacheServicePool[entry.Key]);
                    dict.Add(entry.Key.ToString(), service.Setting);
                }
                return dict;
            }
        }
        #endregion

        #region 服务映射管理

        /// <summary>
        /// 注册服务
        /// </summary>
        /// <param name="cacheService">服务内容</param>
        public void RegeditService(ICacheService cacheService)
        {
            if (!_cacheServicePool.ContainsKey(cacheService.ID))
            {
                _cacheServicePool.Add(cacheService.ID, cacheService);
            }
        }

        /// <summary>
        /// 移除服务
        /// </summary>
        /// <param name="id">服务标识</param>
        public void RemoveService(string id)
        {
            if (_cacheServicePool.ContainsKey(id))
            {
                _cacheServicePool.Remove(id);
            }
        }


        /// <summary>
        /// 清空服务
        /// </summary>
        public void ClearService()
        {
            _cacheServicePool.Clear();
        }

 
        #endregion
 
    }

}
