(function () {

    $(function () {
        //下拉加载
        //页数
        var page = 0;
        //每页展示5个
        var size = 10;
        //dropload
        $('.notice_list').dropload({
            scrollArea: window,
            loadDownFn: function (me) {
                page++;
                // 拼接HTML
                var result = '';
                $.ajax({
                    type: 'GET',
                    url: getPort() + 'getSysMsgList',
                    data: { pageNum: page, pageSize: size },
                    dataType: 'json',
                    success: function (data) {
                        console.log(data);
                        var list = data.list;
                        var arrLen = list.length;
                        if (arrLen > 0) {
                            list.forEach(function (v, i) {
                                result += '<li>'
                                    + '<a class="turnPage" sysbackId="' + v.sysbackId + '" href="javascript:;">'
                                    + '<h3>' + v.sysbackTitle + '</h3>'
                                    + '<p>' + v.sysbackAddby + '</p>'
                                    + '<p>' + formatDate(v.sysbackAddtime) + '</p>'
                                    + '</a>'
                                    + '</li>'
                            });
                            // 如果没有数据
                        } else {
                            // 锁定
                            me.lock();
                            // 无数据
                            me.noData();
                        }
                        // 延迟.5秒加载
                        setTimeout(function () {
                            // 插入数据到页面，放到最后面
                            $('#list_show').append(result);

                            //点击跳转页面
                            $('.list_show').on('click', '.turnPage', function () {
                                $('.dropload-down').hide();
                                $('#list_show').hide();
                                $('.show_main').show().attr('test','one');
                                getMain(getPort() + 'getSysMsgDetailById', { 'sysId': $(this).attr('sysbackId') });
                            });
                            //点击返回按钮
                            $('#go_back').on('click', function () {
                                if($('.show_main').attr('test') == 'one') {
                                    location.reload();
                                    $('.show_main').attr('test',null)
                                }else {
                                    return false;
                                }
                            });
                            // 每次数据插入，必须重置
                            me.resetload();
                        }, 500);
                    },
                    error: function (xhr, type) {
                        alert('请求失败，请稍后重试!');
                        // 即使加载出错，也得重置
                        me.resetload();
                    }
                });
            }
        });
    })





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
    //详情页ajax请求
    function getMain(url, data) {
        $.get(url, data, function (res) {
            console.log(res);
            if (res.success) {
                var mainData = res.obj;
                var str = '<h3>' + mainData.sysbackTitle + '</h3>'
                    + '<p>' + formatDate(mainData.sysbackAddtime) + '</p>'
                    + '<p>' + mainData.sysbackBody + '</p>';
                $('.show_main').html(str);
            } else {
                alert(res.message);
            }
        }, 'json');
    }



})();



