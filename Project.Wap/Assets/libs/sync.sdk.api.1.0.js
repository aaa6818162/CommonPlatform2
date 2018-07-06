var logistics = {
    freeLogistice: function (province, city, country, callback, sync, err) {
        return $sync.client.query('DeliveryFree', 'Logistics', '1.0', {
            Province: province,
            City: city,
            Country: country
        }, callback, sync, err);
    }
}
var cart = {
    add: function (Sku, Quantity, SalesMark, callback, sync, err) {
        return $sync.client.query("addcart", "cart", "1.0", {
            Sku: Sku,
            Quantity: Quantity,
            SalesMark: SalesMark
        }, callback, sync, err);
    },
    changeQuantity: function (Sku, Quantity, SalesMark, callback, sync, err) {
        return $sync.client.query('changequantity', 'cart', '1.0', {
            Sku: Sku,
            Quantity: Quantity,
            SalesMark: SalesMark
        }, callback, sync, err);
    },
    remove: function (Sku, Quantity, SalesMark, callback, sync, err) {
        return $sync.client.query('remove', 'cart', '1.0', {
            Sku: Sku,
            Quantity: Quantity,
            SalesMark: SalesMark
        }, callback, sync, err);
    },
    getCart: function (callback, sync, err) {
        return $sync.client.query('getcart', 'cart', '1.0', {}, callback, sync, err);
    },
    asyncCart: function (CartPrdRowList, callback, sync, err) {
        return $sync.client.query('asynccart', 'cart', '1.0', {
            CartPrdRowList: CartPrdRowList
        }, callback, sync, err);
    },
    changeCartCheck: function (CartPrdRowList, callback, sync, err) {
        return $sync.client.query('changeCartCheck', 'cart', '1.0', {
            CartPrdRowList: CartPrdRowList
        }, callback, sync, err);
    },
    submitCart: function (data, callback, sync, err) {
        return $sync.client.query('submitcart', 'cart', '1.0', data, callback, sync, err);
    },
    changeCartProduct: function (OldSku, NewSku, Quantity, callback, sync, err) {
        return $sync.client.query('changecartproduct', 'cart', '1.0', {
            OldSku: OldSku,
            NewSku: NewSku,
            Quantity: Quantity
        }, callback, sync, err);
    },
    isCartEditable: function (Sku, SalesMark, callback, sync, err) {
        return $sync.client.query('iscarteditable', 'cart', '1.0', {
            Sku: Sku,
            SalesMark: SalesMark
        }, callback, sync, err);
    }
};
var customer = {
    regedit: function (account, password, pwdLevel, inviteMobile, source, callback, sync, err) {
        return $sync.client.query("register", "customer", "1.0", {
            account: account,
            password: password,
            pwdLevel: pwdLevel,
            InviteMobilephone: inviteMobile,
            Source: source  //来源可不传
        }, callback, sync, err);
    },
    update: function (data, callback, sync, err) {
        return $sync.client.query("update", "customer", "1.0", data, callback, sync, err);
    },
    updateHeadPortrait: function (headPortrait, callback, sync, err) {
        return $sync.client.query("updateheadportrait", "customer", "1.0", { headPortrait: headPortrait }, callback, sync, err);
    },
    findPassword: function (data, callback, sync, err) {
        return $sync.client.query('findpassword', 'customer', '1.0', data, callback, sync, err);
    },
    checkAccount: function (account, callback, sync, err) {
        return $sync.client.query("checkaccount", "customer", "1.0", { account: account }, callback, sync, err);
    },
    checkNickName: function (nickName, callback, sync, err) {
        return $sync.client.query('checknickname', 'customer', '1.0', { nickName: nickName }, callback, sync, err);
    },
    checkEmail: function (email, callback, sync, err) {
        return $sync.client.query('checkemail', 'customer', '1.0', { email: email }, callback, sync, err);
    },
    checkMobile: function (mobile, callback, sync, err) {
        return $sync.client.query('checkmobile', 'customer', '1.0', { mobile: mobile }, callback, sync, err);
    },
    checkCard: function (cardNo, callback, sync, err) {
        return $sync.client.query('checkcard', 'customer', '1.0', { cardNo: cardNo }, callback, sync, err);
    },
    checkCardMobile: function (cardNo, mobile, callback, sync, err) {
        return $sync.client.query('checkcardmobile', 'customer', '1.0', { cardNo: cardNo, mobile: mobile }, callback, sync, err);
    },
    checkCardName: function (cardNo, name, callback, sync, err) {
        return $sync.client.query('checkcardname', 'customer', '1.0', { cardNo: cardNo, name: name }, callback, sync, err);
    },
    bindCard: function (cardNo, mobile, name, callback, sync, err) {
        return $sync.client.query('bindcard', 'customer', '1.0', { cardNo: cardNo, mobile: mobile, name: name }, callback, sync, err);
    },
    bindCardByMobile: function (cardNo, mobile, callback, sync, err) {
        return $sync.client.query('bindcardbymobile', 'customer', '1.0', { cardNo: cardNo, mobile: mobile }, callback, sync, err);
    },
    checkTBAccount: function (tbAcc, callback, sync, err) {
        return $sync.client.query('checktaobaoaccount', 'customer', '1.0', { taobaoAccount: tbAcc }, callback, sync, err);
    },
    checkTBTradeNo: function (tbAcc, tradeNo, mobile, callback, sync, err) {
        return $sync.client.query('checktaobaotradeno', 'customer', '1.0', { Account: tbAcc, TradeNo: tradeNo, Mobile: mobile }, callback, sync, err);
    },
    bindTBAccount: function (tbAcc, tradeNo, mobile, callback, sync, err) {
        return $sync.client.query('bindtaobaoaccount', 'customer', '1.0', { Account: tbAcc, TradeNo: tradeNo, Mobile: mobile }, callback, sync, err);
    },
    bindTBAccountByMobile: function (nickName, mobile, callback, sync, err) {
        return $sync.client.query('bindTaobaoAccountByMobile', 'customer', '1.0', { NickName: nickName, Mobile: mobile }, callback, sync, err);
    },
    unbindTBAccount: function (tbAcc, callback, sync, err) {
        return $sync.client.query('unbindtaobaoaccount', 'customer', '1.0', { taobaoaAccount: tbAcc }, callback, sync, err);
    },
    checkPassword: function (password, callback, sync, err) {
        return $sync.client.query('checkpassword', 'customer', '1.0', { password: password }, callback, sync, err);
    },
    changePassword: function (password, newPassword, pwdLevel, callback, sync, err) {
        return $sync.client.query('changepassword', 'customer', '1.0', { password: password, newPassword: newPassword, PasswordLevel: pwdLevel }, callback, sync, err);
    },
    bindMobile: function (mobile, smsCode, callback, sync, err) {
        return $sync.client.query('bindmobile', 'customer', '1.0', { mobile: mobile, smsCode: smsCode }, callback, sync, err);
    },
    changeMobile: function (mobile, smsCode, callback, sync, err) {
        return $sync.client.query('changemobile', 'customer', '1.0', { mobile: mobile, smsCode: smsCode }, callback, sync, err);
    },
    unbindMobile: function (mobile, smsCode, callback, sync, err) {
        return $sync.client.query('unbindmobile', 'customer', '1.0', { mobile: mobile, smsCode: smsCode }, callback, sync, err);
    },
    bindEmail: function (email, verCode, callback, sync, err) {
        return $sync.client.query('bindemail', 'customer', '1.0', { email: email, verifyCode: verCode }, callback, sync, err);
    },
    changeEmail: function (email, verCode, callback, sync, err) {
        return $sync.client.query('changeemail', 'customer', '1.0', { email: email, verifyCode: verCode }, callback, sync, err);
    },
    unbindEmail: function (email, verCode, callback, sync, err) {
        return $sync.client.query('unbindemail', 'customer', '1.0', { email: email, verifyCode: verCode }, callback, sync, err);
    },
    saveDeliverAddress: function (data, callback, sync, err) {
        return $sync.client.query('savedeliveraddress', 'customer', '1.0', data, callback, sync, err);
    },
    delDeliverAddress: function (addressId, callback, sync, err) {
        return $sync.client.query('deldeliveraddress', 'customer', '1.0', { deliverAddressId: addressId }, callback, sync, err);
    },
    defaultDeliverAddress: function (addressId, callback, sync, err) {
        return $sync.client.query('defaultdeliveraddress', 'customer', '1.0', { deliverAddressId: addressId }, callback, sync, err);
    },
    addCollect: function (data, callback, sync, err) {
        return $sync.client.query('addcollect', 'customer', '1.0', data, callback, sync, err);
    },
    deleteCollect: function (ids, callback, sync, err) {
        return $sync.client.query('deletecollect', 'customer', '1.0', { Ids: ids }, callback, sync, err);
    },
    setMessageRead: function (ids, callback, sync, err) {
        return $sync.client.query('setmessageread', 'customer', '1.0', { Ids: ids }, callback, sync, err);
    },
    deleteMessage: function (ids, callback, sync, err) {
        return $sync.client.query('deletemessage', 'customer', '1.0', { Ids: ids }, callback, sync, err);
    },
    addSaDesiner: function (data, callback, sync, err) {
        return $sync.client.query('addsadesiner', 'customer', '1.0', data, callback, sync, err);
    },
    addCatalogApplication: function (data, callback, sync, err) {
        return $sync.client.query('addcatalogapplication', 'customer', '1.0', data, callback, sync, err);
    }
};
var tickets = {
    getRuleInfo: function (data, callback, sync, err) {
        return $sync.client.query('GetRuleInfo', 'tickets', '1.0', data, callback, sync, err);
    },
    isObtainTicket: function (data, callback, sync, err) {
        return $sync.client.query('IsObtainTicket', 'tickets', '1.0', data, callback, sync, err);
    },
    obtainTicket: function (data, callback, sync, err) {
        return $sync.client.query('ObtainTicket', 'tickets', '1.0', data, callback, sync, err);
    }
};
var interact = {
    //dataIsPush: function (key, callback, sync, err) {
    //    return $sync.client.query('dataispush', 'interact', '1.0', { key: key }, callback, sync, err);
    //},
    sendVerifyCode: function (data, callback, sync, err) {
        return $sync.client.query('SendVerifyCode', 'interact', '1.0', data, callback, sync, err);
    },
    checkVerifyCode: function (data, callback, sync, err) {
        return $sync.client.query('CheckVerifyCode', 'interact', '1.0', data, callback, sync, err);
    }
};
var order = {
    stockCheckAll: function (AddressId, Delivery, DeliveryDate, callback, sync, err) {
        return $sync.client.query('cartStockCheckAll', 'order', '1.0', {
            AddressId: AddressId,
            Delivery: Delivery,
            DeliveryDate: DeliveryDate
        }, callback, sync, err);
    },
    countRowPrice: function (ShopCardId, TikCode, Discount, callback, sync, err) {
        return $sync.client.query('countrowprice', 'order', '1.0', {
            ShopCardId: ShopCardId,
            TikCode: TikCode,
            Discount: Discount
        }, callback, sync, err);
    },
    submitOrder: function (data, callback, sync, err) {
        return $sync.client.query('submitorder', 'order', '1.0', data, callback, sync, err);
    },
    getPromotionInfo: function (data, callback, sync, err) {
        return $sync.client.query('getpromotioninfo', 'order', '1.0', data, callback, sync, err);
    },
    getPromotionInfoNext: function (data, callback, sync, err) {
        return $sync.client.query('getpromotioninfonext', 'order', '1.0', data, callback, sync, err);
    },
    getGiftListBySku: function (data, callback, sync, err) {
        //TODO:getGiftListBySku不存在，是否有存在引用？是否实现？---zxt
        return $sync.client.query('getGiftListBySku', 'order', '1.0', data, callback, sync, err);
    },
    checkGiftBySkus: function (data, callback, sync, err) {
        //TODO:checkGiftBySkus不存在，是否有存在引用？是否实现？---zxt
        return $sync.client.query('checkGiftBySkus', 'order', '1.0', data, callback, sync, err);
    },
    addGift: function (data, callback, sync, err) {
        return $sync.client.query('addgift', 'order', '1.0', data, callback, sync, err);
    },
    getOrderConfirmView: function (callback, sync, err) {
        return $sync.client.query('getorderconfirmview', 'order', '1.0', null, callback, sync, err);
    },
    ifHasShop: function (AddressId, callback, sync, err) {
        return $sync.client.query('IfHasShop', 'order', '1.0', { AddressId: AddressId }, callback, sync, err);
    },
    shoppingCartInfo: function (AddressId, callback, sync, err) {
        return $sync.client.query('ShoppingCartInfo', 'order', '1.0', { AddressId: AddressId }, callback, sync, err);
    },
    getIsNeedInstall: function (AddressId, deliveryCode, callback, sync, err) {
        return $sync.client.query('GetIsNeedInstall', 'order', '1.0', { AddressId: AddressId, deliveryCode: deliveryCode }, callback, sync, err);
    },
    getGiftView: function (OrderNo, callback, sync, err) {
        return $sync.client.query('getgiftview', 'order', '1.0', { OrderNo: OrderNo }, callback, sync, err);
    },
    returnMoneyOrGood: function (orderNo, orderId, callback, sync, err) {
        return $sync.client.query('returnMoneyOrGood', 'order', '1.0', { OrderNo: orderNo, OrderChildDetailId: orderId }, callback, sync, err);
    },
    getOrderAuditView: function (auditId, orderNo, orderChildId, callback, sync, err) {
        return $sync.client.query('getOrderAuditView', 'order', '1.0', { AuditId: auditId, OrderChildNo: orderNo, OrderChildDetailId: orderChildId }, callback, sync, err);
    },
    applyReturnMoney: function (orderNo, orderId, reason, quantity, remark, pictures, callback, sync, err) {
        return $sync.client.query('applyReturnMoney', 'order', '1.0', { OrderNo: orderNo, OrderChildDetailId: orderId, ReturnReason: reason, Quantity: quantity, Remark: remark, PictureUrls: pictures }, callback, sync, err);
    },
    applyReturnGood: function (orderNo, orderId, reason, quantity, remark, pictures, callback, sync, err) {
        return $sync.client.query('applyReturnGood', 'order', '1.0', { OrderNo: orderNo, OrderChildDetailId: orderId, ReturnReason: reason, Quantity: quantity, Remark: remark, PictureUrls: pictures }, callback, sync, err);
    },
    changeReturnMoney: function (orderNo, auditId, reason, quantity, remark, pictures, callback, sync, err) {
        return $sync.client.query('changeReturnMoney', 'order', '1.0', { OrderNo: orderNo, AuditId: auditId, ReturnReason: reason, Quantity: quantity, Remark: remark, PictureUrls: pictures }, callback, sync, err);
    },
    changeReturnGood: function (orderNo, auditId, reason, quantity, remark, pictures, callback, sync, err) {
        return $sync.client.query('changeReturnGood', 'order', '1.0', { OrderNo: orderNo, AuditId: auditId, ReturnReason: reason, Quantity: quantity, Remark: remark, PictureUrls: pictures }, callback, sync, err);
    },
    waitCustomerReturnGood: function (auditId, logisticsName, logisticsNo, logisticsExplan, pictures, callback, sync, err) {
        return $sync.client.query('waitCustomerReturnGood', 'order', '1.0', { AuditId: auditId, LogisticsNames: logisticsName, LogisticsNumber: logisticsNo, LogisticsExplanation: logisticsExplan, LogisticsPictures: pictures }, callback, sync, err);
    },
    cancelReturnMoney: function (auditId, callback, sync, err) {
        return $sync.client.query('cancelReturnMoney', 'order', '1.0', { AuditId: auditId }, callback, sync, err);
    },
    cancelReturnGood: function (auditId, callback, sync, err) {
        return $sync.client.query('cancelReturnGood', 'order', '1.0', { AuditId: auditId }, callback, sync, err);
    },
    changeOrderDeliveryInfo: function (data, callback, sync, err) {
        return $sync.client.query('changeorderdeliveryinfo', 'order', '1.0', data, callback, sync, err);
    },
    confrimOrderRecive: function (OrderNo, callback, sync, err) {
        return $sync.client.query('confrimorderrecive', 'order', '1.0', { OrderNo: OrderNo }, callback, sync, err);
    },
    cancelOrder: function (OrderNo, callback, sync, err) {
        return $sync.client.query('cancelorder', 'order', '1.0', { OrderNo: OrderNo }, callback, sync, err);
    },
    isNeedSendZp: function (OrderNo, callback, sync, err) {
        return $sync.client.query('isneedsendzp', 'order', '1.0', { OrderNo: OrderNo }, callback, sync, err);
    }
};
var payment = {
    confirmPay: function (OrderNo, PayCode, callback, sync, err) {
        return $sync.client.query('confirmpay', 'payment', '1.0', {
            OrderNo: OrderNo,
            PayCode: PayCode
        }, callback, sync, err);
    },
    checkPay: function (OrderNo, PayCode, callback, sync, err) {
        //TODO:checkpay不存在，是否有存在引用？是否实现？---zxt
        return $sync.client.query('checkpay', 'payment', '1.0', {
            OrderNo: OrderNo,
            PayCode: PayCode
        }, callback, sync, err);
    }
};
var activity = {
    sapInfo: function (sku, callback, sync, err) {
        return $sync.client.query('GetSapInfo', 'activity', '1.0', { Sku: sku }, callback, sync, err);
    }
};