(function () {
    $(function () {
        //手机号输入框正则验证
        var regTel = /^(0|86|17951)?(13[0-9]|15[012356789]|17[0678]|18[0-9]|14[57])[0-9]{8}$/;
        var regCode = /^\d{4}$/;
        //判断变量
        var timeCount = 60;
        var telTrue = false;
        var codeTrue = false;
        var requestBoo = false;
        $('#userTel').on('keyup', function () {
            telTrue = regTel.test($(this).val());
            telTrue ? $(this).next('p').hide() : $(this).next('p').show();
        });
        //验证码输入框验证
        $('#idenCode').on('keyup', function () {
            codeTrue = regCode.test($(this).val());
            codeTrue ? $(this).next('p').hide() : $(this).next('p').show();
        });
        //获取验证码
        $('#getCode').on('click', function () {
            if (!telTrue) {
                $('#userTel').next('p').show();
                $('#userTel').focus();
                return false;
            } else {
                //输入正确手机号逻辑书写位置
                $.ajax({
                    url: getPort() + 'sendVCode',
                    type: 'POST',
                    dataType:'json',
                    data: { 'phoneNum': $('#userTel').val() },
                    success: function (data) {
                        console.log(data);
                        //用户未注册提示信息
                        if(data.statusCode == 0) {
                        	layer.open({
                                content: data.message
                                , skin: 'msg'
                                , time: 2 //2秒后自动关闭
                            });
                        	return false;
                        }
                        //获取验证码成功
                        if(data.statusCode == 1) {
                        	$('#getCode').attr('disabled', true);
                            var timer = setInterval(function () {
                                $('#getCode').text(timeCount-- + '后重新发送');
                            }, 1000);
                            setTimeout(function () {
                                clearInterval(timer);
                                $('#getCode').text('重新发送');
                                $('#getCode').attr('disabled', false);
                                timeCount = 60;
                            }, 60000);
                        	requestBoo = data.success;
                        }
                    }
                });
            }
        });
        //登录按钮
        $('#entry').on('click', function () {
            if (!telTrue || !codeTrue) {
                if (!telTrue) {
                    $('#userTel').next('p').show();
                    $('#userTel').focus();
                    return false;
                } else if (!codeTrue) {
                    $('#idenCode').next('p').show();
                    $('#idenCode').focus();
                    return false;
                }
            } else if (telTrue && codeTrue && requestBoo) {
                $.ajax({
                    url: getPort() + 'userLogin',
                    type: 'POST',
                    dataType: 'json',
                    data: {
                        'phoneNum': $('#userTel').val(),
                        'vCode': $('#idenCode').val()
                    },
                    //后台验证，返回Boolean，判断验证是否正确，书写逻辑,跳转网页；
                    success: function (data) {
                        console.log(data);
                        if (data.success && data.statusCode == 1) {
                            // alert(json.message);
                            //手机验证已通过；
                            setCookie("userId", data.obj.userId);
                            setCookie("userCode", data.obj.userCode);
                            setCookie("userName", data.obj.userName);
                            setCookie("userSex", data.obj.userSex);
                            setCookie("userMob", data.obj.userMob);
                            setCookie("userProvince", data.obj.userProvince);
                            setCookie("userRegion", data.obj.userRegion);
                            window.location.href = './pages/onePage.html';
                        } else if(data.statusCode == "0"){
                                layer.open({
                                    content: data.message
                                    , skin: 'msg'
                                    , time: 2 //2秒后自动关闭
                                });
                                window.self.location;
                        }
                    }
                });
            }
        });
    });
})();