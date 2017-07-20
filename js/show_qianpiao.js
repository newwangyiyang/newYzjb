(function () {
    $(function () {
        $.ajax({
            url: getPort() + 'selectQianPiaoDetails',
            data:{
                'userId': getCookie('userId'),
                'datatime': '2017-06'
            },
            dataType: 'json',
            type: 'POST',
            success: function (data) {
                console.log(data);
                if (data.statusCode == 1) {
                    //获取数据成功；
                    var htmlStr = template('lashList', data);
                    $('.main_list').html(htmlStr);
                    jQuery(".main_list").slide({
                        titCell: ".show_title",
                        targetCell: ".list_body",
                        effect: "slideDown",
                        delayTime: 300,
                        defaultPlay:false,
                        trigger: "click",
                        triggerTime: 300,
                        returnDefault: false
                    });
                } else if (data.statusCode == 0) {
                    //获取数据失败；
                    layer.open({
                        content: data.message,
                        skin: 'msg',
                        time: 2 //2秒后自动关闭
                    });
                }
            }
        });
    });
})();