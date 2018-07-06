var wishlist = {
    //type:1商品2文章
    addWishlist: function (type, sku, callback) {
        $.utility.ajax('/Member/Wishlist/AddWishlist', { type: type, projectIds: sku }, callback);
    },
    deleteWishlist: function (type, id, callback) {
        $.utility.ajax('/Member/Wishlist/DeleteWishlist', { type: type, id: id }, callback);
    },
};