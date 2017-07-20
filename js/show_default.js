(function () {
    $(function () {
        //选择日期，调用datePicker插件
        var date = new Date();
        var year = date.getFullYear();
        var month = date.getMonth();
        if(month == 0) {
        	month = 12;
        	year = year - 1;
        }
        month = month >= 10 ? month : '0' + month;
        $('#date_choose p').eq(0).find('.year').text(year);
        $('#date_choose p').eq(0).find('.month').text(month);
        var calendar = new datePicker();
        calendar.init({
            'trigger': '#date_choose', /*按钮选择器，用于触发弹出插件*/
            'type': 'ym',/*模式：date日期；datetime日期时间；time时间；ym年月；*/
            'minDate': '1900-1-1',/*最小日期*/
            'maxDate': '2100-12-31',/*最大日期*/
            'onSubmit': function () {/*确认时触发事件*/
                var theSelectData = calendar.value;
                var num = theSelectData.indexOf('-');
                //年
                var year = theSelectData.slice(0, num);
                //月
                var month = theSelectData.slice(num + 1);
                $('#date_choose p').eq(0).find('.year').text(year);
                $('#date_choose p').eq(0).find('.month').text(month);
                //重新渲染页面数据
                $('.show_content').hide();
                $('.show_list').show();
                getPushList(getPort() + 'selectHitDetailByuserId', { 'userId': getCookie('userId'), 'datatime': theSelectData });
            }
        });
        //冲击列表渲染        
        getPushList(getPort() + 'selectHitDetailByuserId', { 'userId': getCookie('userId'), 'datatime': '2017-' + month });
        // getPushList('../test/simple.json',{});
        //点击列表页进入详情页面
        $('.show_main').on('click', '.go_content', function () {
            //冲击明细渲染
            $('.show_content').show();
            $('.show_list').hide();
            getPushData(getPort() + 'selectHitDetailByRecordId', {'recordId':$(this).attr('recordId')});
        });
        //点击返回按钮
        $('#go_back').on('click', function () {
            $('.show_content').hide();
            $('.show_list').show();
        });
        //冲击列表
        function getPushList(url, data) {
            $.get(url, data, function (data) {
                console.log(data);
                if(data.statusCode == 1) {
                    //列表页面渲染
                    var str = '';
                    var list = data.list;
                    list.forEach(function (v, i) {
                        str += '<li>'
                            + '<a class="go_content" recordId="' + v.attId + '" href="javascript:;">'
                            + '<p><span>冲击方 ：</span><i class="pusher">' + v.attack.userName + '</i></p>'
                            + '<p><span>被冲击方 ：</span><i class="">' + v.beAttack.userName + '</i></p>'
                            + '<p><span>丹红密码 ： </span><i class="dCode">' + v.attPassword + '</i></p>'
                            + '<p><span>发货日期 ： </span><i class="addTime">' + formatDate(v.attDeliveryDate) + '</i></p>'
                            + '</a>'
                            + '</li>';
                    });
                    $('.show_list').html(str);
                }else if(data.statusCode == 0 || data.statusCode == 2) {
                    layer.open({
                        content: data.message
                        ,skin: 'msg'
                        ,time: 2 //2秒后自动关闭
                    });
                    $('.show_list').empty();
                }
            }, 'json');
        }
        //冲击明细
        function getPushData(url, data) {
            $.ajax({
                url: url,
                data: data,
                dataType: 'json',
                type: 'GET',
                success: function (data) {
                    console.log(data);
                    //页面详细信息的渲染；数据整理有点乱，后期实际数据要详细测试；
                    if(data.statusCode == 1) {
                        var res = data.obj;
                        $('b').remove();
                        $('.losher').html(res.attack.userName + '&nbsp;(<i>'+res.attack.userProvince+'</i>)');
                        $('.unLosher').html(res.beAttack.userName + '&nbsp;(<i>'+res.beAttack.userProvince+'</i>)');
                        $('.danhongCode').text(res.attPassword);
                        $('.bNumber').text(res.attBatchNumber);
                        $('.price').text(res.attPrice);
                        $('.buyNum').text(res.attBuyNumber);
                        $('.buyLocation').text(res.attBuyAddres == 1 ? '医院' : '药店');
                        $('.pushLosher p').eq(0).append('<b>' + res.attImpactMoney + '</b>');
                        $('.pushLosher p').eq(1).append('<b>' + res.attImpactNumber + '</b>');
                        $('.pushLosher p').eq(2).append('<b>' + res.attImpactTotalAmount + '</b>');
                        $('.approLosher p').eq(0).append('<b>' + res.attImpactedMoney + '</b>');
                        $('.approLosher p').eq(1).append('<b>' + res.attImpactedNumber + '</b>');
                        $('.approLosher p').eq(2).append('<b>' + res.attImpactedTotalAmount + '</b>');
                        $('.remark').text(res.attRemarks == '' ? '无' : res.attRemarks);
                        $('.issDate').html(formatDate(res.attDeliveryDate));
                        $('.issNum').text(res.attDeliveryNumber);
                        $('.issSpec').text(res.attDeliverySpec);
                        $('.takeGoods').text(res.attReceivingNnit);
                    }else if(data.statusCode == 2 || data.statusCode == 0) {
                        layer.open({
                        content: data.message
                        ,skin: 'msg'
                        ,time: 2 //2秒后自动关闭
                        });
                    } 
                }
            });
        }
        
        //时间格式化
        function formatDate(date) {
            if (date != null && date != "") {
                var d = new Date(date)
                    , month = '' + (d.getMonth() + 1)
                    , day = '' + d.getDate()
                    , year = '' + d.getFullYear()
                    , hour = '' + d.getHours()
                    , minute = '' + d.getMinutes()
                    , second = '' + d.getSeconds();
                if (month.length < 2) month = '0' + month;
                if (day.length < 2) day = '0' + day;
                if (hour.length < 2) hour = '0' + hour;
                if (minute.length < 2) minute = '0' + minute;
                if (second.length < 2) second = '0' + second;
                return [year, month, day].join('-') + '&nbsp;' + [hour, minute, second].join(':');
            }
            else {
                return null;
            }
        }
    });
})();