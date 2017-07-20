(function () {
    $(function () {
        //选择日期，调用datePicker插件
        var date = new Date();
        var year = date.getFullYear();
        var month = date.getMonth();
        if (month == 0) {
            month = 12;
            year = year - 1;
        }
        month = month >= 10 ? month : '0' + month;
        $('#date_choose p').eq(0).find('.year').text(year);
        $('#date_choose p').eq(0).find('.month').text(month);
        //欠款明细渲染
        getLashList(getPort() + 'selectArrearsDetail', {
            'userId': getCookie('userId'),
            'datatime': '2017-' + month
        });
        //欠费明细列表查询
        function getLashList(url, data) {
            $.ajax({
                url: url,
                data: data,
                dataType: 'json',
                type: 'GET',
                success: function (data) {
                    var str = '';
                    console.log(data);
                    if (data.statusCode == 1) {
                        var htmlStr = template('lashList', data);
                        $('.show_main').html(htmlStr);
                        jQuery(".show_main").slide({
                            titCell: ".show_title",
                            targetCell: ".show_content",
                            effect: "slideDown",
                            delayTime: 300,
                            defaultPlay:false,
                            trigger: "click",
                            triggerTime: 300,
                            returnDefault: false,
                        });
                    } else if (data.statusCode == 0) {
                        $('#show_own').hide();
                        layer.open({
                            content: data.message,
                            skin: 'msg',
                            time: 2 //2秒后自动关闭
                        });
                    }
                }
            });
        }
    });
})();