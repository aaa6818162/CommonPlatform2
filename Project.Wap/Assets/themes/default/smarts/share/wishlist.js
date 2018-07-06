var wishlistApis = {
    list: function (categoryId, keyword, pageindex, pagesize, callback) {
        $.utility.ajax('/Member/Wishlist/Wishlists', { categoryId: categoryId, keyword: keyword, pageIndex: pageindex, pageSize: pagesize }, callback);
    },
    search: function (keyword, pageindex, pagesize, callback) {
        $.utility.ajax('/Member/Wishlist/Search', { keyword: keyword, pageIndex: pageindex, pageSize: pagesize }, callback);
    },
    getWishlist: function (customerId, type, callback) {
        $.utility.ajax('/Member/Wishlist/GetWishlistByCustomer', { customerId: customerId, type: type }, callback);
    },
    addWishlist: function (type, projectIds, categoryId, callback) {
        $.utility.ajax('/Member/Wishlist/AddWishlist', { type: type, projectIds: projectIds, categoryId: categoryId }, callback);
    },
    move: function (id, categoryId, callback) {
        //暂时在此使用ajax，后期修改到utility
        $.ajax({
            url: '/Member/Wishlist/Move',
            data: { id: id, categoryId: categoryId },
            type: 'post',
            dataType: 'json',
            async: false,
            xhrFields: {
                withCredentials: true
            },
            success: function (result) {
                if (callback && typeof callback == 'function')
                    callback(result);
            },
            crossDomain: true,
            error: function (e) {
                if (error && typeof callback == 'function')
                    error(result);
            }
        });
    },
    delWishlist: function (ids, callback) {
        $.utility.ajax('/Member/Wishlist/DelWishlist', { ids: ids }, callback);
    },
    deleteWishlist: function (type, id, callback) {
        $.utility.ajax('/Member/Wishlist/DeleteWishlist', { type: type, id: id }, callback);
    },
    categorys: function (callback) {
        $.utility.ajax('/Member/Wishlist/Categorys', {}, callback);
    },
    setCategory: function (id, name, callback) {
        $.utility.ajax('/Member/Wishlist/SetCategory', { id: id, name: name }, callback);
    },
    getCategory: function (id, keyword, pageindex, pagesize, callback) {
        $.utility.ajax('/Member/Wishlist/GetCategory', { id: id, keyword: keyword, pageIndex: pageindex, pageSize: pagesize }, callback);
    },
    delCategory: function (id, callback) {
        $.utility.ajax('/Member/Wishlist/DelCategory', { id: id }, callback);
    }
};

//(function ($) {
//$.expr[':'].addWishlist = function (_c, _t, _o, _f) {
//    wishlistApis.addWishlist();
//}
//$.expr[':'].addCart = function (_sku, _count, _mark, _callback, _error) {
//    cart.add(_sku, _count, _mark, function (_r) {
//        if (typeof _callback == "function")
//            _callback(_r);
//    }, function (_err) {
//        if (typeof _error == "function")
//            _callback(_err);
//    });
//}
//$.fn.addWishlist = function(options) {
//    var defaults = {
//        url: '/template/',
//        istpl: false,
//        data: null,
//        turl: '',
//        options: {}
//    };

//    var opts = $.extend(defaults, options);

//}
//});

//添加wishlist相关
var wishlistAdd = {
    config: {
        isAddCategory: false,
        wishlistType: 0,
        projectId: '',
        salesmark: 0,
        callback: null
    },
    init: function (options) {
        var opts = $.extend({
            isdelete: 0,
            type: 0,
            salesmark: 0,
            projectId: '',
            callback: null,
            dcallback: null
        }, options);

        topNavs.accounts.isLoginSso(function () {
            if (opts.isdelete == 1) {
                wishlistApis.deleteWishlist(opts.type, opts.projectId, function (r) {
                    if (r.success) {
                        topNavs.top_refresh();
                        if (opts.dcallback && typeof opts.dcallback == 'function')
                            opts.dcallback(r);
                    }
                    else {
                        smart.utility.tips.alert(r.message);
                    }
                });
            } else {
                wishlistAdd.config.isAddCategory = false;
                wishlistAdd.config.wishlistType = opts.type;
                wishlistAdd.config.projectId = opts.projectId;
                wishlistAdd.config.salesmark = opts.salesmark;
                wishlistAdd.config.callback = opts.callback;

                wishlistAdd.bindData();

                $('#txtWishlistCategoryName').hide();
                $('#txtWishlistCategoryName').val('');

                $('#addWishlist').unbind('click');
                $('#canenlAddWishlist').unbind('click');
                $('#addWishlistCategory').unbind('click');

                $('#addWishlistCategory').bind('click', function () {
                    if (!wishlistAdd.config.isAddCategory)
                        $('#txtWishlistCategoryName').show();
                    else
                        $('#txtWishlistCategoryName').hide();

                    wishlistAdd.config.isAddCategory = !wishlistAdd.config.isAddCategory;
                });

                $('#addWishlist').bind('click', function () {
                    wishlistAdd.submit();
                });

                $('#canenlAddWishlist,.collect-modal .box .icon').bind('click', function () {
                    $('.collect-modal').hide();
                    wishlistAdd.config.isAddCategory = false;
                });

                $('.collect-modal').show();
            }
        }, window.location.href);
    },
    addProducts: function ($obj) {
        var type = $obj.data('wishlisttype');
        var projectId = $obj.data('sku');
        if ($.utility.isNullOrEmpty(projectId)) {
            projectId = $obj.data('projectid');
        }
        var salesmark = $obj.data("possalesmark");
        var isdelete = 0;
        var noUpdate = 0;

        var datas = $obj.data('wishlist');  //1    1,0
        if (!$.utility.isNullOrEmpty(datas)) {
            isdelete = datas;

            if (datas.length > 1)
                noUpdate = datas.split(',')[1];
        }

        var $$this = $obj;

        wishlistAdd.init({
            isdelete: isdelete,
            type: type,
            projectId: projectId,
            salesmark: salesmark,
            callback: function (r) {
                if (r.success) {
                    $$this.data('wishlist', '1');
                    if (type == 3) {
                        $$this.find('i').css("color", "rgb(255, 125, 85)");
                        $$this.find('b').html("取消收藏");
                    }
                    else {
                        $$this.css("color", "rgb(255, 125, 85)");
                    }
                    if (noUpdate == 0) {
                        var collectCount = $$this.parent().find('span');
                        if (collectCount.length > 0) {
                            var collectValue = parseInt($($(collectCount[0]).html()).isNullOrEmpty(true) ? "0" : $(collectCount[0]).html());
                            collectValue += 1;
                            $(collectCount[0]).html(collectValue);
                        }
                    }
                }
                else {
                    smart.utility.tips.alert(r.message);
                }
            },
            dcallback: function (r) {
                $$this.data('wishlist', '0');
                if (type == 3) {
                    $$this.find('i').css("color", "rgb(213, 213, 214)");
                    $$this.find('b').html("收藏该搭配");
                }
                else {
                    $$this.css("color", "rgb(213, 213, 214)");
                }
                $$this.css("color", "rgb(213, 213, 214)");
                if (noUpdate == 0) {
                    var collectCount = $$this.parent().find('span');
                    if (collectCount.length > 0) {
                        var collectValue = parseInt($($(collectCount[0]).html()).isNullOrEmpty(true) ? "0" : $(collectCount[0]).html());
                        collectValue -= 1;
                        collectValue = collectValue == 0 ? '' : collectValue;
                        $(collectCount[0]).html(collectValue);
                    }
                }
            }
        });
    },
    add: function (type, projectId, callback, _s) {
        topNavs.accounts.islogin(function () {
            wishlistAdd.config.isAddCategory = false;
            wishlistAdd.config.wishlistType = type;
            wishlistAdd.config.projectId = projectId;
            wishlistAdd.config.callback = callback;

            wishlistAdd.interacts.init();
            wishlistAdd.bindData();

            $('#txtWishlistCategoryName').hide();
            $('#txtWishlistCategoryName').val('');

            $('#addWishlist').unbind('click');
            $('#canenlAddWishlist').unbind('click');
            $('#addWishlistCategory').unbind('click');

            $('#addWishlistCategory').bind('click', function () {
                if (!wishlistAdd.config.isAddCategory)
                    $('#txtWishlistCategoryName').show();
                else
                    $('#txtWishlistCategoryName').hide();

                wishlistAdd.config.isAddCategory = !wishlistAdd.config.isAddCategory;
            });

            $('#addWishlist').bind('click', function () {
                wishlistAdd.submit();
            });

            $('#canenlAddWishlist,.collect-modal .box .icon').bind('click', function () {
                $('.collect-modal').hide();
                wishlistAdd.config.isAddCategory = false;
            });

            if (_s)
                $('.collect-modal').show();
        });
    },
    //interacts: {
    //    init: function () {
    //        this.boxList = $('.box-list');
    //        this.collectModal = $('.collect-modal');
    //        this.box = this.collectModal.find('.box');
    //        this.icon = this.box.find('.icon');
    //        this.initEvents();
    //    },
    //    initEvents: function () {
    //        this.boxList.on('click', '.goods-name .icon', $.proxy(this.show, this));
    //        this.box.on('click', function (event) {
    //            event.stopPropagation();
    //        });
    //        this.icon.on('click', $.proxy(this.hide, this));
    //        this.collectModal.on('click', $.proxy(this.hide, this));
    //    },
    //    show: function () {
    //        var self = this;
    //        self.collectModal.fadeIn();
    //    },
    //    hide: function (event) {
    //        event.stopPropagation();
    //        var self = this;
    //        self.collectModal.fadeOut();
    //    }
    //},
    bindData: function () {
        wishlistApis.categorys(function (result) {
            if (result.success) {
                if (result.data.Categorys != null && result.data.Categorys.length > 0) {
                    $('#wishlistCategory').html('<option value="">我的收藏</option>');

                    for (var i = 0; i < result.data.Categorys.length; i++) {
                        var item = result.data.Categorys[i];
                        $('#wishlistCategory').append('<option value="' + item.Id + '">' + item.Name + '</option>');
                    }
                }
            }
        });
    },
    verify: function () {
        if (wishlistAdd.config.wishlistType != 1 && wishlistAdd.config.wishlistType != 2)
            return true;

        if ($.utility.validate.isNullOrEmpty(wishlistAdd.config.projectId))
            return false;

        if (wishlistAdd.config.isAddCategory) {
            var name = $('#txtWishlistCategoryName').val();
            if ($.utility.validate.isNullOrEmpty(name)) {
                smart.utility.tips.alert('请输入wishlist单名称');
                $('#txtWishlistCategoryName').focus();
                return false;
            }
            if (!$.utility.checkLength(name)) {
                smart.utility.tips.alert('超过限制字符');
                $('#txtWishlistCategoryName').focus();
                return false;
            }
        }

        return true;
    },
    submit: function () {
        if (wishlistAdd.verify()) {
            var type = wishlistAdd.config.wishlistType;
            var salesmark = wishlistAdd.config.salesmark;
            var categoryId = $('#wishlistCategory').val();
            var projectId = wishlistAdd.config.projectId;
            if (wishlistAdd.config.isAddCategory) {
                var name = escape($('#txtWishlistCategoryName').val());
                wishlistApis.setCategory('', name, function (result) {
                    if (result.success) {
                        categoryId = result.data;

                        wishlistApis.addWishlist(type, projectId, categoryId, function (r) {
                            if (r.success)
                                $('.collect-modal').hide();
                            if (projectId != 0 && salesmark != 0) {
                                smart.command('removeCart', null, null, function (ele, args) {
                                    return (ele.data('sku') == projectId && ele.data('possalesmark') == salesmark);
                                });
                            }
                            topNavs.top_refresh();

                            if (typeof wishlistAdd.config.callback == 'function')
                                wishlistAdd.config.callback(r);
                        });
                    } else {
                        $('#listError').text(result.message);
                    }
                });
            }
            else
                wishlistApis.addWishlist(type, projectId, categoryId, function (r) {
                    if (r.success)
                        $('.collect-modal').hide();
                    if (projectId != 0 && salesmark != 0) {
                        smart.command('removeCart', null, null, function (ele, args) {
                            return (ele.data('sku') == projectId && ele.data('possalesmark') == salesmark);
                        });
                    }
                    topNavs.top_refresh();

                    if (typeof wishlistAdd.config.callback == 'function')
                        wishlistAdd.config.callback(r);
                });
        }

    }
};

//wishlist头部
var wishlistTop = {
    init: function (headPortrait, nickName, cateCount, wishlistCount) {
        if (!$.utility.isNullOrEmpty(headPortrait))
            $('#headPortrait').attr('src', headPortrait);

        var html = '<p class="name">' + nickName + '’S WISHLIST</p>';
        html += '<p class="mt10"><span>' + wishlistCount + '</span>个收藏';
        html += '<span class="ml10">' + cateCount + '</span>个Wishlist单</p>';

        $('#wishlistInfo').html(html);

        wishlistTop.dropMenu.init();
        wishlistTop.binding();
    },
    search: function () {
        window.location.href = '/wishlist/search?keyword=' + ($('#txtWishlistKeyword').isNullOrEmpty() ? '' : Base64.encode($('#txtWishlistKeyword').val().replace('Search...', '')).replace(/\+/g, '%2B').replace(/\"/g, '%22').replace(/\'/g, '%27').replace(/\//g, '%2F'));
    },
    binding: function () {
        $('.search-img').click(function () {
            wishlistTop.search();
        });

        $.utility.onEnterEvents($('#txtWishlistKeyword'), function () {
            wishlistTop.search();
        });
    },
    dropMenu: {
        init: function () {
            this.wishlistArea = $('.wishlist-area');
            this.initEvents();
        },
        initEvents: function () {
            this.wishlistArea.on('click', '.move-area .dropdown-toggle', $.proxy(this.show, this));
        },
        show: function (e) {
            var currEle = e.currentTarget;
            if (!$(currEle).siblings('.dropdown-menu').is(":animated")) {
                $(currEle).siblings('.dropdown-menu').slideToggle();
            }
        }
    }
};

//瀑布流
var waterfallFolw = {
    getScrollTop: function () {
        var scrollTop = 0;
        if (document.documentElement && document.documentElement.scrollTop) {
            scrollTop = document.documentElement.scrollTop;
        }
        else if (document.body) {
            scrollTop = document.body.scrollTop;
        }
        return scrollTop;
    },
    getClientHeight: function () {
        var clientHeight = 0;
        if (document.body.clientHeight && document.documentElement.clientHeight) {
            clientHeight = Math.min(document.body.clientHeight, document.documentElement.clientHeight);
        }
        else {
            clientHeight = Math.max(document.body.clientHeight, document.documentElement.clientHeight);
        }
        return clientHeight;
    },
    getScrollHeight: function () {
        return Math.max(document.body.scrollHeight, document.documentElement.scrollHeight);
    },
    init: function (callback) {
        $(document).scroll(function () {
            var scrollTop = waterfallFolw.getScrollTop();
            var clientHeight = waterfallFolw.getClientHeight();
            var scrollHeight = waterfallFolw.getScrollHeight();

            if (scrollTop + clientHeight == scrollHeight) {
                if (typeof callback == 'function')
                    callback();
            }
        });
    }
};

//我的wishlist页面相关
var wishlists = {
    config: {
        pageIndex: 1,
        pageSize: 20,
        categoryId: '',
        keyword: ''
    },
    interacts: {
        checkboxSelect: {
            init: function () {
                this.all = $('#all');
                this.wishlistArea = $('.wishlist-area');
                this.initEvents();
            },
            initEvents: function () {
                this.setData();
                this.all.on('click', $.proxy(this.allSelect, this));
            },
            setData: function () {
                this.all.data('sign', '1');
            },
            allSelect: function () {
                var self = this;
                var sign = self.all.data('sign');
                if (sign == '1') {
                    self.all.removeData('sign');
                    self.wishlistArea.find('.slectbox').prop('checked', true);
                } else {
                    self.setData();
                    self.inverseSelect();
                }

            },
            inverseSelect: function () {
                var self = this;
                self.wishlistArea.find('.slectbox').prop('checked', false);
            }
        },
        dropdownToggle: function () {
            $(document).on("click", '.move-area .dropdown-toggle', function () {
                $(this).parent().parents('li').siblings().find('.dropdown-menu').fadeOut();
            });
        },
        binding: function () {
            $(document).on("click", '.add , .ws-house span,.ws-collection .edit', function () {
                $('#wishlistTitle').text('创建新的Wishlist单');
                $('#hidWishlistCategoryId').val('');
                $('#txtWishlistCategoryName').val('');
                $(".ws-tc").show();
            });
            $(".icon , .btn-qx").click(function () {
                $(".ws-tc").hide();
            });
            $('#btnSaveWishlitCategory').click(function () {
                wishlistCategorys.save();
            });
            $('#removeWishlist').click(function () {
                wishlists.remove('');
            });
            $("#tabWishlist").css('color', '#080606');

            $(document).on('click', '.addcart', function () {
                var state = $(this).attr('data-State');
                var Enabled = state.split('_');
                if (!Enabled[0] || Enabled[1] == 1) {
                    var sku = $(this).attr('data-sku');
                    if (!$(sku).isNullOrEmpty(true))
                        $.utility.products.addCart(sku, 1);
                    else
                        smart.utility.tips.alert('加入购物车失败');
                }
            });
        }
    },
    bindData: function () {
        wishlistApis.list(wishlists.config.categoryId, wishlists.config.keyword, wishlists.config.pageIndex, wishlists.config.pageSize, function (result) {
            wishlistTop.init(result.data.HeadPortrait, result.data.NickName, result.data.WishlistCategoryCount, result.data.WishlistCount);

            if (result.data.Wishlists != null && result.data.Wishlists.length > 0) {
                var categorys = result.data.Categorys != null && result.data.Categorys.length > 0 ? result.data.Categorys : null;
                var html = [];
                for (var i = 0; i < result.data.Wishlists.length; i++) {
                    var item = result.data.Wishlists[i];
                    if ($('.wishlist-area').find('button[data-sku=' + item.Sku + ']').length > 0) continue;
                    html.push('<li ' + (item.IsExpired || item.OnSale == 2 ? 'class="fail-area" ' : '') + '>');
                    html.push('<a href="' + (item.IsExpired || item.OnSale == 2 ? '' : item.Url) + '">');
                    var img = item.Image;
                    if (item.WishlistType == 1)
                        img = smart.utility.generateImgUrl(item.Image, 320, 320);


                    html.push('<img class="product-img" src="' + img + '" alt="" onerror="javascript:this.src=\'' + smart.utility.generateDefaultImgUrl(320, 320) + '\'"></a>');

                    if (item.IsExpired || item.OnSale == 2) {
                        html.push('<img class="fail-img" src="/Assets/themes/default/image/wishlist/fail.png">');
                    }
                    html.push('<div class="rside">');
                    html.push('<h3 class="title">' + item.Title + '</h3>');
                    if (item.Price != item.OldPrice) {
                        if (item.WishlistType == 1) {
                            html.push('<em class="pos-a del">￥' + item.OldPrice + '</em>');
                        }
                        html.push('<input type="checkbox" name="slectbox" class="slectbox" value="' + item.Id + '">');
                        html.push('<div>');
                        html.push('<p class="desc dis-ib">' + item.Intro + '</p>');
                        if (item.WishlistType == 1) {
                            html.push('<p class="ins dis-ib"><span>￥</span>' + item.Price + '</p>');
                        }
                        html.push('</div>');
                    } else {
                        if (item.WishlistType == 1) {
                            html.push('<em class="price">￥' + item.Price + '</em>');
                        }
                        html.push('<input type="checkbox" name="slectbox" class="slectbox" value="' + item.Id + '">');
                        html.push('<p class="desc">' + item.Intro + '</p>');
                    }
                    if (item.WishlistType == 1) {
                        html.push('<a class="tag" href="' + (item.IsExpired || item.OnSale == 2 ? '' : item.Url) + '">' + item.ProductState + '</a>');
                    }
                    html.push('<div class="add-wishlist">');
                    if (item.WishlistType == 1) {
                        html.push('<button data-sku="' + item.Sku + '" data-State="' + item.IsExpired + '_' + item.OnSale + '" class="btn addcart">加入购物车</button>');
                    }
                    html.push('</div><div class="action-area">');
                    html.push('<span class="date">添加日期：' + item.CreateTime + '</span>');
                    html.push('<ul class="move-area"><li>');
                    if (categorys != null) {
                        html.push('<a href="javascript:;" class="dropdown-toggle">移动到<i class="icon iconfont">&#xe60b;</i></a>');
                    }
                    html.push('<ul class="dropdown-menu">');

                    if (categorys != null) {
                        for (var j = 0; j < categorys.length; j++) {
                            html.push('<li><a href="javascript:wishlists.move(\'' + item.Id + '\',\'' + categorys[j].Id + '\');">' + categorys[j].Name + '</a></li>');
                        }
                    }

                    html.push('</ul></li></ul>');
                    html.push('<button class="delete" onclick="wishlists.remove(\'' + item.Id + '\');">删 除</button>');
                    html.push('</div></div></li>');
                }

                if (wishlists.config.pageIndex == 1)
                    $('.wishlist-area').html(html.join(''));
                else
                    $('.wishlist-area').append(html.join(''));
            } else {
                if (wishlists.config.pageIndex == 1) {
                    $('.wh-action').hide();
                    $('.wishlist-area').hide();
                    $('.ws-collection').hide();
                    $('#noWishlist').show();
                }
            }

            wishlists.slectbox();
            wishlists.config.pageIndex++;
        });
    },
    remove: function (id) {
        smart.utility.tips.confirm('确定删除么？', function () {
            var ids = '';
            if ($(id).isNullOrEmpty(true)) {
                $('.slectbox').each(function () {
                    if ($(this).prop('checked'))
                        ids += $(this).val() + ',';
                });

                //if (!$(ids).isNullOrEmpty(true))
                //    ids = ids.substr(0, ids.length - 1);
            } else
                ids = id;
            if (ids == "") {
                smart.utility.tips.alert('请选择需要删除的wishlist');
                return;
            }
            wishlistApis.delWishlist(ids, function (r) {
                if (r.success)
                    window.location.reload();
                else
                    smart.utility.tips.alert('删除失败');
            });
        });
    },
    slectbox: function () {
        $("input[name='slectbox']").click(function () {
            var state = true;
            $("input[name='slectbox']").each(function () {
                if (!$(this).is(':checked')) {
                    state = false;
                }
            });
            if (state) {
                $('#all').prop('checked', true);
                $('#all').removeData('sign');
            }
            else {
                $('#all').prop('checked', false);
                $('#all').data('sign', '1');
            }
        });
    },
    move: function (id, categoryId) {
        wishlistApis.move(id, categoryId, function (r) {
            if (r.success) {
                wishlists.config.pageIndex = 1;
                wishlists.config.pageSize = 20;
                wishlists.config.categoryId = '';
                window.location.reload();
            } else
                smart.utility.tips.alert('操作失败');
        });
    },
    init: function () {
        wishlists.bindData();
        waterfallFolw.init(wishlists.bindData);
        wishlists.interacts.checkboxSelect.init();
        wishlists.interacts.dropdownToggle();
        wishlists.interacts.binding();
    }
};

//wishlist单
var wishlistCategorys = {
    edit: function (obj) {
        if (obj) {
            var id = $(obj).attr('data-id');
            var name = $(obj).attr('data-name');
            if ($(id).isNullOrEmpty(true) || $.utility.isNullOrEmpty(name)) {
                smart.utility.tips.alert('编辑失败');
                return;
            }

            $('#wishlistTitle').text('编辑Wishlist单');
            $('#hidWishlistCategoryId').val(id);
            $('#txtWishlistCategoryName').val(name);
        }

        $(".ws-tc").show();
    },
    remove: function (obj) {
        smart.utility.tips.confirm("确定删除么？", function () {
            if (obj) {
                var id = $(obj).attr('data-id');
                if (!$(id).isNullOrEmpty(true)) {
                    wishlistApis.delCategory(id, function (r) {
                        if (r.success)
                            window.location.reload();
                        else
                            smart.utility.tips.alert('删除失败');
                    });
                } else
                    smart.utility.tips.alert('删除失败');
            } else
                smart.utility.tips.alert('删除失败');
        });
    },
    save: function () {
        var categoryId = $('#hidWishlistCategoryId').val();
        var name = escape($('#txtWishlistCategoryName').val());
        var txtWishlistCategoryName = $('#txtWishlistCategoryName').val();

        if ($.utility.isNullOrEmpty(txtWishlistCategoryName)) {
            $('#txtWishlistCategoryName').focus();
            $('#error').html('请输入wishlist单名称');
            return;
        } else
            $('#error').html('');

        if (!$.utility.checkLength(txtWishlistCategoryName)) {
            $('#txtWishlistCategoryName').focus();
            $('#error').html('超过限制字符');
            return false;
        }

        wishlistApis.setCategory(categoryId, name, function (r) {
            if (r.success)
                window.location.reload();
            else
                $('#error').html(r.message);
        });
    },
    bindData: function () {
        wishlistApis.categorys(function (result) {
            if (result.success) {
                wishlistTop.init(result.data.HeadPortrait, result.data.NickName, result.data.WishlistCategoryCount, result.data.WishlistCount);

                $('.wh-action,.right').hide();
                $('.wishlist-area').hide();
                $('.ws-collection').show();

                if (result.data.Categorys != null && result.data.Categorys.length > 0) {
                    var html = [];

                    for (var i = 0; i < result.data.Categorys.length; i++) {
                        var item = result.data.Categorys[i];

                        var img = smart.utility.generateImgUrl(item.Image, 300, 300);

                        html.push('<li class="list dis-ib pos-r" data-widget="dropdown">');
                        html.push('<a href="/wishlist/categorys/info?id=' + item.Id + '"><div class="zz"></div><div class="ws-name pos-a">');
                        html.push('<p class="name">' + item.Name + '</p><p class="number">' + item.WishlistCount + '个收藏</p></div></a>');
                        html.push('<div class="sj pos-a" data-role="dropBox"><div class="sj-cd pos-a">');
                        html.push('<ul><li><a href="javascript:;" data-id="' + item.Id + '" data-name="' + item.Name + '" class="edit editWishlistCategory"><i class="icon iconfont">&#xe619;</i>编辑</a></li>');
                        html.push('<li><a href="javascript:;" class="deleteWishlistCategory" data-id="' + item.Id + '"><i class="icon iconfont">&#xe618;</i>删除</a></li></ul>');
                        html.push('</div></div><img src="' + img + '" onerror="javascript:this.src=\'' + smart.utility.generateDefaultImgUrl(300, 300) + '\'" /></li>');
                    }

                    $('.ws-collection ul').html(html.join(''));
                } else {
                    $('.wh-action').hide();
                    $('.ws-collection ul').hide();
                    $('.ws-collection').hide();
                    $('#noWishlist').show();
                }
            }
        });
    },
    binding: function () {
        $(document).on("click", '.add , .ws-house span,.ws-collection .edit', function () {
            $('#wishlistTitle').text('创建新的Wishlist单');
            $('#hidWishlistCategoryId').val('');
            $('#txtWishlistCategoryName').val('');
            $('#error').html('');
            $(".ws-tc").show();
        });
        $(".icon , .btn-qx").click(function () {
            $(".ws-tc").hide();
        });
        $('#btnSaveWishlitCategory').click(function () {
            wishlistCategorys.save();
        });
        $(document).on("click", '.ws-collection .sj', function () {
            $(this).find('.sj-cd').show();
        });
        $(document).on("mouseleave", '.sj-cd ul', function () {
            $(this).parents('.sj-cd').fadeOut();
        });
        $(document).on("mouseenter", '.ws-collection li', function () {
            $(this).find('.sj').fadeIn();
        });
        $(document).on("mouseleave ", '.ws-collection li', function () {
            $(this).find('.sj').fadeOut();
        });
        $(document).on("click", ".editWishlistCategory", function () {
            wishlistCategorys.edit(this);
        });
        $(document).on("click", ".deleteWishlistCategory", function () {
            wishlistCategorys.remove(this);
        });
        $("#tabWishlistCategory").css('color', '#080606');
        $(document).on("click", '.move-area .dropdown-toggle', function () {
            $(this).parent().parents('li').siblings().find('.dropdown-menu').fadeOut();
        });
    },
    init: function () {
        wishlistCategorys.bindData();
        wishlistCategorys.binding();
    }
};

//wishlist单详细
var wishlistCategoryInfo = {
    config: {
        id: $.utility.querystring('id'),
        pageIndex: 1,
        pageSize: 20,
        keyword: ''
    },
    interacts: {
        dropMenu: {
            init: function () {
                this.wishlistArea = $('.wishlist-area');
                this.initEvents();
            },
            initEvents: function () {
                this.wishlistArea.on('click', '.move-area .dropdown-toggle', $.proxy(this.show, this));
            },
            show: function (e) {
                var currEle = e.currentTarget;
                if (!$(currEle).siblings('.dropdown-menu').is(":animated")) {
                    $(currEle).siblings('.dropdown-menu').slideToggle();
                }
            }
        },
        //waterfall: {
        //    init: function () {
        //        this.wishlistArea = $('.wishlist-area');
        //        this.initEvents();
        //    },
        //    initEvents: function () {
        //        $(window).on('scroll', $.proxy(this.addItem, this));
        //    },
        //    addItem: function () {
        //        var self = this;
        //        var wishlistLastLiTop = self.wishlistArea.find('>li:last').offset().top;
        //        var scrollTop = $(window).scrollTop() + $(window).height() / 2;
        //        if (scrollTop > wishlistLastLiTop) {
        //            wishlistCategoryInfo.bindData();
        //        }
        //    }
        //},
        checkboxSelect: {
            init: function () {
                this.all = $('#all');
                this.wishlistArea = $('.wishlist-area');
                this.initEvents();
            },
            initEvents: function () {
                this.setData();
                this.all.on('click', $.proxy(this.allSelect, this));
            },
            setData: function () {
                this.all.data('sign', '1');
            },
            allSelect: function () {
                var self = this;
                var sign = self.all.data('sign');
                if (sign == '1') {
                    self.all.removeData('sign');
                    self.wishlistArea.find('.slectbox').prop('checked', true);
                } else {
                    self.setData();
                    self.inverseSelect();
                }

            },
            inverseSelect: function () {
                var self = this;
                self.wishlistArea.find('.slectbox').prop('checked', false);
            }
        },
        dropdownToggle: function () {
            $(document).on("click", '.move-area .dropdown-toggle', function () {
                $(this).parent().parents('li').siblings().find('.dropdown-menu').fadeOut();
            });
        },
        binding: function () {
            $(document).on("click", '.add , .ws-house span,.ws-collection .edit', function () {
                wishlistCategoryInfo.edit();
            });
            $(".icon , .btn-qx").click(function () {
                $(".ws-tc").hide();
            });
            $('#btnSaveWishlitCategory').click(function () {
                wishlistCategorys.save();
            });
            $('#removeWishlist').click(function () {
                wishlistCategoryInfo.remove('');
            });
            $('.search-img').click(function () {
                wishlistTop.search();
            });
            $(document).on('click', '.addcart', function () {
                var state = $(this).attr('data-State');
                var Enabled = state.split('_');
                if (!Enabled[0] || Enabled[1] == 1) {
                    var sku = $(this).attr('data-sku');
                    if (!$(sku).isNullOrEmpty(true))
                        $.utility.products.addCart(sku, 1);
                    else
                        smart.utility.tips.alert('加入购物车失败');
                }
            });
            $.utility.onEnterEvents($('#txtWishlistKeyword'), function () {
                wishlistTop.search();
            });
        }
    },
    edit: function () {
        var name = escape($('#categoryName').text());
        var id = $('#categoryName').attr('data-id');

        if ($(id).isNullOrEmpty(true) || $.utility.isNullOrEmpty(name)) {
            smart.utility.tips.alert('编辑失败');
            return;
        }

        $('#hidWishlistCategoryId').val(id);
        name = unescape(name);
        $('#txtWishlistCategoryName').val(name);
        $('#wishlistTitle').text('编辑Wishlist单');
        $('#error').html('');
        $(".ws-tc").show();
    },
    remove: function (id) {
        smart.utility.tips.confirm('确定删除么？', function () {
            var ids = '';
            if ($(id).isNullOrEmpty(true)) {
                $('.slectbox').each(function () {
                    if ($(this).prop('checked'))
                        ids += $(this).val() + ',';
                });

                //if (!$(ids).isNullOrEmpty(true))
                //    ids = ids.substr(0, ids.length - 1);
            } else
                ids = id;

            if (ids == "") {
                smart.utility.tips.alert('请选择需要删除的wishlist');
                return;
            }

            wishlistApis.delWishlist(ids, function (r) {
                if (r.success)
                    window.location.reload();
                else
                    smart.utility.tips.alert('删除失败');
            });
        });
    },
    slectbox: function () {
        $("input[name='slectbox']").click(function () {
            var state = true;
            $("input[name='slectbox']").each(function () {
                if (!$(this).is(':checked')) {
                    state = false;
                }
            });
            if (state) {
                $('#all').prop('checked', true);
                $('#all').removeData('sign');
            }
            else {
                $('#all').prop('checked', false);
                $('#all').data('sign', '1');
            }
        });
    },
    move: function (id, categoryId) {
        wishlistApis.move(id, categoryId, function (r) {
            if (r.success)
                window.location.reload();
            else
                smart.utility.tips.alert('操作失败');
        });
    },
    bindData: function () {
        wishlistApis.getCategory(wishlistCategoryInfo.config.id, wishlistCategoryInfo.config.keyword, wishlistCategoryInfo.config.pageIndex, wishlistCategoryInfo.config.pageSize, function (result) {
            if (result.success) {
                $('#categoryName').html(result.data.Name);
                $('#categoryName').attr('data-id', result.data.Id);
                $('#userNickName').html(result.data.NickName + '’S WISHLIST');
                $('#wishlistCount').html(result.data.WishlistCount + '个收藏');

                if (result.data.Wishlists != null && result.data.Wishlists.length > 0) {
                    var categorys = result.data.Categorys != null && result.data.Categorys.length > 0 ? result.data.Categorys : null;
                    var html = [];
                    for (var i = 0; i < result.data.Wishlists.length; i++) {
                        var item = result.data.Wishlists[i];

                        html.push('<li ' + (item.IsExpired || item.OnSale == 2 ? 'class="fail-area" ' : '') + '>');
                        html.push('<a href="' + (item.IsExpired || item.OnSale == 2 ? '' : item.Url) + '">');
                        var img = item.Image;
                        if (item.WishlistType == 1)
                            img = smart.utility.generateImgUrl(item.Image, 320, 320);

                        html.push('<img class="product-img" src="' + img + '" alt="" onerror="javascript:this.src=\'' + smart.utility.generateDefaultImgUrl(320, 320) + '\'"></a>');

                        if (item.IsExpired || item.OnSale == 2) {
                            html.push('<img class="fail-img" src="/Assets/themes/default/image/wishlist/fail.png">');
                        }
                        html.push('<div class="rside">');
                        html.push('<h3 class="title">' + item.Title + '</h3>');
                        if (item.Price != item.OldPrice) {
                            if (item.WishlistType == 1) {
                                html.push('<em class="pos-a del">￥' + item.OldPrice + '</em>');
                            }
                            html.push('<input type="checkbox" name="slectbox" class="slectbox" value="' + item.Id + '">');
                            html.push('<div>');
                            html.push('<p class="desc dis-ib">' + item.Intro + '</p>');
                            if (item.WishlistType == 1) {
                                html.push('<p class="ins dis-ib"><span>￥</span>' + item.Price + '</p>');
                            }
                            html.push('</div>');
                        } else {
                            if (item.WishlistType == 1) {
                                html.push('<em class="price">￥' + item.Price + '</em>');
                            }
                            html.push('<input type="checkbox" name="slectbox" class="slectbox" value="' + item.Id + '">');
                            html.push('<p class="desc">' + item.Intro + '</p>');
                        }
                        if (item.WishlistType == 1) {
                            html.push('<a class="tag" href="' + (item.IsExpired || item.OnSale == 2 ? '' : item.Url) + '">' + item.ProductState + '</a>');
                        }
                        html.push('<div class="add-wishlist">');
                        if (item.WishlistType == 1) {
                            html.push('<button data-sku="' + item.Sku + '" data-State="' + item.IsExpired + '_' + item.OnSale + '" class="btn addcart">加入购物车</button>');
                        }
                        html.push('</div><div class="action-area">');
                        html.push('<span class="date">添加日期：' + item.CreateTime + '</span>');
                        html.push('<ul class="move-area"><li>');
                        if (categorys != null) {
                            html.push('<a href="javascript:;" class="dropdown-toggle">移动到<i class="icon iconfont">&#xe60b;</i></a>');
                        }
                        html.push('<ul class="dropdown-menu">');

                        if (categorys != null) {
                            for (var j = 0; j < categorys.length; j++) {
                                html.push('<li><a href="javascript:wishlistCategoryInfo.move(\'' + item.Id + '\',\'' + categorys[j].Id + '\');">' + categorys[j].Name + '</a></li>');
                            }
                        }

                        html.push('</ul></li></ul>');
                        html.push('<button class="delete" onclick="wishlistCategoryInfo.remove(\'' + item.Id + '\');">删 除</button>');
                        html.push('</div></div></li>');
                    }
                    if (wishlistCategoryInfo.config.pageIndex == 1)
                        $('.wishlist-area').html(html.join(''));
                    else
                        $('.wishlist-area').append(html.join(''));
                } else {
                    $('#WishlistSearch').show();
                    $('.wh-action, .right').hide();
                    //if (wishlistCategoryInfo.config.pageIndex == 1) {
                    //    $('.wh-action').hide();
                    //    $('.wishlist-area').hide();
                    //    $('.ws-collection').hide();
                    //    $('#noWishlist').show();
                    //}
                }
            }
            wishlistCategoryInfo.slectbox();
        });
    },
    init: function () {
        wishlistCategoryInfo.bindData();
        waterfallFolw.init(wishlistCategoryInfo.bindData);
        wishlistCategoryInfo.interacts.dropMenu.init();
        wishlistCategoryInfo.interacts.checkboxSelect.init();
        wishlistCategoryInfo.interacts.dropdownToggle();
        //wishlistCategoryInfo.interacts.waterfall.init();
        wishlistCategoryInfo.interacts.binding();
    }
};

var wishlistSearch = {
    config: {
        pageIndex: 1,
        pageSize: 20,
        keyword: $.utility.querystring('keyword')
    },
    interacts: {
        dropMenu: {
            init: function () {
                this.wishlistArea = $('.wishlist-area');
                this.initEvents();
            },
            initEvents: function () {
                this.wishlistArea.on('click', '.move-area .dropdown-toggle', $.proxy(this.show, this));
            },
            show: function (e) {
                var currEle = e.currentTarget;
                if (!$(currEle).siblings('.dropdown-menu').is(":animated")) {
                    $(currEle).siblings('.dropdown-menu').slideToggle();
                }
            }
        },
        checkboxSelect: {
            init: function () {
                this.all = $('#all');
                this.wishlistArea = $('.wishlist-area');
                this.initEvents();
            },
            initEvents: function () {
                this.setData();
                this.all.on('click', $.proxy(this.allSelect, this));
            },
            setData: function () {
                this.all.data('sign', '1');
            },
            allSelect: function () {
                var self = this;
                var sign = self.all.data('sign');
                if (sign == '1') {
                    self.all.removeData('sign');
                    self.wishlistArea.find('.slectbox').prop('checked', true);
                } else {
                    self.setData();
                    self.inverseSelect();
                }
            },
            inverseSelect: function () {
                var self = this;
                self.wishlistArea.find('.slectbox').prop('checked', false);
            }
        },
        dropdownToggle: function () {
            $(document).on("click", '.move-area .dropdown-toggle', function () {
                $(this).parent().parents('li').siblings().find('.dropdown-menu').fadeOut();
            });
        },
        binding: function () {
            $(document).on("click", '.add , .ws-house span,.ws-collection .edit', function () {
                $('#wishlistTitle').text('创建新的Wishlist单');
                $('#hidWishlistCategoryId').val('');
                $('#txtWishlistCategoryName').val('');
                $(".ws-tc").show();
            });
            $(".icon , .btn-qx").click(function () {
                $(".ws-tc").hide();
            });
            $('#btnSaveWishlitCategory').click(function () {
                wishlistCategorys.save();
            });
            $('#removeWishlist').click(function () {
                wishlistSearch.remove('');
            });
            $('.search-img').click(function () {
                wishlistTop.search();
            });
            $(document).on('click', '.addcart', function () {
                var state = $(this).attr('data-State');
                var Enabled = state.split('_');
                if (!Enabled[0] || Enabled[1] == 1) {
                    var sku = $(this).attr('data-sku');
                    if (!$(sku).isNullOrEmpty(true))
                        $.utility.products.addCart(sku, 1);
                    else
                        smart.utility.tips.alert('加入购物车失败');
                }
            });
            $.utility.onEnterEvents($('#txtWishlistKeyword'), function () {
                wishlistTop.search();
            });
        }
    },
    bindData: function () {
        wishlistApis.search(wishlistSearch.config.keyword, wishlistSearch.config.pageIndex, wishlistSearch.config.pageSize, function (result) {
            var Keywords = result.data.Keyword;
            if (result.data.Total > 0) {
                if (Keywords.length > 10) {
                    Keywords = Keywords.substring(0, 10) + "...";
                }
                $('.tips').html('共搜到' + result.data.Total + '条和“' + Keywords + '”相关的结果');
            }

            if (result.data.Wishlists != null && result.data.Wishlists.length > 0) {
                var categorys = result.data.Categorys != null && result.data.Categorys.length > 0 ? result.data.Categorys : null;
                var html = [];
                for (var i = 0; i < result.data.Wishlists.length; i++) {
                    var item = result.data.Wishlists[i];

                    html.push('<li ' + (item.IsExpired || item.OnSale == 2 ? 'class="fail-area" ' : '') + '>');
                    html.push('<a href="' + (item.IsExpired || item.OnSale == 2 ? '' : item.Url) + '">');
                    var img = item.Image;
                    if (item.WishlistType == 1)
                        img = smart.utility.generateImgUrl(item.Image, 320, 320);

                    html.push('<img class="product-img" src="' + img + '" alt="" onerror="javascript:this.src=\'' + smart.utility.generateDefaultImgUrl(320, 320) + '\'"></a>');

                    if (item.IsExpired || item.OnSale == 2) {
                        html.push('<img class="fail-img" src="/Assets/themes/default/image/wishlist/fail.png">');
                    }
                    html.push('<div class="rside">');
                    html.push('<h3 class="title">' + item.Title + '</h3>');
                    if (item.Price != item.OldPrice) {
                        if (item.WishlistType == 1) {
                            html.push('<em class="pos-a del">￥' + item.OldPrice + '</em>');
                        }
                        if (categorys != null) {
                            for (var j = 0; j < categorys.length; j++) {
                                if (item.CategoryId == categorys[j].Id) {
                                    html.push('<a href="/wishlist/categorys/info?id=' + categorys[j].Id + '" class="wish-house">' + categorys[j].Name + ' ></a>');
                                }
                            }
                        }
                        html.push('<div>');
                        html.push('<p class="desc dis-ib">' + item.Intro + '</p>');
                        if (item.WishlistType == 1) {
                            html.push('<p class="ins dis-ib"><span>￥</span>' + item.Price + '</p>');
                        }
                        html.push('</div>');
                    } else {
                        if (item.WishlistType == 1) {
                            html.push('<em class="price">￥' + item.Price + '</em>');
                        }
                        if (categorys != null) {
                            for (var j = 0; j < categorys.length; j++) {
                                if (item.CategoryId == categorys[j].Id) {
                                    html.push('<a href="/wishlist/categorys/info?id=' + categorys[j].Id + '" class="wish-house">' + categorys[j].Name + ' ></a>');
                                }
                            }
                        }
                        html.push('<p class="desc">' + item.Intro + '</p>');
                    }
                    if (item.WishlistType == 1) {
                        html.push('<a class="tag" href="' + (item.IsExpired || item.OnSale == 2 ? '' : item.Url) + '">' + item.ProductState + '</a>');
                    }
                    html.push('<div class="add-wishlist">');
                    if (item.WishlistType == 1) {
                        html.push('<button data-sku="' + item.Sku + '" data-State="' + item.IsExpired + '_' + item.OnSale + '" class="btn addcart">加入购物车</button>');
                    }
                    html.push('</div><div class="action-area">');
                    html.push('<span class="date">添加日期：' + item.CreateTime + '</span>');
                    html.push('<ul class="move-area"><li>');
                    if (categorys != null) {
                        html.push('<a href="javascript:;" class="dropdown-toggle">移动到<i class="icon iconfont">&#xe60b;</i></a>');
                    }
                    html.push('<ul class="dropdown-menu">');

                    if (categorys != null) {
                        for (var j = 0; j < categorys.length; j++) {
                            html.push('<li><a href="javascript:wishlistSearch.move(\'' + item.Id + '\',\'' + categorys[j].Id + '\');">' + categorys[j].Name + '</a></li>');
                        }
                    }

                    html.push('</ul></li></ul>');
                    html.push('<button class="delete" onclick="wishlistSearch.remove(\'' + item.Id + '\');">删 除</button>');
                    html.push('</div></div></li>');
                }
                $('.wishlist-area').html(html.join(''));
            } else {
                if (wishlistSearch.config.pageIndex == 1) {
                    $('.wh-action').hide();
                    $('.wishlist-area').hide();
                    $('.ws-collection').hide();
                    $('.no-seresult').show();
                    $('.searchBox-img').analysis();
                }
            }

            wishlistSearch.config.pageIndex++;
        });
    },
    remove: function (id) {
        smart.utility.tips.confirm('确定删除么？', function () {
            var ids = '';
            if ($(id).isNullOrEmpty(true)) {
                $('.slectbox').each(function () {
                    if ($(this).prop('checked'))
                        ids += $(this).val() + ',';
                });

                //if (!$(ids).isNullOrEmpty(true))
                //    ids = ids.substr(0, ids.length - 1);
            } else
                ids = id;

            wishlistApis.delWishlist(ids, function (r) {
                if (r.success)
                    window.location.reload();
                else
                    smart.utility.tips.alert('删除失败');
            });
        });
    },
    move: function (id, categoryId) {
        wishlistApis.move(id, categoryId, function (r) {
            if (r.success) {
                wishlistSearch.config.pageIndex = 1;
                wishlistSearch.config.pageSize = 20;
                wishlistSearch.config.categoryId = '';
                window.location.reload();
            } else
                smart.utility.tips.alert('操作失败');
        });
    },
    init: function () {
        wishlistSearch.bindData();
        waterfallFolw.init(wishlistSearch.bindData);
        wishlistSearch.interacts.dropMenu.init();
        wishlistSearch.interacts.checkboxSelect.init();
        wishlistSearch.interacts.dropdownToggle();
        //wishlistSearch.interacts.waterfall.init();
        wishlistSearch.interacts.binding();
    }
};