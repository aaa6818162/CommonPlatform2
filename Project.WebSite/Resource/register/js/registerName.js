$(function(){
    /************************  失焦判断  **********************************/
    $("#userphone").blur(function(){
        checkTel()
    });
    /********************** 聚焦提示 ************************/
    $("#userphone").focus(function(){
        if($(this).is("#userphone")){
            $(".spa2").text("请输入11位手机号码").css("color","#aaa");
            $(this).css("border","1px solid #6997d5")
        }

    });
    //手机号（）
    function checkTel() {
        if($("#userphone").val().length==0)
        {
            $(".spa2").text('手机号不能为空');
            $("#userphone").css("border","1px solid #e04444");
            $(".spa2").css("color","#e04444");
            return false;
        }
        var pattern=/^1[34578]\d{9}$/;
        if(!pattern.test($("#userphone").val()))
        {
            $(".spa2").text('手机号码格式错误，请重新输入');
            $("#userphone").css("border","1px solid #e04444");
            $(".spa2").css("color","#e04444");
            return false;
        }
        $(".spa2").text('手机号输入正确');
        $(".spa2").css("color","#5bdc63");
        return true;
    }


    /*点击倒计时*/
    var num = 60;
    var timer = null;
    $(".codeNum-btn").click(function (){
        this.disabled = true;
        timer = setInterval(function(){
            num--;
            $(".codeNum-btn").text(num + "秒后重新发送");
            if(num === 0){
                clearInterval(timer);
                num = 60;
                $(".codeNum-btn").text( "点击发送验证码");
                $(".codeNum-btn").disabled=false;
            }
        },1000)
    });
    $(".close-code").click(function(){
        $(".verification-code").hide();
    });




    /*滑动验证*/
    $("#slider1").slider({
        callback: function(result) {
            var data=result;
            /*console.log(data)*/
        }
    });
});


